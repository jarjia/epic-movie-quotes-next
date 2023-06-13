import { useMovieService } from '@/services';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useQuery } from 'react-query';
import { Keys } from '@/types';

const useSelectMovie = () => {
  const { getMoviesForQuote } = useMovieService();
  const { control, setValue } = useFormContext();
  const { t } = useTranslation('newsFeed');
  const [movies, setMovies] = useState([]);
  const [movieId, setMovieId] = useState<{
    id: number;
    movie: Keys;
  } | null>(null);
  const [isSelect, setIsSelect] = useState(false);
  const router = useRouter();
  useQuery('movies-for-quote', getMoviesForQuote, {
    onSuccess(data) {
      setMovies(data.data);
    },
  });
  let locale = router.locale as string;

  const handleMovieId = (movieId: { id: number; movie: Keys }) => {
    setMovieId(movieId);
    setValue('movieId', movieId.id);
  };

  const handleSelect = () => {
    setIsSelect(!isSelect);
  };

  return {
    handleSelect,
    handleMovieId,
    locale,
    control,
    Controller,
    movieId,
    movies,
    isSelect,
    t,
  };
};

export default useSelectMovie;
