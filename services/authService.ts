import axios from './axios';
import { postRegisterTypes } from './types';

export const postRegister = (data: postRegisterTypes) => {
  return axios.post('/register', data);
};
