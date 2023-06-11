import { MovieCreateTypes } from '@/types';
import axios from './axios';
import { useRouter } from 'next/router';

const useMovieService = () => {
  const router = useRouter();
  let locale = router.locale;

  const getGenres = () => {
    return axios.get('/api/genres');
  };

  const postMovie = (data: MovieCreateTypes) => {
    return axios.post('/api/movie/create', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: { locale },
    });
  };

  const getMovies = (search: string) => {
    return axios.get('/api/movies', {
      params: { locale, search },
    });
  };

  const getMovie = (id: number) => {
    return axios.get(`/api/movie`, {
      params: { id, locale },
    });
  };

  const deleteMovie = (movie: number) => {
    return axios.delete(`/api/movie/delete/${movie}`);
  };

  const updateMovie = (data: MovieCreateTypes & { movieId: number }) => {
    return axios.post(`/api/movie/update/${data.movieId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: { locale },
    });
  };

  const getMoviesForQuote = () => {
    return axios.get('/api/movie-for-quotes');
  };

  return {
    updateMovie,
    deleteMovie,
    getGenres,
    getMovie,
    getMovies,
    postMovie,
    getMoviesForQuote,
  };
};

export default useMovieService;
