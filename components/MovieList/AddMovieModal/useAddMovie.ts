import { AppContext } from '@/context';
import { useZod } from '@/schema';
import { postMovie } from '@/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { FormProvider, UseFormReturn, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

const useAddMovie = () => {
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
    onSuccess: async (res) => {
      handleFeedFormStatus('');
      handleRefetch();
      console.log(res);
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  const onSubmit = (data: any) => {
    let genresIds: number[] = [];
    data.genres.map((item: any) => genresIds.push(item.id));
    const newData = {
      ...data,
      genres: genresIds,
      thumbnail: data.thumbnail[0],
      user_id: userData.id,
    };

    createMovie(newData);
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
