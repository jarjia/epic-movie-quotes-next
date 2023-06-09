import { Feed } from '@/components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const NewsFeed = () => {
  return <Feed />;
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'formErrors',
        'newsFeed',
      ])),
    },
  };
}

export default NewsFeed;
