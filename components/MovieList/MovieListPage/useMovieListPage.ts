import { AppContext } from '@/context';
import { useMovieService } from '@/services';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

const useMovieListPage = () => {
  const { feedFormStatus } = useContext(AppContext);
  const { getMovies } = useMovieService();
  const [isFetched, setIsFetched] = useState(false);
  const router = useRouter();
  let search =
    router.query.search === undefined ? '' : (router.query.search as string);
  const { isLoading, refetch, data } = useQuery(
    'my-movies',
    () => getMovies(search),
    {
      onSuccess() {
        setIsFetched(true);
      },
    }
  );
  const movies = data?.data.movies;
  const { t } = useTranslation('movieList');

  useEffect(() => {
    refetch();
  }, [refetch, router.query.search]);

  return {
    loading: isLoading,
    feedFormStatus,
    movies,
    t,
    isFetched,
  };
};

export default useMovieListPage;
