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
import { useZod } from '@/schema';
import { useTranslation } from 'next-i18next';
import { errorToast } from '@/helpers';

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
  const { t: apiErr } = useTranslation('apiErrors');

  const { mutate: recoverUserEmail } = useMutation(postRecoverEmail, {
    onSuccess: () => {
      handleFormStatus('recover-email-sent');
    },
    onError: (err: any) => {
      errorToast(
        apiErr,
        typeof err.response.data === 'string'
          ? err.response.data
          : apiErr('recover_email_failed'),
        err
      );
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
  };
};

export default useRecoverEmail;
