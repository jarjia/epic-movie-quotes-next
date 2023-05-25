import axios from './axios';
import {
  PostRecoverEmailTypes,
  PostRecoverPasswordTypes,
  PostRegisterTypes,
  PostVerifyTypes,
} from './types';

export const postRegister = (data: PostRegisterTypes) => {
  return axios.post('/register', data);
};

export const postVerify = (data: PostVerifyTypes) => {
  return axios.post('/verify-email', data);
};

export const postRecoverEmail = (data: PostRecoverEmailTypes) => {
  return axios.post('/recover/email', data);
};

export const postRecoverPassword = (data: PostRecoverPasswordTypes) => {
  return axios.post('/recover/password', data);
};
