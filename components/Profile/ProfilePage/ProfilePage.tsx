import {
  BackArrowIcon,
  ChangesSuccess,
  EmailSent,
  FeedFormLayout,
  FeedLayout,
  FormLayout,
  LinkExpired,
  MobileUserUpdate,
  UserUpdate,
  ViewQuoteModal,
} from '@/components';
import useProfile from './useProfile';

const ProfilePage = () => {
  const {
    handleBackButton,
    setEditProfile,
    setIsSure,
    feedFormStatus,
    editProfile,
    t,
    isSure,
    handleClearForms,
    isSuccess,
    setIsSuccess,
    currentQuoteId,
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
        {feedFormStatus === 'view-quote' ? (
          <FeedFormLayout title={`${t('view_quote')}`}>
            <ViewQuoteModal quoteId={currentQuoteId} />
          </FeedFormLayout>
        ) : null}
        <div className='pb-1 px-4 sm:px-0 large:px-0 drop-shadow-none'>
          {isSuccess && <ChangesSuccess handleIsSuccess={setIsSuccess} />}
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
                handleEditProfileClear={setEditProfile}
                handleEditProfile={setEditProfile}
                handleIsSuccess={setIsSuccess}
                handleIsSure={setIsSure}
              />
            ) : (
              <MobileUserUpdate
                handleIsSure={setIsSure}
                handleIsSuccess={setIsSuccess}
                isSure={isSure}
                handleEditProfileClear={setEditProfile}
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
