import { AppContext } from '@/context';
import { useZod } from '@/schema';
import { useMovieService } from '@/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import {
  Controller,
  FormProvider,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { useMutation } from 'react-query';

const useEditMovieModal = (movieId: number) => {
  const { updateMovie } = useMovieService();
  const { AddMovieSchema } = useZod();
  const form: UseFormReturn = useForm({
    mode: 'onChange',
    resolver: zodResolver(AddMovieSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const { handleFeedFormStatus, handleRefetch } = useContext(AppContext);

  const { mutate: updateMovieFunc } = useMutation(updateMovie, {
    onSuccess: () => {
      handleFeedFormStatus('');
      handleRefetch();
    },
  });

  const onSubmit = async (data: any) => {
    if (data.thumbnail.length === 0) {
      delete data.thumbnail;
    } else {
      data.thumbnail = data.thumbnail[0];
    }
    let genresIds: number[] = [];
    data.genres.map((item: any) => genresIds.push(item.id));
    data.movieId = movieId;
    const newData = {
      ...data,
      genres: genresIds,
      movieId: movieId,
    };

    updateMovieFunc(newData);
  };

  return {
    Controller,
    errors,
    control,
    onSubmit,
    handleSubmit,
    FormProvider,
    form,
  };
};

export default useEditMovieModal;
