import { MovieListPage as MoviePage } from '@/components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const MovieListPage = () => {
  return <MoviePage />;
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'formErrors',
        'movieList',
      ])),
    },
  };
}

export default MovieListPage;
