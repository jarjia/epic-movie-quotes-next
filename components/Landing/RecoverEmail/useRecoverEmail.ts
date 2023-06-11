import { useAuthService } from '@/services';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UseFormReturn,
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from 'react-hook-form';
import { useMutation } from 'react-query';
import { PostRecoverEmailTypes } from './types';
import { useState } from 'react';
import { useZod } from '@/schema';

const useRecoverEmail = (handleFormStatus: (status: string) => void) => {
  const { getCrsfToken, postRecoverEmail } = useAuthService();
  const { RecoverEmailSchema } = useZod();
  const form: UseFormReturn = useForm({
    mode: 'onChange',
    resolver: zodResolver(RecoverEmailSchema),
  });
  const {
    formState: { errors },
    handleSubmit,
  } = form;
  const [apiError, setApiError] = useState('');

  const { mutate: recoverUserEmail } = useMutation(postRecoverEmail, {
    onSuccess: () => {
      handleFormStatus('recover-email-sent');
    },
    onError: (err: any) => {
      setApiError(err.response.data);
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const finalData: PostRecoverEmailTypes = {
      email: data.email,
    };
    await getCrsfToken();
    recoverUserEmail(finalData);
  };

  return {
    onSubmit,
    handleSubmit,
    form,
    errors,
    FormProvider,
    apiError,
  };
};

export default useRecoverEmail;
