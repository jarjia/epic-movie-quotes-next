import { AppContext } from '@/context';
import { useZod } from '@/schema';
import { useMovieService } from '@/services';
import { GenreObjectType, MovieCreateTypes } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { useMutation } from 'react-query';

const useAddMovie = () => {
  const { postMovie } = useMovieService();
  const { AddMovieSchema } = useZod();
  const form: UseFormReturn = useForm({
    mode: 'onChange',
    resolver: zodResolver(AddMovieSchema),
  });
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = form;
  const { handleFeedFormStatus, handleRefetch, userData } =
    useContext(AppContext);

  const { mutate: createMovie } = useMutation(postMovie, {
    onSuccess: () => {
      handleFeedFormStatus('');
      handleRefetch();
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    let genresIds: number[] = [];
    data.genres.map((item: GenreObjectType) => genresIds.push(item.id));
    data.genres = genresIds;
    data.thumbnail = data.thumbnail[0];
    data.user_id = userData.id;

    createMovie(data as MovieCreateTypes);
  };

  return {
    onSubmit,
    handleSubmit,
    form,
    FormProvider,
    setValue,
    errors,
    control,
  };
};

export default useAddMovie;
