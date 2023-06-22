import { AppContext } from '@/context';
import { useZod } from '@/schema';
import { useMovieService } from '@/services';
import { GenreObjectType, MovieCreateTypes } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import {
  Controller,
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

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
  const { handleFeedFormStatus } = useContext(AppContext);
  const queryClient = useQueryClient();
  const { t } = useTranslation(['formErrors', 'movieList']);
  const { t: apiErr } = useTranslation('apiErrors');

  const { mutate: updateMovieFunc } = useMutation(updateMovie, {
    onSuccess: () => {
      handleFeedFormStatus('');
      queryClient.invalidateQueries('movies');
    },
    onError(err: any) {
      toast.error(
        `${apiErr('update_movie_failed')} (${apiErr('code')}: ${
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
    if (data.thumbnail.length === 0) {
      delete data.thumbnail;
    } else {
      data.thumbnail = data.thumbnail[0];
    }
    let genresIds: number[] = [];
    data.genres.map((item: GenreObjectType) => genresIds.push(item.id));
    data.movieId = movieId;
    data.genres = genresIds;
    movieId = movieId;

    updateMovieFunc(data as MovieCreateTypes & { movieId: number });
  };

  return {
    Controller,
    errors,
    t,
    control,
    onSubmit,
    handleSubmit,
    FormProvider,
    form,
  };
};

export default useEditMovieModal;
