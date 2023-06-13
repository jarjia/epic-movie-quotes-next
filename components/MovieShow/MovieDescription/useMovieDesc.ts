import { useMovieService } from '@/services';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useContext } from 'react';
import { AppContext } from '@/context';
import { useMutation } from 'react-query';

const useMovieDesc = () => {
  const { deleteMovie } = useMovieService();
  const { t } = useTranslation('movieList');
  const router = useRouter();
  const { handleFeedFormStatus } = useContext(AppContext);
  const { mutate: movieDeletionMutation } = useMutation(deleteMovie, {
    onSuccess: () => {
      router.push('/movie-list');
    },
  });
  let locale = router.locale as string;

  const handleDelete = async (id: number) => {
    movieDeletionMutation(id);
  };

  return {
    handleDelete,
    t,
    locale,
    handleFeedFormStatus,
  };
};

export default useMovieDesc;
