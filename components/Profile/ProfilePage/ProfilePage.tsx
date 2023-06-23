import {
  BackArrowIcon,
  ChangesSuccess,
  EmailSent,
  FeedLayout,
  FormLayout,
  LinkExpired,
  MobileUserUpdate,
  UserUpdate,
} from '@/components';
import useProfile from './useProfile';

const ProfilePage = () => {
  const {
    handleBackButton,
    handleEditProfile,
    handleEditProfileClear,
    handleIsSure,
    feedFormStatus,
    editProfile,
    t,
    isSure,
    handleClearForms,
    isSuccess,
    handleIsSuccess,
  } = useProfile();

  return (
    <FeedLayout>
      <>
        <div className='absolute top-0 left-0 z-[999]'>
          {feedFormStatus === 'link-expired' ? (
            <FormLayout handleFormStatus={handleClearForms}>
              <LinkExpired
                isProfile={true}
                handleFormStatus={handleClearForms}
              />
            </FormLayout>
          ) : feedFormStatus === 'email-sent' ? (
            <FormLayout handleFormStatus={handleClearForms}>
              <EmailSent isProfile={true} handleFormStatus={handleClearForms} />
            </FormLayout>
          ) : null}
        </div>
        <div className='pb-1 large:px-16'>
          {isSuccess && <ChangesSuccess handleIsSuccess={handleIsSuccess} />}
          <h1 className='text-white text-2xl large:p-6 p-2 px-8 sm:hidden block'>
            {t('profile_title')}
          </h1>
          <div className='hidden sm:flex p-5 py-2'>
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
      </>
    </FeedLayout>
  );
};

export default ProfilePage;
