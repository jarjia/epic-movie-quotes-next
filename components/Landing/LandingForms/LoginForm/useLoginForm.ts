import { LoginSchema } from '@/schema';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
  useForm,
  useWatch,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const useLoginForm = () => {
  const form: UseFormReturn = useForm({
    mode: 'onChange',
    resolver: zodResolver(LoginSchema),
  });
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = form;

  const remember_me = useWatch({ control, name: 'remember_me' });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data, remember_me);
  };

  return {
    handleSubmit,
    onSubmit,
    errors,
    form,
    FormProvider,
  };
};

export default useLoginForm;
