import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useMovieService } from '@/services';
import { useQuery } from 'react-query';
import { GenreObjectType } from '@/types';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const useFeedGenresField = (defaultVal: GenreObjectType[]) => {
  const { getGenres } = useMovieService();
  const genresDef = defaultVal === undefined ? [] : defaultVal;
  const { setValue, control } = useFormContext();
  const { t: apiErr } = useTranslation('apiErrors');
  const { data } = useQuery('genres', getGenres, {
    onError(err: any) {
      toast.error(
        `${apiErr('fetch_genres_failed')} (${apiErr('code')}: ${
          err?.response?.status
        })`,
        {
          position: 'top-center',
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        }
      );
    },
  });
  const genresData = data?.data;
  const [genres, setGenres] = useState<GenreObjectType[]>(genresDef);
  const [select, setSelect] = useState(false);
  const { t } = useTranslation('movieList');
  const router = useRouter();
  const locale = router.locale as string;

  const handleSelect = () => {
    setSelect(!select);
  };

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
    handleSelect,
    filteredGenres,
    control,
    select,
    genres,
    t,
    locale,
  };
};

export default useFeedGenresField;
