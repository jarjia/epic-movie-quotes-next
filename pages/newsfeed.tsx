import { Feed } from '@/components';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const NewsFeed = () => {
  return <Feed />;
};

export async function getServerSideProps({
  locale,
  req,
}: GetServerSidePropsContext) {
  try {
    await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL_FOR_AUTH}/api/user`,
      {
        headers: {
          ...req.headers,
          Origin: 'http://localhost:3000',
          Referer: 'http://localhost:3000/',
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
    };
  } catch (error) {
    return {
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
