import axios from './axios';
import {
  LoginCredentialsTypes,
  LoginWithGoogleQueryTypes,
  PostRecoverEmailTypes,
  PostRecoverPasswordTypes,
  PostRegisterTypes,
  PostVerifyTypes,
} from './types';

export const postRegister = (data: PostRegisterTypes) => {
  return axios.post('/api/register', data);
};

export const postVerify = (data: PostVerifyTypes) => {
  return axios.post('/api/verify-email', data);
};

export const postRecoverEmail = (data: PostRecoverEmailTypes) => {
  return axios.post('/api/recover/email', data);
};

export const postRecoverPassword = (data: PostRecoverPasswordTypes) => {
  return axios.post('/api/recover/password', data);
};

export const getCrsfToken = () => {
  return axios.get('/sanctum/csrf-cookie');
};

export const postLoginUser = (loginCredentials: LoginCredentialsTypes) => {
  return axios.post('/api/login', loginCredentials);
};

export const getUserData = () => {
  return axios.get('/api/user');
};

export const getLogoutUser = () => {
  return axios.get('/api/logout');
};

export const getUserGoogleRedirect = () => {
  return axios.get('/api/auth/google/redirect');
};

export const getUserGoogleCallback = (query: LoginWithGoogleQueryTypes) => {
  return axios.get('/api/auth/google/callback', {
    params: query,
  });
};
