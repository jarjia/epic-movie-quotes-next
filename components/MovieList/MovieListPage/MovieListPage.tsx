import {
  AddMovieModal,
  FeedFormLayout,
  FeedLayout,
  ListHeader,
  Movies,
} from '@/components';
import useMovieListPage from './useMovieListPage';

const MovieListPage = () => {
  const { feedFormStatus, movies, loading, isFetched, t } = useMovieListPage();

  return (
    <FeedLayout>
      <>
        {feedFormStatus === 'add-movie' ? (
          <FeedFormLayout title={`${t('add_movie')}`}>
            <AddMovieModal />
          </FeedFormLayout>
        ) : null}
        <div
          className={`py-4 sm:py-2 ${feedFormStatus !== '' && 'opacity-[0.2]'}`}
        >
          <ListHeader movies={movies} />
          <Movies loading={loading} movies={movies} isFetched={isFetched} />
        </div>
      </>
    </FeedLayout>
  );
};

export default MovieListPage;
