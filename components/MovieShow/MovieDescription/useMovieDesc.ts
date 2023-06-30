import { useMovieService } from '@/services';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useContext } from 'react';
import { AppContext } from '@/context';
import { useMutation } from 'react-query';
import { errorToast } from '@/helpers';

const useMovieDesc = () => {
  const { deleteMovie } = useMovieService();
  const { t } = useTranslation('movieList');
  const { t: apiErr } = useTranslation('apiErrors');
  const router = useRouter();
  const { handleFeedFormStatus } = useContext(AppContext);
  const { mutate: movieDeletionMutation } = useMutation(deleteMovie, {
    onSuccess: () => {
      router.push('/movie-list');
    },
    onError(err: any) {
      errorToast(apiErr, apiErr('delete_movie_failed'), err);
    },
  });
  let locale = router.locale as string;

  return {
    movieDeletionMutation,
    t,
    locale,
    handleFeedFormStatus,
  };
};

export default useMovieDesc;
