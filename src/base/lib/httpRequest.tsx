import type { InternalAxiosRequestConfig } from 'axios';
import axios, { AxiosError } from 'axios';

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const TIMEOUT = 1 * 60 * 1000;

const httpRequest = axios.create({
  baseURL: baseUrl,
  timeout: TIMEOUT,
});

export const setupAxiosInterceptors = (onUnauthenticated: () => void) => {
  httpRequest.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token =
      localStorage.getItem('authenticationToken') || sessionStorage.getItem('authenticationToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  httpRequest.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const status = error.response?.status ?? 0;
      if (status === 401) {
        onUnauthenticated?.();
      }
      return Promise.reject(error);
    }
  );
};

export const get = async (path: string, options: object = {}) => {
  const res = await httpRequest.get(path, options);
  return res.data;
};

export const post = async (path: string, data: object, options: object = {}) => {
  const res = await httpRequest.post(path, data, options);
  return res.data;
};

export const put = async (path: string, data: object, options: object = {}) => {
  const res = await httpRequest.put(path, data, options);
  return res.data;
};

export const del = async (path: string, options: object = {}) => {
  const res = await httpRequest.delete(path, options);
  return res.data;
};

export const deleteById = async (path: string, id: number) => {
  const res = await httpRequest.delete(`${path}/${id}`, { data: { id } });
  return res.data;
};

export const patch = async (path: string, data: object, options: object = {}) => {
  const res = await httpRequest.patch(path, data, options);
  return res.data;
};

export { httpRequest };
