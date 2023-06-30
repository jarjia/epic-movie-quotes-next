import { AppContext } from '@/context';
import { useZod } from '@/schema';
import { useQuoteService } from '@/services';
import { PostQuoteTypes } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { errorToast } from '@/helpers';

const useAddQuoteFromMovieModal = (movieId: number) => {
  const { postQuote } = useQuoteService();
  const { addQuoteSchema } = useZod();
  const form: UseFormReturn = useForm({
    mode: 'onChange',
    resolver: zodResolver(addQuoteSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = form;
  const { handleFeedFormStatus } = useContext(AppContext);
  const router = useRouter();
  const { t } = useTranslation('movieList');
  const { t: apiErr } = useTranslation('apiErrors');
  let locale = router.locale as string;
  const queryClient = useQueryClient();

  useEffect(() => {
    setValue('movieId', movieId);
  }, [movieId, setValue]);

  const { mutate: addQuote, isLoading: addQuoteLoading } = useMutation(
    postQuote,
    {
      onSuccess: () => {
        handleFeedFormStatus('');
        queryClient.invalidateQueries('movies');
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
    addQuoteLoading,
    form,
    onSubmit,
    errors,
    t,
    locale,
  };
};

export default useAddQuoteFromMovieModal;
