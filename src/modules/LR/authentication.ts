import globalStore from '@/base/components/global/globalStore';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import { toast } from 'sonner';

const AUTH_TOKEN_KEY = 'authenticationToken';

class Authentication {
    loading = false;
    isAuthenticated = false;
    loginSuccess = false;
    loginError = false;
    account: any = null;
    errorMessage: string | null = null;
    sessionHasBeenFetched = false;

    constructor() {
        makeAutoObservable(this);

        // Chỉ định backend
        axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

        if (typeof window !== 'undefined') {
            const token = localStorage.getItem(AUTH_TOKEN_KEY) || sessionStorage.getItem(AUTH_TOKEN_KEY);
            if (token) {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
                this.isAuthenticated = true;
            }

            console.log('log:', token);
        }
    }

    async login(email: string, password: string, rememberMe = false) {
        this.loading = true;
        this.loginError = false;
        try {
            const res: AxiosResponse = await axios.post('/api/v1/auth/login', {
                email,
                password
                // rememberMe
            });

            const jwt = res.data?.data?.accessToken;
            if (jwt) {
                if (rememberMe) {
                    localStorage.setItem(AUTH_TOKEN_KEY, jwt);
                } else {
                    sessionStorage.setItem(AUTH_TOKEN_KEY, jwt);
                }
                axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;
            }

            await this.getAccount(); // lấy thông tin người dùng
            runInAction(() => {
                this.loginSuccess = true;
                this.isAuthenticated = true;
                toast.success('Đăng nhập thành công');
                globalStore.setLROpen(false);
            });
        } catch (error: any) {
            toast.error('Lỗi rồi này!');

            runInAction(() => {
                this.loginError = true;
                this.errorMessage = error.message;
                this.isAuthenticated = false;
            });
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    async getAccount() {
        this.loading = true;
        try {
            const res = await axios.get('/api/v1/me/profile');
            runInAction(() => {
                this.account = res.data;
                this.isAuthenticated = !!res.data?.activated;
                this.sessionHasBeenFetched = true;
            });
        } catch (error: any) {
            runInAction(() => {
                this.errorMessage = error.message;
                this.isAuthenticated = false;
                this.sessionHasBeenFetched = true;
            });
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    logout() {
        globalStore.setLROpen(true);
        localStorage.removeItem(AUTH_TOKEN_KEY);
        sessionStorage.removeItem(AUTH_TOKEN_KEY);
        delete axios.defaults.headers.common.Authorization;
        runInAction(() => {
            this.isAuthenticated = false;
            this.account = null;
            this.loginSuccess = false;
        });
    }
}

export default new Authentication();
