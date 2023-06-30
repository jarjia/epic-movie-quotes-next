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
import { errorToast } from '@/helpers';

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
  const { t } = useTranslation('newsFeed');
  const queryClient = useQueryClient();
  const { t: apiErr } = useTranslation('apiErrors');

  const { mutate: addQuote, isLoading: addQuoteLoading } = useMutation(
    postQuote,
    {
      onSuccess: () => {
        handleFeedFormStatus('');
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ['quotes'] });
        }, 1000);
      },
      onError(err: any) {
        errorToast(apiErr, apiErr('add_quote_failed'), err);
      },
    }
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    data.thumbnail = data.thumbnail[0];

    addQuote(data as PostQuoteTypes);
  };

  return {
    handleSubmit,
    form,
    addQuoteLoading,
    onSubmit,
    errors,
    t,
  };
};

export default useAddQuote;
