import { useMovieService } from '@/services';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useQuery } from 'react-query';
import { AppContext } from '@/context';

const useMovieShowPage = () => {
  const { getMovie } = useMovieService();
  const router = useRouter();
  let { movieId } = router.query;
  const [shouldFetch, setShouldFetch] = useState(false);
  const { data, refetch, isLoading } = useQuery(
    'single-movie',
    () => getMovie(movieId as any),
    {
      enabled: shouldFetch,
    }
  );
  const { t } = useTranslation('movieList');
  const { feedFormStatus, shouldRefetch } = useContext(AppContext);

  useEffect(() => {
    if (shouldRefetch || !shouldRefetch) {
      refetch();
    }
  }, [shouldRefetch, refetch]);

  useEffect(() => {
    if (movieId !== undefined) {
      setShouldFetch(true);
    }
  }, [movieId, shouldRefetch]);

  return {
    movie: data?.data,
    t,
    isLoading,
    feedFormStatus,
  };
};

export default useMovieShowPage;
