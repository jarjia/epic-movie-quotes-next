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
import { PostRecoverEmail } from './types';
import { useZod } from '@/schema';
import { useTranslation } from 'next-i18next';
import { errorToast } from '@/helpers';

const useRecoverEmail = (handleFormStatus: (status: string) => void) => {
  const { postRecoverEmail } = useAuthService();
  const { RecoverEmailSchema } = useZod();
  const form: UseFormReturn = useForm({
    mode: 'onBlur',
    resolver: zodResolver(RecoverEmailSchema),
  });
  const {
    formState: { errors },
    handleSubmit,
    setError,
  } = form;
  const { t: apiErr } = useTranslation('apiErrors');
  const { t } = useTranslation('landingForms');

  const { mutate: recoverUserEmail, isLoading: recoverEmailLoading } =
    useMutation(postRecoverEmail, {
      onSuccess: () => {
        handleFormStatus('recover-email-sent');
      },
      onError: (err: any) => {
        if (typeof err.response.data.email) {
          setError('email', {
            message: err.response.data.email,
          });
        } else {
          errorToast(apiErr, apiErr('recover_email_failed'), err);
        }
      },
    });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const finalData: PostRecoverEmail = {
      email: data.email,
    };

    recoverUserEmail(finalData);
  };

  return {
    onSubmit,
    recoverEmailLoading,
    handleSubmit,
    t,
    form,
    errors,
    FormProvider,
  };
};

export default useRecoverEmail;
