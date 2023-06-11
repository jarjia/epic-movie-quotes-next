import {
  AddMovieModal,
  FeedFormLayout,
  FeedLayout,
  ListHeader,
  Movies,
} from '@/components';
import useMovieListPage from './useMovieListPage';
import { useTranslation } from 'next-i18next';

const MovieListPage = () => {
  const { feedFormStatus, movies, loading } = useMovieListPage();
  const { t } = useTranslation('movieList');

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
          <Movies loading={loading} movies={movies} />
        </div>
      </>
    </FeedLayout>
  );
};

export default MovieListPage;
