import { useMovieService } from '@/services';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useContext } from 'react';
import { AppContext } from '@/context';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

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
      toast.error(
        `${apiErr('delete_movie_failed')} (${apiErr('code')}: ${
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
