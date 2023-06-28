import { AppContext } from '@/context';
import { useMovieService } from '@/services';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

const useMovieListPage = () => {
  const { feedFormStatus, handleFeedFormStatus, currentQuoteId } =
    useContext(AppContext);
  const { getMovies } = useMovieService();
  const [isFetched, setIsFetched] = useState(false);
  const router = useRouter();
  let search =
    router.query.search === undefined ? '' : (router.query.search as string);
  const { isLoading, data } = useQuery(
    ['my-movies', search],
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
    let allowedModalsArr = ['add-movie', 'view-quote'];
    if (!allowedModalsArr.includes(feedFormStatus as string)) {
      handleFeedFormStatus('');
    }
  }, [feedFormStatus, handleFeedFormStatus]);

  return {
    loading: isLoading,
    feedFormStatus,
    movies,
    t,
    isFetched,
    currentQuoteId,
  };
};

export default useMovieListPage;
