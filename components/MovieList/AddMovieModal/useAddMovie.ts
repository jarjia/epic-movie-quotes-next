import { AppContext } from '@/context';
import { useZod } from '@/schema';
import { useMovieService } from '@/services';
import { GenreObject, MovieCreate } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { errorToast } from '@/helpers';

const useAddMovie = () => {
  const { postMovie } = useMovieService();
  const { AddMovieSchema } = useZod();
  const form: UseFormReturn = useForm({
    mode: 'onBlur',
    resolver: zodResolver(AddMovieSchema),
  });
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = form;
  const { handleFeedFormStatus, userData } = useContext(AppContext);
  const queryClient = useQueryClient();
  const { t } = useTranslation('movieList');
  const { t: apiErr } = useTranslation('apiErrors');
  const { t: formErrors } = useTranslation('formErrors');

  const { mutate: createMovie, isLoading: addMovieLoading } = useMutation(
    postMovie,
    {
      onSuccess: () => {
        handleFeedFormStatus('');
        queryClient.invalidateQueries('my-movies');
      },
      onError(err: any) {
        errorToast(apiErr, apiErr('create_movie_failed'), err);
      },
    }
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    let genresIds: number[] = [];
    data.genres.map((item: GenreObject) => genresIds.push(item.id));
    data.genres = genresIds;
    data.thumbnail = data.thumbnail[0];
    data.user_id = userData.id;

    createMovie(data as MovieCreate);
  };

  return {
    onSubmit,
    handleSubmit,
    form,
    FormProvider,
    setValue,
    errors,
    addMovieLoading,
    control,
    formErrors,
    t,
  };
};

export default useAddMovie;
