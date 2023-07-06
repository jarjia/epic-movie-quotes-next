import { MovieListPage as MoviePage } from '@/components';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const MovieListPage = () => {
  return <MoviePage />;
};

export async function getStaticProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'common',
        'formErrors',
        'movieList',
        'apiErrors',
      ])),
    },
  };
}

export default MovieListPage;
