import {
  AddMovieModal,
  FeedFormLayout,
  FeedLayout,
  ListHeader,
  Movies,
} from '@/components';
import useMovieListPage from './useMovieListPage';

const MovieListPage = () => {
  const { feedFormStatus, movies, loading } = useMovieListPage();

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

export default MovieListPage;
