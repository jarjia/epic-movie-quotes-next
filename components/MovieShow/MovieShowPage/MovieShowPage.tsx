import {
  AddQuoteFromMovieModal,
  EditMovieModal,
  EditQuoteModal,
  FeedFormLayout,
  FeedLayout,
  MovieDescription,
  MovieQuotes,
  ViewQuoteModal,
} from '@/components';
import useMovieShowPage from './useMovieShowPage';

const MovieShowPage = () => {
  const {
    movie,
    t,
    feedFormStatus,
    handleRefecthQuotes,
    isLoading,
    quotes,
    currentQuoteId,
  } = useMovieShowPage();

  return (
    <FeedLayout>
      <>
        {!isLoading && movie.id !== undefined && (
          <>
            {feedFormStatus === 'edit-movie' ? (
              <FeedFormLayout title={`${t('update_movie_title')}`}>
                <EditMovieModal movie={movie} />
              </FeedFormLayout>
            ) : feedFormStatus === 'add-quote-movie' ? (
              <FeedFormLayout title={`${t('post_quote_title')}`}>
                <AddQuoteFromMovieModal
                  movie={movie}
                  handleRefecthQuotes={handleRefecthQuotes}
                />
              </FeedFormLayout>
            ) : feedFormStatus === 'view-quote' ? (
              <FeedFormLayout
                title={`${t('view_quote')}`}
                quoteId={currentQuoteId}
                isEdit={true}
                isDelete={false}
                handleRefecthQuotes={handleRefecthQuotes}
              >
                <ViewQuoteModal quoteId={currentQuoteId} />
              </FeedFormLayout>
            ) : feedFormStatus === 'edit-quote' ? (
              <FeedFormLayout
                title={`${t('edit_quote_title')}`}
                quoteId={currentQuoteId}
                isDelete={true}
                handleRefecthQuotes={handleRefecthQuotes}
              >
                <EditQuoteModal
                  handleRefecthQuotes={handleRefecthQuotes}
                  quoteId={currentQuoteId}
                  movieId={movie.id}
                />
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
                  <MovieQuotes
                    handleRefecthQuotes={handleRefecthQuotes}
                    movieImage={movie.thumbnail}
                    quotes={quotes}
                  />
                  <MovieDescription movie={movie} />
                </div>
              </div>
            )}
          </>
        )}
      </>
    </FeedLayout>
  );
};

export default MovieShowPage;
