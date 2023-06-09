import {
  BackArrowIcon,
  ChangesSuccess,
  FeedLayout,
  MobileUserUpdate,
  UserUpdate,
} from '@/components';
import useProfile from './useProfile';
import { useTranslation } from 'next-i18next';

const ProfilePage = () => {
  const {
    handleBackButton,
    handleEditProfile,
    handleEditProfileClear,
    handleIsSure,
    editProfile,
    isSure,
    isSuccess,
    handleIsSuccess,
  } = useProfile();
  const { t } = useTranslation('profile');

  return (
    <FeedLayout>
      <div className='pb-8 large:px-16'>
        {isSuccess && <ChangesSuccess handleIsSuccess={handleIsSuccess} />}
        <h1 className='text-white text-2xl large:p-6 p-2 px-8 sm:hidden block'>
          {t('profile_title')}
        </h1>
        <div className='hidden sm:flex p-5'>
          <button onClick={handleBackButton}>
            <BackArrowIcon isSearch={true} />
          </button>
        </div>
        <div
          className={`large:pt-20 opacity-1 ${
            isSuccess ? 'sm:opacity-[0.2]' : 'sm:opacity-1'
          }`}
        >
          {editProfile.isEdit === false ? (
            <UserUpdate
              editProfile={editProfile}
              handleEditProfileClear={handleEditProfileClear}
              handleEditProfile={handleEditProfile}
              handleIsSuccess={handleIsSuccess}
            />
          ) : (
            <MobileUserUpdate
              handleIsSure={handleIsSure}
              handleIsSuccess={handleIsSuccess}
              isSure={isSure}
              handleEditProfileClear={handleEditProfileClear}
              editProfile={editProfile}
            />
          )}
        </div>
      </div>
    </FeedLayout>
  );
};

export default ProfilePage;
