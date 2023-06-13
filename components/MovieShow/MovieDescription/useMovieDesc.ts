import { useMovieService } from '@/services';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useContext, useState } from 'react';
import { AppContext } from '@/context';
import { useQuery } from 'react-query';

const useMovieDesc = () => {
  const { deleteMovie } = useMovieService();
  const [id, setId] = useState<number | null>(null);
  const { t } = useTranslation('movieList');
  const router = useRouter();
  const { handleFeedFormStatus } = useContext(AppContext);
  useQuery('delete-movie', () => deleteMovie(id), {
    onSuccess: () => {
      router.push('/movie-list');
    },
    enabled: id !== null && true,
  });
  let locale = router.locale as string;

  const handleDelete = async (id: number) => {
    setId(id);
  };

  return {
    handleDelete,
    t,
    locale,
    handleFeedFormStatus,
  };
};

export default useMovieDesc;
