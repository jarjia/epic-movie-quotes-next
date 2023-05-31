import { LoginSchema } from '@/schema';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
  useForm,
  useWatch,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import {
  getCrsfToken,
  getUserGoogleCallback,
  getUserGoogleRedirect,
  postLoginUser,
} from '@/services';
import { useMutation } from 'react-query';
import { useEffect, useState } from 'react';
import { ErrorResponseTypes, LoginWithGoogleQueryTypes } from './types';

const useLoginForm = () => {
  const form: UseFormReturn = useForm({
    mode: 'onChange',
    resolver: zodResolver(LoginSchema),
  });
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = form;
  const router = useRouter();
  const [apiError, setApiError] = useState('');

  const remember_me = useWatch({ control, name: 'remember_me' });

  const { mutate: loginUser } = useMutation(postLoginUser, {
    onSuccess: () => {
      localStorage.setItem('auth', 'true');
      router.push('/newsfeed');
    },
    onError: (err: ErrorResponseTypes) => {
      setApiError(err.response.data);
    },
  });

  const { mutate: loginViaGoogle } = useMutation(getUserGoogleCallback, {
    onSuccess: () => {
      sessionStorage.clear();
      localStorage.setItem('auth', 'true');
      router.push('/newsfeed');
    },
    onError: (err: ErrorResponseTypes) => {
      setApiError(err.response.data);
    },
  });

  useEffect(() => {
    const loginGoogleUser = () => {
      let queryData: LoginWithGoogleQueryTypes = {
        code: router.query.code,
        authUser: router.query.authUser,
        prompt: router.query.prompt,
        scope: router.query.scope,
      };
      loginViaGoogle(queryData);
    };
    if (router.query.code !== undefined) {
      loginGoogleUser();
    }
  }, [router, loginViaGoogle]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let finalData = {
      user: data.user,
      password: data.password,
      remember_me: remember_me === undefined ? false : remember_me,
    };
    try {
      const csrfRes = await getCrsfToken();
      if (csrfRes.status === 204) {
        loginUser(finalData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserRedirectGoogle = async () => {
    try {
      const res = await getUserGoogleRedirect();
      if (res.status === 200) {
        router.push(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetApiError = () => {
    setApiError('');
  };

  return {
    handleUserRedirectGoogle,
    handleResetApiError,
    handleSubmit,
    onSubmit,
    router,
    errors,
    apiError,
    form,
    FormProvider,
  };
};

export default useLoginForm;
