import { useMovieService } from '@/services';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useQuery } from 'react-query';
import { Keys } from '@/types';

const useSelectMovie = () => {
  const { getMoviesForQuote } = useMovieService();
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation('newsFeed');
  const [movies, setMovies] = useState([]);
  const [movieId, setMovieId] = useState<{
    id: number;
    movie: Keys;
  } | null>(null);
  const [isSelect, setIsSelect] = useState(false);
  const router = useRouter();
  const { isFetched, data } = useQuery('movies-for-quote', getMoviesForQuote);
  let locale = router.locale as string;
  const selectRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsSelect(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isFetched) setMovies(data?.data);
  }, [data?.data, isFetched]);

  const handleMovieId = (movieId: { id: number; movie: Keys }) => {
    setMovieId(movieId);
    setValue('movieId', movieId.id);
  };

  return {
    setIsSelect,
    handleMovieId,
    locale,
    errors,
    movieId,
    movies,
    isSelect,
    selectRef,
    t,
  };
};

export default useSelectMovie;
