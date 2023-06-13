import { Main } from '@/components';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Landing = () => {
  return <Main />;
};

export async function getStaticProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'landing',
        'common',
        'landingForms',
        'formErrors',
      ])),
    },
  };
}

export default Landing;
