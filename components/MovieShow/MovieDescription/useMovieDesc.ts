import { useMovieService } from '@/services';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useContext } from 'react';
import { AppContext } from '@/context';

const useMovieDesc = () => {
  const { deleteMovie } = useMovieService();
  const { t } = useTranslation('movieList');
  const router = useRouter();
  let locale = router.locale;
  const { handleFeedFormStatus } = useContext(AppContext);

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteMovie(id);
      if (res.status === 200) {
        router.push('/movie-list');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleDelete,
    t,
    locale,
    handleFeedFormStatus,
  };
};

export default useMovieDesc;
