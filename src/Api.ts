import axios, {AxiosInstance} from 'axios';
import {getToken} from './Services/Token.ts';

const BASE_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers['X-Token'] = `${token}`;
    }
    return config;
  });

  return api;
};

export const logout = async (api: AxiosInstance): Promise<void> => {
  await api.post('/logout');
};
