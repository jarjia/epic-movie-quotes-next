import { MovieShowPage } from '@/components';
import axios from 'axios';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const MovieShow = () => {
  return <MovieShowPage />;
};

export async function getStaticPaths() {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  console.log(res);

  const paths = res.data.map((movie: any) => ({
    params: { movieId: movie.id.toString() },
  }));

  return {
    paths: paths,
    fallback: true,
  };
}

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

export default MovieShow;
