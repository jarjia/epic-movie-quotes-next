import { useContext } from 'react';
import { MovieStructureTypes } from '@/types';
import { AppContext } from '@/context';
import { AddIcon, Movie } from '@/components';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const Movies: React.FC<{ movies: MovieStructureTypes[]; loading: boolean }> = (
  props
) => {
  const { handleFeedFormStatus } = useContext(AppContext);
  const router = useRouter();
  const search = router.query.search;
  const { t } = useTranslation('movieList');

  if (props.loading) {
    return (
      <div className='flex flex-col items-center gap-2 my-16 justify-center'>
        <h1 className='text-white text-3xl'>Loading...</h1>
      </div>
    );
  }

  if (
    !props.loading &&
    props.movies.length === 0 &&
    (search === '' || search === undefined)
  ) {
    return (
      <div className='flex flex-col items-center gap-2 my-16 justify-center'>
        <h1 className='text-white text-3xl'>{t('no_movies')}</h1>
        <button
          onClick={() => handleFeedFormStatus('add-movie')}
          className='flex items-center text-white p-2 rounded gap-2 bg-default-btn hover:bg-hover active:bg-active'
        >
          <AddIcon />
          {t('add_one_movie')}
        </button>
      </div>
    );
  }

  if (props.movies.length === 0 && search !== '' && search !== undefined) {
    return (
      <div className='flex flex-col items-center gap-2 my-16 justify-center'>
        <h1 className='flex w-full text-white text-3xl'>
          {t('search_no_movie_one')}
          <p className='max-w-[44%] truncate pl-2'>&quot;{search}</p>&quot;{' '}
          {t('search_no_movie_two')}
        </h1>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-3 sm:grid-cols-1 gap-8 mt-10 sm:mt-4'>
      {props.movies &&
        props.movies.map((movie: MovieStructureTypes) => {
          return (
            <Movie
              key={movie.id}
              id={movie.id}
              thumbnail={movie.thumbnail}
              movie={movie.movie}
              releaseDate={movie.releaseDate}
            />
          );
        })}
    </div>
  );
};

export default Movies;
