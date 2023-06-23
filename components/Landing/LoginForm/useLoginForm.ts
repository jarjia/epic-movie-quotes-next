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
import { useMutation } from 'react-query';
import { useEffect } from 'react';
import { LoginWithGoogleQueryTypes } from '@/types';
import { toast } from 'react-toastify';
import { useZod } from '@/schema';
import { useAuthService } from '@/services';
import { useTranslation } from 'next-i18next';
import { errorToast } from '@/helpers';

const useLoginForm = () => {
  const {
    getCrsfToken,
    getUserGoogleCallback,
    getUserGoogleRedirect,
    postLoginUser,
  } = useAuthService();
  const { LoginSchema } = useZod();
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
  const { t: apiErr } = useTranslation('apiErrors');

  const remember_me = useWatch({ control, name: 'remember_me' });

  const { mutate: loginUser } = useMutation(postLoginUser, {
    onSuccess: () => {
      localStorage.setItem('auth', 'true');
      router.push('/newsfeed');
    },
    onError: (err: any) => {
      errorToast(
        apiErr,
        typeof err.response.data === 'string'
          ? err.response.data
          : apiErr('auth_failed'),
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
    toast.dismiss();
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
    } catch (err: any) {
      errorToast(apiErr, apiErr('auth_failed'), err);
    }
  };

  const handleUserRedirectGoogle = async () => {
    toast.dismiss();
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
    handleUserRedirectGoogle,
    handleSubmit,
    onSubmit,
    router,
    errors,
    form,
    FormProvider,
  };
};

export default useLoginForm;
