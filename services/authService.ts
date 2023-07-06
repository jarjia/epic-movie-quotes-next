import { LoginWithGoogleQuery, PostEmailUpdate } from '@/types';
import {
  LoginCredentials,
  PostRecoverEmail,
  PostRecoverPassword,
  PostRegister,
  PostVerify,
} from './types';
import axios from './axios';
import { useRouter } from 'next/router';

const useAuthService = () => {
  const router = useRouter();
  let locale = router.locale;

  const postRegister = (data: PostRegister) => {
    return axios.post('/api/register', data, {
      params: { locale },
    });
  };

  const postVerify = (data: PostVerify) => {
    return axios.post('/api/verify-email', data, {
      params: { locale },
    });
  };

  const postRecoverEmail = (data: PostRecoverEmail) => {
    return axios.post('/api/recover/email', data, {
      params: { locale },
    });
  };

  const postRecoverPassword = (data: PostRecoverPassword) => {
    return axios.post('/api/recover/password', data, {
      params: { locale },
    });
  };

  const getCrsfToken = () => {
    return axios.get('/sanctum/csrf-cookie');
  };

  const postLoginUser = (loginCredentials: LoginCredentials) => {
    return axios.post('/api/login', loginCredentials, {
      params: { locale },
    });
  };

  const getUserData = () => {
    return axios.get('/api/user');
  };

  const getLogoutUser = () => {
    return axios.get('/api/logout', {
      params: { locale },
    });
  };

  const getUserGoogleRedirect = () => {
    return axios.get('/api/auth/google/redirect', {
      params: { locale },
    });
  };

  const getUserGoogleCallback = (query: LoginWithGoogleQuery) => {
    return axios.get('/api/auth/google/callback', {
      params: query,
    });
  };

  const postUserUpdateProfile = (data: FormData) => {
    return axios.post('/api/profile/update', data, {
      params: { locale },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const postUpdateUserEmail = (data: PostEmailUpdate) => {
    return axios.post('/api/email', data, {
      params: { locale },
    });
  };

  return {
    postLoginUser,
    postRecoverEmail,
    postUpdateUserEmail,
    postRecoverPassword,
    postRegister,
    postUserUpdateProfile,
    postVerify,
    getCrsfToken,
    getLogoutUser,
    getUserData,
    getUserGoogleCallback,
    getUserGoogleRedirect,
  };
};

export default useAuthService;
