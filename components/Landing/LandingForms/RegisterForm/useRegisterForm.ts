import { registerSchema } from '@/schema';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'react-query';
import { postRegister } from '@/services';
import { PostRegisterTypes } from './types';

const useRegisterForm = (handleFormStatus: (status: string) => void) => {
  const form: UseFormReturn = useForm({
    mode: 'onChange',
    resolver: zodResolver(registerSchema),
  });
  const {
    formState: { errors },
    handleSubmit,
  } = form;

  const { mutate: registerUser } = useMutation(postRegister, {
    onSuccess: () => {
      handleFormStatus('email-sent');
    },
  });

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
    errors,
    form,
    FormProvider,
  };
};

export default useRegisterForm;
