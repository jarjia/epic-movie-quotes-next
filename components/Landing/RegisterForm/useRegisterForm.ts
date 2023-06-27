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
    setError,
  } = form;
  const router = useRouter();
  const [isAuthorizingWithGoogle, setIsAuthorizingWithGoogle] = useState(false);
  const { t: apiErr } = useTranslation('apiErrors');
  const { isLoading: googleRedirectLoading } = useQuery(
    'google-redirect',
    getUserGoogleRedirect,
    {
      onSuccess(res) {
        router.push(res.data);
        setIsAuthorizingWithGoogle(false);
      },
      onError(err) {
        errorToast(apiErr, apiErr('google_auth_failed'), err);
      },
      enabled: isAuthorizingWithGoogle,
    }
  );

  const { mutate: registerUser, isLoading: registerLoading } = useMutation(
    postRegister,
    {
      onSuccess: () => {
        handleFormStatus('email-sent');
      },
      onError(err: any) {
        if (err?.response?.data?.errors?.email.length > 0) {
          setError('email', {
            message: err?.response?.data?.errors?.email[0],
          });
        } else {
          errorToast(
            apiErr,
            err?.response?.data?.message || apiErr('registration_failed'),
            err
          );
        }
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
    setIsAuthorizingWithGoogle,
    FormProvider,
    googleRedirectLoading,
  };
};

export default useRegisterForm;
