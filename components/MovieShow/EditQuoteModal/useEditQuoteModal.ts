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
import { useMutation, useQuery } from 'react-query';
import { EditQuoteStateTypes } from './types';
import { toast } from 'react-toastify';

const useEditQuoteModal = (
  quoteId: string | null,
  movieId: number,
  handleRefecthQuotes: () => void
) => {
  const { getQuote, updateQuote } = useQuoteService();
  const { addQuoteSchema } = useZod();
  const { t: apiErr } = useTranslation('apiErrors');
  const { isLoading, data } = useQuery('quote', () => getQuote(quoteId), {
    enabled: quoteId !== null || quoteId !== undefined || quoteId === 'null',
  });
  const quote: EditQuoteStateTypes = data?.data;
  const { handleFeedFormStatus } = useContext(AppContext);
  const { t } = useTranslation('movieList');
  const { mutate: updateQuoteMutate } = useMutation(updateQuote, {
    onSuccess: () => {
      handleRefecthQuotes();
      handleFeedFormStatus('');
    },
    onError(err: any) {
      toast.error(
        `${apiErr('update_quote_failed')} (${apiErr('code')}: ${
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
  const form = useForm({
    mode: 'onChange',
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
    FormProvider,
  };
};

export default useEditQuoteModal;
