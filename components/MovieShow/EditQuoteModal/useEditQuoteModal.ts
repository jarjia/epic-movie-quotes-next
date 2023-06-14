import { AppContext } from '@/context';
import { useZod } from '@/schema';
import { useQuoteService } from '@/services';
import { QuotesTypes, UpdateQuotesTypes } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect, useState } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useMutation, useQuery } from 'react-query';

const useEditQuoteModal = (
  quoteId: string | null,
  movieId: number,
  handleRefecthQuotes: () => void
) => {
  const { getQuote, updateQuote } = useQuoteService();
  const { addQuoteSchema } = useZod();
  const form: UseFormReturn = useForm({
    mode: 'onChange',
    resolver: zodResolver(addQuoteSchema),
  });
  const { handleFeedFormStatus } = useContext(AppContext);
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;
  const { t } = useTranslation('movieList');
  const [quote, setQuote] = useState<QuotesTypes>({} as QuotesTypes);
  const { isLoading } = useQuery('quote', () => getQuote(quoteId), {
    onSuccess(data) {
      setQuote(data.data);
    },
    enabled:
      quoteId !== null || quoteId !== undefined || quoteId === 'null'
        ? true
        : false,
  });
  const { mutate: updateQuoteMutate } = useMutation(updateQuote, {
    onSuccess: () => {
      handleRefecthQuotes();
      handleFeedFormStatus('');
    },
  });

  useEffect(() => {
    setValue('movieId', movieId);
  }, [setValue, movieId]);

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
