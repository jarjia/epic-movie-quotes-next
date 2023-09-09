import { Feed } from '@/components';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const NewsFeed = (props: any) => {
  console.log(props);

  return <Feed />;
};

export async function getServerSideProps({
  locale,
  req,
}: GetServerSidePropsContext) {
  try {
    const res = await axios.get(
      `https://api-movie-quotes.jarji-abuashvili.link/api/user`,
      {
        headers: {
          ...req.headers,
          Origin: 'https://movie-quotes.jarji-abuashvili.link',
          Referer: `https://movie-quotes.jarji-abuashvili.link/`,
        },
      }
    );

    return {
      props: {
        ...(await serverSideTranslations(locale as string, [
          'common',
          'formErrors',
          'newsFeed',
          'apiErrors',
        ])),
      },
      data: res.data,
    };
  } catch (error) {
    return {
      data: error,
      redirect: {
        destination: '/403',
        permanent: false,
      },
    };
  }
}

export default NewsFeed;

// try {
//   await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`);

//   return {
//     props: {
//       ...(await serverSideTranslations(locale as string, [
//         'common',
//         'formErrors',
//         'newsFeed',
//         'apiErrors',
//       ])),
//     },
//   };
// } catch (error) {
//   res.writeHead(302, {
//     Location: '/403',
//   });
//   res.end();
// }
