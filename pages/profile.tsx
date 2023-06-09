import { ProfilePage } from '@/components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Profile = () => {
  return <ProfilePage />;
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'formErrors',
        'profile',
      ])),
    },
  };
}

export default Profile;
