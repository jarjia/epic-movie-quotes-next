import { useContext } from 'react';
import { Movie } from './components';
import { MovieStructureTypes } from '@/types';
import { AppContext } from '@/context';
import { AddIcon } from '@/components';
import { useRouter } from 'next/router';

const Movies: React.FC<{ movies: MovieStructureTypes[]; loading: boolean }> = (
  props
) => {
  const { handleFeedFormStatus } = useContext(AppContext);
  const router = useRouter();
  const search = router.query.search;

  if (props.movies.length === 0) {
    return props.loading || search === undefined || search === '' ? (
      <div className='flex flex-col items-center gap-2 my-16 justify-center'>
        <h1 className='text-white text-3xl'>Loading...</h1>
      </div>
    ) : search === undefined || search === '' ? (
      <div className='flex flex-col items-center gap-2 my-16 justify-center'>
        <h1 className='text-white text-3xl'>You have not added movie yet...</h1>
        <button
          onClick={() => handleFeedFormStatus('add-movie')}
          className='flex items-center text-white p-2 rounded gap-2 bg-default-btn hover:bg-hover active:bg-active'
        >
          <AddIcon />
          Add one!
        </button>
      </div>
    ) : (
      <div className='flex flex-col items-center gap-2 my-16 justify-center'>
        <h1 className='flex w-full text-white text-3xl'>
          Movie by name of
          <p className='max-w-1/2 truncate pl-2'>&quot;{search}</p>&quot; does
          not exist.
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
