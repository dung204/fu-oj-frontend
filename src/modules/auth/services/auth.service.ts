import { HttpClient } from '@/base/lib';

import {
  ChangePasswordSchema,
  LoginSchema,
  LoginSuccessResponse,
  RegisterSchema,
  RegisterSuccessResponse,
} from '../types';
import { deleteTokensInCookie } from '../utils/delete-tokens-in-cookie.util';
import { setTokensToCookie } from '../utils/set-tokens-to-cookie.util';

class AuthService extends HttpClient {
  public async login(payload: LoginSchema) {
    const res = await this.post<LoginSuccessResponse>('/auth/login', payload);

    await setTokensToCookie(res);

    return res;
  }

  public async register(payload: RegisterSchema) {
    const res = await this.post<RegisterSuccessResponse>('/auth/register', payload);

    await setTokensToCookie(res);

    return res;
  }

  public async logout() {
    await this.delete('/auth/logout', {
      isPrivateRoute: true,
    });

    await deleteTokensInCookie();
  }

  public changePassword(payload: Omit<ChangePasswordSchema, 'confirmPassword'>) {
    return this.patch('/auth/password', payload, {
      isPrivateRoute: true,
    });
  }
}

export const authService = new AuthService();
