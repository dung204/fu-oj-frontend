import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CreateAxiosDefaults,
  type InternalAxiosRequestConfig,
} from 'axios';

import { getTokensFromCookie } from '@/modules/auth/utils/get-tokens-from-cookie.util';

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

  constructor({ headers, ...otherAxiosConfig }: Omit<CreateAxiosDefaults, 'baseURL'> = {}) {
    this.axiosInstance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 10000,
      ...otherAxiosConfig,
    });

    this.axiosInstance.interceptors.request.use(this.onSuccessRequest);
    this.axiosInstance.interceptors.response.use(this.onSuccessResponse, this.onResponseFailed);
  }

  protected async onSuccessRequest(config: CustomInternalAxiosRequestConfig) {
    if (config.isPrivateRoute) {
      const { accessToken } = await getTokensFromCookie();
      config.headers.set('Authorization', `Bearer ${accessToken}`);
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
