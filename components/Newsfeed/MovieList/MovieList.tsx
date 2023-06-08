import { AddMovieModal, FeedFormLayout, FeedLayout } from '@/components';
import { ListHeader, Movies } from './components';
import useMovieList from './useMovieList';

const MovieList = () => {
  const { feedFormStatus, movies, loading } = useMovieList();

  return (
    <FeedLayout>
      <>
        {feedFormStatus === 'add-movie' ? (
          <FeedFormLayout title='add movie'>
            <AddMovieModal />
          </FeedFormLayout>
        ) : null}
        <div
          className={`py-4 sm:py-2 ${feedFormStatus !== '' && 'opacity-[0.2]'}`}
        >
          <ListHeader movies={movies} />
          <Movies loading={loading} movies={movies} />
        </div>
      </>
    </FeedLayout>
  );
};

export default MovieList;
