import { useMovieService } from '@/services';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useQuery } from 'react-query';

const useSelectMovie = () => {
  const { getMoviesForQuote } = useMovieService();
  const { control, setValue } = useFormContext();
  const { t } = useTranslation('newsFeed');
  const [movies, setMovies] = useState([]);
  const [movieId, setMovieId] = useState<{
    id: number;
    movie: { en: string; ka: string };
  } | null>(null);
  const [isSelect, setIsSelect] = useState(false);
  const router = useRouter();
  const res = useQuery('movies-for-quote', getMoviesForQuote, {
    onSuccess(data) {
      setMovies(data.data);
    },
  });
  let locale = router.locale;
  console.log(res);

  // useEffect(() => {
  //   if (data?.status === 200) {
  //     setMovies(data.data);
  //   }
  // }, [data]);

  const handleMovieId = (movieId: {
    id: number;
    movie: { en: string; ka: string };
  }) => {
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
