import { useMovieService } from '@/services';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useQuery } from 'react-query';
import { AppContext } from '@/context';
import { MovieShow } from '@/types';

const useMovieShowPage = () => {
  const { getMovie } = useMovieService();
  const router = useRouter();
  let movieId = router.query.movieId as string;
  const { isLoading, isError, data } = useQuery(['movies', movieId], () =>
    getMovie(movieId)
  );
  const movie: MovieShow = data?.data;
  const quotes = data?.data.quotes;
  const { t } = useTranslation('movieList');
  const { feedFormStatus, currentQuoteId, handleFeedFormStatus } =
    useContext(AppContext);

  useEffect(() => {
    let allowedModalsArr = [
      'view-quote',
      'add-quote-movie',
      'edit-movie',
      'edit-quote',
      '',
    ];
    if (!allowedModalsArr.includes(feedFormStatus as string)) {
      handleFeedFormStatus('');
    }
  }, [feedFormStatus, handleFeedFormStatus]);

  useEffect(() => {
    if (isError) {
      router.push('/404');
    }
  }, [isError, router]);

  return {
    movie,
    t,
    isLoading,
    quotes,
    feedFormStatus,
    currentQuoteId,
  };
};

export default useMovieShowPage;
