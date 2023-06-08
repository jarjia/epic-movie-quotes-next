import { MovieCreateTypes } from '@/types';
import axios from './axios';

export const getGenres = () => {
  return axios.get('/api/genres');
};

export const postMovie = (data: MovieCreateTypes) => {
  return axios.post('/api/movie/create', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getMovies = (search: string) => {
  return axios.get('/api/movies', {
    params: { search },
  });
};
