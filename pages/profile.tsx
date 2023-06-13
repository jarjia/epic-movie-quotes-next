import { ProfilePage } from '@/components';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Profile = () => {
  return <ProfilePage />;
};

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'common',
        'formErrors',
        'profile',
      ])),
    },
  };
}

export default Profile;
