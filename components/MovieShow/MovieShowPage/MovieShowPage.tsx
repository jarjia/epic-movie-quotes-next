import {
  AddQuoteFromMovieModal,
  EditMovieModal,
  FeedFormLayout,
  FeedLayout,
  MovieDescription,
  MovieQuotes,
} from '@/components';
import useMovieShowPage from './useMovieShowPage';

const MovieShowPage = () => {
  const { movie, t, feedFormStatus, isLoading } = useMovieShowPage();

  return (
    <FeedLayout>
      {!isLoading && movie && (
        <>
          {feedFormStatus === 'edit-movie' ? (
            <FeedFormLayout title={`${t('update_movie_title')}`}>
              <EditMovieModal movie={movie} />
            </FeedFormLayout>
          ) : feedFormStatus === 'add-quote-movie' ? (
            <FeedFormLayout title={`${t('post_quote_title')}`}>
              <AddQuoteFromMovieModal movie={movie} />
            </FeedFormLayout>
          ) : null}
          {movie && (
            <div
              className={`${
                feedFormStatus !== '' && 'opacity-[0.2]'
              } py-4 sm:py-0`}
            >
              <h1 className='text-white text-2xl sm:hidden'>
                {t('movie_show_title')}
              </h1>
              <div className='sm:flex sm:flex-col-reverse grid grid-cols-movie-cols gap-4 px-2 py-4'>
                <MovieQuotes movieImage={movie.thumbnail} />
                <MovieDescription movie={movie} />
              </div>
            </div>
          )}
        </>
      )}
    </FeedLayout>
  );
};

export default MovieShowPage;
