/** biome-ignore-all lint/suspicious/noExplicitAny: any is fine in this file */
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import { env } from '@/base/lib';

import { setTokensToCookie } from '../auth/utils/set-tokens-to-cookie.util';

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
    axios.defaults.baseURL = env.VITE_API_URL;

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
      const res: AxiosResponse = await axios.post('/auth/login', {
        email,
        password,
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
      await setTokensToCookie(res.data);
      runInAction(() => {
        this.loginSuccess = true;
        this.isAuthenticated = true;
      });
    } catch (error: any) {
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
      const res = await axios.get('/me/profile');
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

export const authentication = new Authentication();
