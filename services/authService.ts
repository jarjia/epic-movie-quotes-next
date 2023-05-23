import axios from './axios';

export const postRegister = (data: any) => {
  return axios.post('/register', data);
};
