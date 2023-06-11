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
import { useEffect, useState } from 'react';
import { LoginWithGoogleQueryTypes } from '@/types';
import { toast } from 'react-toastify';
import { useZod } from '@/schema';
import { useAuthService } from '@/services';

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
  const [apiError, setApiError] = useState('');

  const remember_me = useWatch({ control, name: 'remember_me' });

  const { mutate: loginUser } = useMutation(postLoginUser, {
    onSuccess: () => {
      localStorage.setItem('auth', 'true');
      router.push('/newsfeed');
    },
    onError: (err: any) => {
      setApiError(err.response.data);
    },
  });

  const { mutate: loginViaGoogle } = useMutation(getUserGoogleCallback, {
    onSuccess: () => {
      sessionStorage.clear();
      localStorage.setItem('auth', 'true');
      router.push('/newsfeed');
    },
    onError: (err: any) => {
      setApiError(err.response.data);
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
      toast('An error occured while trying to login', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleUserRedirectGoogle = async () => {
    try {
      const res = await getUserGoogleRedirect();
      if (res.status === 200) {
        router.push(res.data);
      }
    } catch (error) {
      toast('An error occured while trying to register', {
        position: toast.POSITION.TOP_CENTER,
      });
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
