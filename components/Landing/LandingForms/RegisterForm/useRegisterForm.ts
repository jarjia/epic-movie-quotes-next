import { registerSchema } from '@/schema';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'react-query';
import {
  getCrsfToken,
  getUserGoogleCallback,
  getUserGoogleRedirect,
  postRegister,
} from '@/services';
import { LoginWithGoogleQueryTypes, PostRegisterTypes } from './types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useRegisterForm = (handleFormStatus: (status: string) => void) => {
  const form: UseFormReturn = useForm({
    mode: 'onChange',
    resolver: zodResolver(registerSchema),
  });
  const {
    formState: { errors },
    handleSubmit,
  } = form;
  const router = useRouter();

  const { mutate: registerUser } = useMutation(postRegister, {
    onSuccess: () => {
      handleFormStatus('email-sent');
    },
  });

  const { mutate: loginViaGoogle } = useMutation(getUserGoogleCallback, {
    onSuccess: () => {
      sessionStorage.clear();
      localStorage.setItem('auth', 'true');
      router.push('/newsfeed');
    },
    onError: (err) => {
      console.log(err);
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
    const finalData: PostRegisterTypes = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    await getCrsfToken();
    registerUser(finalData);
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

  return {
    handleSubmit,
    handleUserRedirectGoogle,
    onSubmit,
    errors,
    form,
    FormProvider,
  };
};

export default useRegisterForm;
