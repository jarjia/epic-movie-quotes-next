import { MovieCreate } from '@/types';
import axios from './axios';
import { useRouter } from 'next/router';

const useMovieService = () => {
  const router = useRouter();
  let locale = router.locale;

  const getGenres = () => {
    return axios.get('/api/genres');
  };

  const postMovie = (data: MovieCreate) => {
    return axios.post('/api/movies', data, {
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

  const getMovie = (id: string) => {
    return axios.get(`/api/movie/${id}`, {
      params: { locale },
    });
  };

  const deleteMovie = (movie: number | null) => {
    return axios.delete(`/api/movie/${movie}`);
  };

  const updateMovie = (data: MovieCreate & { movieId: number }) => {
    return axios.post(`/api/movie/${data.movieId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: { locale, _method: 'PATCH' },
    });
  };

  const getMoviesForQuote = () => {
    return axios.get('/api/movie/titles', {
      params: { locale },
    });
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
