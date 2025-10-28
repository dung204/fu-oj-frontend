import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CreateAxiosDefaults,
  type InternalAxiosRequestConfig,
} from 'axios';
import { decodeJwt } from 'jose';

import { env } from '@/base/lib';
import { RefreshSuccessResponse } from '@/modules/auth/types';
import { deleteTokensInCookie } from '@/modules/auth/utils/delete-tokens-in-cookie.util';
import { setTokensToCookie } from '@/modules/auth/utils/set-tokens-to-cookie.util';

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  isPrivateRoute?: boolean;
}

export interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  isPrivateRoute?: boolean;
}

/**
 * A wrapper class around Axios for making HTTP requests with enhanced configuration and interceptors.
 *
 * @remarks
 * - Automatically sets the `Content-Type` header to `application/json`.
 * - Uses the API base URL from the environment variable `VITE_API_URL`.
 * - Adds a timeout of 10 seconds to all requests.
 * - Supports private routes by attaching an `Authorization` header with a bearer token.
 * - Handles request and response interceptors for custom logic.
 *
 * @usage
 * ```ts
 * const client = new HttpClient();
 * const data = await client.get<MyType>('/endpoint');
 * ```
 *
 */
export class HttpClient {
  private readonly axiosInstance: AxiosInstance;
  static accessToken: string | undefined;
  static refreshToken: string | undefined;

  constructor({ headers, ...otherAxiosConfig }: Omit<CreateAxiosDefaults, 'baseURL'> = {}) {
    this.axiosInstance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      baseURL: env.VITE_API_URL,
      timeout: 10000,
      ...otherAxiosConfig,
    });

    this.axiosInstance.interceptors.request.use(this.onSuccessRequest.bind(this));
    this.axiosInstance.interceptors.response.use(
      this.onSuccessResponse,
      this.onResponseFailed.bind(this)
    );
  }

  protected async onSuccessRequest(config: CustomInternalAxiosRequestConfig) {
    if (config.isPrivateRoute) {
      try {
        const { exp } = decodeJwt(HttpClient.accessToken ?? '');
        if (exp && exp * 1000 < Date.now()) throw new Error();
        config.headers.set('Authorization', `Bearer ${HttpClient.accessToken}`);
      } catch (_accessTokenError) {
        try {
          const {
            data: {
              data: { accessToken: newAccessToken, refreshToken: newRefreshToken, user: newUser },
            },
          } = await axios.post<RefreshSuccessResponse>(
            '/auth/refresh',
            { refreshToken: HttpClient.refreshToken },
            { baseURL: import.meta.env.VITE_API_URL }
          );

          config.headers.set('Authorization', `Bearer ${newAccessToken}`);
          await setTokensToCookie({
            data: {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
              user: newUser,
            },
          });
        } catch (_refreshTokenError) {
          await deleteTokensInCookie();
        }
      }
    }
    return config;
  }

  protected onSuccessResponse(response: AxiosResponse) {
    return response.data;
  }

  protected onResponseFailed(error: AxiosError) {
    // TODO: Additional handling for different status codes here
    throw error;
  }

  public get<T>(url: string, config?: CustomAxiosRequestConfig) {
    return this.axiosInstance.get<T, T>(url, config);
  }

  public post<T>(url: string, data?: unknown, config?: CustomAxiosRequestConfig) {
    return this.axiosInstance.post<T, T>(url, data, config);
  }

  public patch<T>(url: string, data?: unknown, config?: CustomAxiosRequestConfig) {
    return this.axiosInstance.patch<T, T>(url, data, config);
  }

  public put<T>(url: string, data?: unknown, config?: CustomAxiosRequestConfig) {
    return this.axiosInstance.put<T, T>(url, data, config);
  }

  public delete<T = void>(url: string, config?: CustomAxiosRequestConfig) {
    return this.axiosInstance.delete<T, T>(url, config);
  }
}

export const httpClient = new HttpClient();
