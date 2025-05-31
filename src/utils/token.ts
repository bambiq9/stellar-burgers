import { deleteCookie, setCookie } from './cookie';
import { TAuthResponse } from '@api';

export const addToken = (response: TAuthResponse) => {
  localStorage.setItem('refreshToken', response.refreshToken);
  setCookie('accessToken', response.accessToken);
};

export const removeToken = () => {
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
};
