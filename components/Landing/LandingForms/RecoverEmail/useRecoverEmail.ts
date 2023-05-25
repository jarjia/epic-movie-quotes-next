import { RecoverEmailSchema } from '@/schema';
import { postRecoverEmail } from '@/services';
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

const useRecoverEmail = (handleFormStatus: (status: string) => void) => {
  const form: UseFormReturn = useForm({
    mode: 'onChange',
    resolver: zodResolver(RecoverEmailSchema),
  });
  const {
    formState: { errors },
    handleSubmit,
  } = form;

  const { mutate: recoverUserEmail } = useMutation(postRecoverEmail, {
    onSuccess: () => {
      handleFormStatus('recover-email-sent');
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const finalData: PostRecoverEmailTypes = {
      email: data.email,
    };

    recoverUserEmail(finalData);
  };

  return {
    onSubmit,
    handleSubmit,
    form,
    errors,
    FormProvider,
  };
};

export default useRecoverEmail;
