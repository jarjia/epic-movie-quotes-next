import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'react-query';
import { useAuthService } from '@/services';
import { PostRegisterTypes } from './types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { LoginWithGoogleQueryTypes } from '@/types';
import { useZod } from '@/schema';
import { useTranslation } from 'next-i18next';
import { errorToast } from '@/helpers';

const useRegisterForm = (handleFormStatus: (status: string) => void) => {
  const {
    getCrsfToken,
    getUserGoogleCallback,
    getUserGoogleRedirect,
    postRegister,
  } = useAuthService();
  const { registerSchema } = useZod();
  const form: UseFormReturn = useForm({
    mode: 'onChange',
    resolver: zodResolver(registerSchema),
  });
  const {
    formState: { errors },
    handleSubmit,
  } = form;
  const router = useRouter();
  const { t: apiErr } = useTranslation('apiErrors');

  const { mutate: registerUser } = useMutation(postRegister, {
    onSuccess: () => {
      handleFormStatus('email-sent');
    },
    onError(err: any) {
      errorToast(
        apiErr,
        typeof err?.response?.data?.message === 'string'
          ? err?.response?.data?.message
          : apiErr('registration_failed'),
        err
      );
    },
  });

  const { mutate: loginViaGoogle } = useMutation(getUserGoogleCallback, {
    onSuccess: () => {
      sessionStorage.clear();
      localStorage.setItem('auth', 'true');
      router.push('/newsfeed');
    },
    onError: (err: any) => {
      errorToast(apiErr, apiErr('google_auth_failed'), err);
    },
  });

  useEffect(() => {
    const { code, authUser, prompt, scope } =
      router.query as LoginWithGoogleQueryTypes;
    const loginGoogleUser = () => {
      let queryData = {
        code,
        authUser,
        prompt,
        scope,
      };
      loginViaGoogle(queryData);
    };
    if (code !== undefined) {
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
    } catch (err: any) {
      errorToast(apiErr, apiErr('google_auth_failed'), err);
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
