import { MovieShowPage } from '@/components';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const MovieShow = () => {
  return <MovieShowPage />;
};

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
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

export default MovieShow;
