import { useAuthService } from '@/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import {
  UseFormReturn,
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from 'react-hook-form';
import { useMutation } from 'react-query';
import { PostRecoverPasswordTypes } from './types';
import { useState } from 'react';
import { useZod } from '@/schema';
import { useTranslation } from 'next-i18next';
import { errorToast } from '@/helpers';

const useRecoverPassword = (handleFormStatus: (status: string) => void) => {
  const { postRecoverPassword } = useAuthService();
  const { RecoverPasswordSchema } = useZod();
  const { t } = useTranslation('landingForms');
  const form: UseFormReturn = useForm({
    mode: 'onChange',
    resolver: zodResolver(RecoverPasswordSchema),
  });
  const {
    formState: { errors },
    handleSubmit,
  } = form;
  const router = useRouter();
  const [apiError, setApiError] = useState('');
  const { t: apiErr } = useTranslation('apiErrors');

  const handleClearApiError = () => {
    setApiError('');
  };

  const { mutate: recoverUserPassword } = useMutation(postRecoverPassword, {
    onSuccess: () => {
      router.push('/');
      handleFormStatus('recovered-password');
    },
    onError: (err: any) => {
      if (typeof err?.response?.data?.message === 'string') {
        setApiError(err?.response?.data?.message);
      } else {
        errorToast(apiErr, apiErr('password_recover_failed'), err);
      }
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { email, recover_token } = router.query as PostRecoverPasswordTypes;
    const finalData: PostRecoverPasswordTypes = {
      password: data.password,
      email,
      recover_token,
    };

    recoverUserPassword(finalData);
  };

  return {
    onSubmit,
    handleSubmit,
    form,
    errors,
    FormProvider,
    apiError,
    t,
    handleClearApiError,
  };
};

export default useRecoverPassword;
