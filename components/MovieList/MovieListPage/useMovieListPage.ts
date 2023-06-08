import { AppContext } from '@/context';
import { getMovies } from '@/services';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

const useMovieListPage = () => {
  const { feedFormStatus, shouldRefetch } = useContext(AppContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleMovies = async () => {
      let search =
        router.query.search === undefined
          ? ''
          : (router.query.search as string);
      const res = await getMovies(search);
      setMovies(res.data);
    };

    handleMovies();
    setLoading(false);
  }, [shouldRefetch, router.query]);

  return {
    loading,
    feedFormStatus,
    movies,
  };
};

export default useMovieListPage;
