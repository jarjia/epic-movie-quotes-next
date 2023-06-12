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
  const { data, refetch, isLoading, isError } = useQuery(
    'single-movie',
    () => getMovie(movieId as any),
    {
      enabled: shouldFetch,
    }
  );
  const { t } = useTranslation('movieList');
  const { feedFormStatus, shouldRefetch } = useContext(AppContext);

  useEffect(() => {
    if (isError) {
      router.push('/404');
    }
  }, [isError, router]);

  useEffect(() => {
    if (shouldRefetch || !shouldRefetch) {
      refetch();
    }
  }, [shouldRefetch, refetch]);

  useEffect(() => {
    if (movieId !== undefined && data === undefined) {
      setShouldFetch(true);
    } else {
      setShouldFetch(false);
    }
  }, [movieId, shouldRefetch, data]);

  console.log(data);

  return {
    movie: data?.data,
    t,
    isLoading,
    feedFormStatus,
  };
};

export default useMovieShowPage;
