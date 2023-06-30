import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useMovieService } from '@/services';
import { useQuery } from 'react-query';
import { GenreObjectType } from '@/types';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { errorToast } from '@/helpers';

const useFeedGenresField = (defaultVal: GenreObjectType[]) => {
  const { getGenres } = useMovieService();
  const genresDef = defaultVal === undefined ? [] : defaultVal;
  const { setValue, control } = useFormContext();
  const { t: apiErr } = useTranslation('apiErrors');
  const { data } = useQuery('genres', getGenres, {
    onError(err: any) {
      errorToast(apiErr, apiErr('fetch_genres_failed'), err);
    },
  });
  const genresData = data?.data;
  const [genres, setGenres] = useState<GenreObjectType[]>(genresDef);
  const [select, setSelect] = useState(false);
  const { t } = useTranslation('movieList');
  const router = useRouter();
  const locale = router.locale as string;
  const genresRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        genresRef.current &&
        !genresRef.current.contains(event.target as Node)
      ) {
        setSelect(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddGenre = (genre: GenreObjectType) => {
    const updatedItems = [...genres, genre];
    setGenres(updatedItems);
    setValue('genres', updatedItems);
  };

  const handleDeleteGenre = (id: number) => {
    const updatedItems = genres.filter(
      (genre: GenreObjectType) => genre.id !== id
    );
    setGenres(updatedItems);
    setValue('genres', updatedItems);
  };

  const filteredGenres =
    genresData !== undefined &&
    genresData.filter((option: GenreObjectType) => {
      return !genres.find((selectedItem) => selectedItem.id === option.id);
    });

  return {
    handleAddGenre,
    handleDeleteGenre,
    filteredGenres,
    control,
    genresRef,
    select,
    setSelect,
    genres,
    t,
    locale,
  };
};

export default useFeedGenresField;
