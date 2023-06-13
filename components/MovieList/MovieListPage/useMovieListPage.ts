import { AppContext } from '@/context';
import { useMovieService } from '@/services';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useQuery } from 'react-query';

const useMovieListPage = () => {
  const { feedFormStatus, shouldRefetch, handleRefetch } =
    useContext(AppContext);
  const { getMovies } = useMovieService();
  const [movies, setMovies] = useState([]);
  const router = useRouter();
  let search =
    router.query.search === undefined ? '' : (router.query.search as string);
  const { isLoading, data, status, refetch } = useQuery('my-movies', () =>
    getMovies(search)
  );
  const { t } = useTranslation('movieList');

  useEffect(() => {
    if (status === 'success') {
      setMovies(data.data.movies);
    }

    if (shouldRefetch || !shouldRefetch) {
      refetch();
    }
  }, [shouldRefetch, status, data?.data, refetch, movies, handleRefetch]);

  return {
    loading: isLoading,
    feedFormStatus,
    movies,
    t,
  };
};

export default useMovieListPage;
