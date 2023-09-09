import { Feed } from '@/components';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getData } from './api/getUser';

const NewsFeed = (props: any) => {
  console.log(props);

  return <Feed />;
};

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  try {
    await getData();

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
