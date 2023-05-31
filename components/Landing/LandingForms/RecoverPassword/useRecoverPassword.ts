import { RecoverPasswordSchema } from '@/schema';
import { postRecoverPassword } from '@/services';
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

const useRecoverPassword = (handleFormStatus: (status: string) => void) => {
  const form: UseFormReturn = useForm({
    mode: 'onChange',
    resolver: zodResolver(RecoverPasswordSchema),
  });
  const {
    formState: { errors },
    handleSubmit,
  } = form;
  const router = useRouter();

  const { mutate: recoverUserPassword } = useMutation(postRecoverPassword, {
    onSuccess: () => {
      handleFormStatus('recovered-password');
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
  };
};

export default useRecoverPassword;
