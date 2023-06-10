import { useState } from 'react';
import { GenreObjectType } from './types';
import { useFormContext } from 'react-hook-form';
import { getGenres } from '@/services';
import { useQuery } from 'react-query';

const useFeedGenresField = () => {
  const { setValue, control } = useFormContext();
  const { data } = useQuery('genres', getGenres);
  const genresData = data?.data;
  const [genres, setGenres] = useState<GenreObjectType[]>([]);
  const [select, setSelect] = useState(false);

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
  };
};

export default useFeedGenresField;
