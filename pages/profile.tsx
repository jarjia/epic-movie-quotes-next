import { ProfilePage } from '@/components';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Profile = () => {
  return <ProfilePage />;
};

export async function getStaticProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'common',
        'formErrors',
        'profile',
        'landingForms',
        'movieList',
        'apiErrors',
      ])),
    },
  };
}

export default Profile;
