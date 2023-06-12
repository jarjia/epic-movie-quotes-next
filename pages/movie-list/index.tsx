import { MovieListPage as MoviePage } from '@/components';
import { AppContext } from '@/context';
import axios from 'axios';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useContext, useEffect } from 'react';

const MovieListPage = (props: any) => {
  const { handleUserData } = useContext(AppContext);

  useEffect(() => {
    handleUserData(props.userData);
  }, [props.userData, handleUserData]);

  return <MoviePage />;
};

export async function getServerSideProps({ locale, req }: any) {
  const headers = {
    ...req.headers,
    Origin: `${process.env.NEXT_PUBLIC_APP_BASE_URL}`,
    Referer: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/`,
  };

  try {
    const res = await axios.get('http://127.0.0.1:8000/api/user', {
      headers: headers,
    });

    const userData = res.data;

    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'common',
          'formErrors',
          'movieList',
        ])),
        userData,
      },
    };
  } catch (error) {
    console.error('An error occurred:', error);
    return {
      redirect: {
        destination: '/403',
        permanent: false,
      },
    };
  }
}

export default MovieListPage;
