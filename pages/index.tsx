import { Main } from '@/components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Landing = () => {
  return <Main />;
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'landing',
        'common',
        'landingForms',
        'formErrors',
      ])),
    },
  };
}

export default Landing;
