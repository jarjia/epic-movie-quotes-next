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
import { useMutation } from 'react-query';

const useAddQuoteModal = (movieId: number) => {
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
  let locale = router.locale as string;

  useEffect(() => {
    setValue('movieId', movieId);
  }, [movieId, setValue]);

  const { mutate: addQuote } = useMutation(postQuote, {
    onSuccess: (res) => {
      console.log(res);

      handleFeedFormStatus('');
    },
    onError: (err) => {
      console.log(err);
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
    t,
    locale,
  };
};

export default useAddQuoteModal;
