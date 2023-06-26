import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from 'react-query';
import { useAuthService } from '@/services';
import { PostRegisterTypes } from './types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { LoginWithGoogleQueryTypes } from '@/types';
import { useZod } from '@/schema';
import { useTranslation } from 'next-i18next';
import { errorToast } from '@/helpers';

const useRegisterForm = (handleFormStatus: (status: string) => void) => {
  const { getUserGoogleCallback, getUserGoogleRedirect, postRegister } =
    useAuthService();
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
  const [shouldGoogle, setShouldGoogle] = useState(false);
  const { t: apiErr } = useTranslation('apiErrors');
  const { isLoading: googleRedirectLoading } = useQuery(
    'google-redirect',
    getUserGoogleRedirect,
    {
      onSuccess(res) {
        router.push(res.data);
        setShouldGoogle(false);
      },
      onError(err) {
        errorToast(apiErr, apiErr('google_auth_failed'), err);
      },
      enabled: shouldGoogle,
    }
  );

  const { mutate: registerUser, isLoading: registerLoading } = useMutation(
    postRegister,
    {
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
    }
  );

  const { mutate: loginViaGoogle } = useMutation(getUserGoogleCallback, {
    onSuccess: () => {
      sessionStorage.removeItem('form-status');
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

    registerUser(finalData);
  };

  return {
    handleSubmit,
    onSubmit,
    registerLoading,
    errors,
    form,
    setShouldGoogle,
    FormProvider,
    googleRedirectLoading,
  };
};

export default useRegisterForm;
