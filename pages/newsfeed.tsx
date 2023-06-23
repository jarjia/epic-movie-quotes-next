import { Feed } from '@/components';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const NewsFeed = () => {
  return <Feed />;
};

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
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
}

export default NewsFeed;
