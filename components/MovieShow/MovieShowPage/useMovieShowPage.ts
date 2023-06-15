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
  const [movie, setMovie] = useState<MovieShowTypes>({
    created_at: '',
    description: { en: '', ka: '' },
    director: { en: '', ka: '' },
    movie: { en: '', ka: '' },
    id: 0,
    genres: [{ id: 0, genre: { en: '', ka: '' } }],
    releaseDate: '',
    thumbnail: '',
    updated_at: '',
    user_id: 0,
  });

  const [quotes, setQuotes] = useState<QuotesTypes[]>([]);
  const [refetchQuotes, setRefetchQuotes] = useState(false);

  const [shouldFetch, setShouldFetch] = useState(false);
  const {
    refetch: movieRefetch,
    isLoading,
    isError,
  } = useQuery(['movies', movieId], () => getMovie(movieId), {
    onSuccess: (res) => {
      setMovie(res.data);
      setFetchQuotes(true);
    },
    enabled: shouldFetch,
  });
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
  const { feedFormStatus, shouldRefetch, currentQuoteId } =
    useContext(AppContext);

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
    if (shouldRefetch || !shouldRefetch) {
      movieRefetch();
    }
  }, [shouldRefetch, movieRefetch]);

  useEffect(() => {
    if (movieId !== undefined && movie.id === 0) {
      setShouldFetch(true);
    } else {
      setShouldFetch(false);
    }
  }, [movieId, shouldRefetch, movie]);

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