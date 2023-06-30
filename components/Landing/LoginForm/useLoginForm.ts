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
import { useMutation, useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { LoginWithGoogleQueryTypes } from '@/types';
import { toast } from 'react-toastify';
import { useZod } from '@/schema';
import { useAuthService } from '@/services';
import { useTranslation } from 'next-i18next';
import { errorToast } from '@/helpers';

const useLoginForm = () => {
  const { getUserGoogleCallback, getUserGoogleRedirect, postLoginUser } =
    useAuthService();
  const { LoginSchema } = useZod();
  const form: UseFormReturn = useForm({
    mode: 'onChange',
    resolver: zodResolver(LoginSchema),
  });
  const { t } = useTranslation('landingForms');
  const {
    formState: { errors },
    handleSubmit,
    setError,
    control,
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

  const remember_me = useWatch({ control, name: 'remember_me' });

  const { mutate: loginUser, isLoading } = useMutation(postLoginUser, {
    onSuccess: () => {
      router.push('/newsfeed');
    },
    onError: (err: any) => {
      if (typeof err.response.data?.user) {
        setError('user', {
          message: err.response.data.user,
        });
      } else {
        errorToast(apiErr, apiErr('auth_failed'), err);
      }
    },
  });

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
    toast.dismiss();
    let finalData = {
      user: data.user,
      password: data.password,
      remember_me: remember_me === undefined ? false : remember_me,
    };
    try {
      loginUser(finalData);
    } catch (err: any) {
      errorToast(apiErr, apiErr('auth_failed'), err);
    }
  };

  return {
    handleSubmit,
    onSubmit,
    router,
    setIsAuthorizingWithGoogle,
    errors,
    form,
    FormProvider,
    googleRedirectLoading,
    isLoading,
    t,
  };
};

export default useLoginForm;
