import { BackArrowIcon, FeedLayout } from '@/components';
import { ChangesSuccess, MobileUserUpdate, UserUpdate } from './components';
import { useProfile } from './hooks';

const Profile = () => {
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

  return (
    <FeedLayout>
      <div className='pb-8'>
        {isSuccess && <ChangesSuccess handleIsSuccess={handleIsSuccess} />}
        <h1 className='text-white text-2xl p-2 px-8 sm:hidden block'>
          My profile
        </h1>
        <div className='hidden sm:flex p-5'>
          <button onClick={handleBackButton}>
            <BackArrowIcon isSearch={true} />
          </button>
        </div>
        <div
          className={`opacity-1 ${
            isSuccess ? 'sm:opacity-[0.2]' : 'sm:opacity-1'
          }`}
        >
          {editProfile.isEdit === false ? (
            <UserUpdate
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

export default Profile;
