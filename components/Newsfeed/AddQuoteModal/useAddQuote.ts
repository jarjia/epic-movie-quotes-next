import { AppContext } from '@/context';
import { useZod } from '@/schema';
import { useQuoteService } from '@/services';
import { PostQuoteTypes } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

const useAddQuote = () => {
  const { postQuote } = useQuoteService();
  const { addQuoteSchema } = useZod();
  const form: UseFormReturn = useForm({
    mode: 'onChange',
    resolver: zodResolver(addQuoteSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;
  const { handleFeedFormStatus } = useContext(AppContext);
  const queryClient = useQueryClient();
  const { t: apiErr } = useTranslation('apiErrors');

  const { mutate: addQuote } = useMutation(postQuote, {
    onSuccess: () => {
      handleFeedFormStatus('');
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['quotes'] });
      }, 1000);
    },
    onError(err: any) {
      toast.error(
        `${apiErr('add_quote_failed')} (${apiErr('code')}: ${
          err?.response?.status
        })`,
        {
          position: 'top-center',
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        }
      );
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    data.thumbnail = data.thumbnail[0];

    addQuote(data as PostQuoteTypes);
  };

  return {
    handleSubmit,
    form,
    onSubmit,
    errors,
  };
};

export default useAddQuote;
