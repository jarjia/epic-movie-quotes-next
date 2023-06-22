import { useMovieService, useQuoteService } from '@/services';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useQuery } from 'react-query';
import { AppContext } from '@/context';
import { MovieShowTypes, QuotesTypes } from '@/types';

const useMovieShowPage = () => {
  const { getMovie } = useMovieService();
  const { getQuotes } = useQuoteService();
  const router = useRouter();
  let movieId = router.query.movieId as string;
  const [fetchQuotes, setFetchQuotes] = useState(false);
  const [quotes, setQuotes] = useState<QuotesTypes[]>([]);
  const [refetchQuotes, setRefetchQuotes] = useState(false);

  const [shouldFetch, setShouldFetch] = useState(false);
  const {
    refetch: movieRefetch,
    isLoading,
    isError,
    data,
  } = useQuery(['movies', movieId], () => getMovie(movieId), {
    onSuccess: () => {
      setFetchQuotes(true);
    },
  });
  const movie: MovieShowTypes = data?.data;

  const { refetch: quotesRefetch } = useQuery(
    'quotes',
    () => getQuotes(movie!.id),
    {
      enabled: fetchQuotes && shouldFetch,
      onSuccess(res) {
        setQuotes(res.data);
      },
    }
  );
  const { t } = useTranslation('movieList');
  const { feedFormStatus, currentQuoteId, handleFeedFormStatus } =
    useContext(AppContext);

  useEffect(() => {
    let allowedModalsArr = [
      'view-quote',
      'add-quote-movie',
      'edit-movie',
      'edit-quote',
    ];
    if (!allowedModalsArr.includes(feedFormStatus as string)) {
      handleFeedFormStatus('');
    }
  }, [feedFormStatus, handleFeedFormStatus]);

  const handleRefecthQuotes = () => {
    setRefetchQuotes(true);
  };

  useEffect(() => {
    if (refetchQuotes) {
      quotesRefetch();
      setRefetchQuotes(false);
    }
  }, [refetchQuotes, quotesRefetch]);

  useEffect(() => {
    if (isError) {
      router.push('/404');
    }
  }, [isError, router]);

  useEffect(() => {
    movieRefetch();
  }, [movieRefetch]);

  useEffect(() => {
    if (movieId !== undefined && movie !== undefined) {
      setShouldFetch(true);
    } else {
      setShouldFetch(false);
    }
  }, [movieId, movie]);

  return {
    movie,
    t,
    isLoading,
    handleRefecthQuotes,
    quotes,
    feedFormStatus,
    currentQuoteId,
  };
};

export default useMovieShowPage;
