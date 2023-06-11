import { AppContext } from '@/context';
import { useMovieService } from '@/services';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
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
  };
};

export default useMovieListPage;
