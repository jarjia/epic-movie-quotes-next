import { AppContext } from '@/context';
import { useZod } from '@/schema';
import { useQuoteService } from '@/services';
import { UpdateQuotesTypes } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { EditQuoteStateTypes } from './types';
import { errorToast } from '@/helpers';

const useEditQuoteModal = (quoteId: string | null, movieId: number) => {
  const { getQuote, updateQuote } = useQuoteService();
  const { addQuoteSchema } = useZod();
  const { t: apiErr } = useTranslation('apiErrors');
  const { isLoading, data } = useQuery('quote', () => getQuote(quoteId), {
    enabled: quoteId !== null || quoteId !== undefined || quoteId === 'null',
  });
  const quote: EditQuoteStateTypes = data?.data;
  const { handleFeedFormStatus } = useContext(AppContext);
  const { t } = useTranslation('movieList');
  const queryClient = useQueryClient();
  const { mutate: updateQuoteMutate, isLoading: editQuoteLoading } =
    useMutation(updateQuote, {
      onSuccess: () => {
        handleFeedFormStatus('');
        queryClient.invalidateQueries('movies');
      },
      onError(err: any) {
        errorToast(apiErr, apiErr('update_quote_failed'), err);
      },
    });
  const form = useForm({
    mode: 'onBlur',
    resolver: zodResolver(addQuoteSchema),
  });
  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (quote !== undefined) {
      const defaultValues = {
        quote: {
          en: quote.quote !== undefined ? quote.quote.en : '',
          ka: quote.quote !== undefined ? quote.quote.ka : '',
        },
        movieId: movieId,
      };
      if (quote.quote !== undefined) {
        reset(defaultValues);
      }
    }
  }, [reset, quote, movieId]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data.thumbnail.length === 0) {
      delete data.thumbnail;
    } else {
      data.thumbnail = data.thumbnail[0];
    }
    data.quoteId = quoteId;

    updateQuoteMutate(data as UpdateQuotesTypes & { quoteId: string | null });
  };

  return {
    t,
    handleSubmit,
    onSubmit,
    isLoading,
    quote,
    errors,
    form,
    editQuoteLoading,
    FormProvider,
  };
};

export default useEditQuoteModal;
