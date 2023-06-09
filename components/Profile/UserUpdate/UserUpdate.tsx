import { UserProfile, UpdateInput } from '@/components';
import { UserUpdateTypes } from './types';
import { hookUserUpdateTypes } from '@/types';
import { useUserUpdate } from '@/hooks';
import { useTranslation } from 'next-i18next';

const UserUpdate: React.FC<UserUpdateTypes> = ({
  handleEditProfile,
  handleEditProfileClear,
  handleIsSuccess,
  editProfile,
}) => {
  const userUpdateProps: hookUserUpdateTypes = {
    handleIsSuccess,
    handleEditProfileClear,
    editProfile,
  };
  const {
    userData,
    handleSubmit,
    cancel,
    isEditing,
    handleCancel,
    img,
    handleEditing,
    form,
    onSubmit,
    FormProvider,
    apiError,
    handleClearApiError,
    errors,
  } = useUserUpdate(userUpdateProps);
  const { t } = useTranslation('profile');

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='pb-8 w-full large:pb-24 mt-4 bg-post-bg sm:bg-add-quote-bg sm:pb-24 sm:pt-8 rounded-xl'>
          <div className='flex items-center justify-center w-full '>
            <div className='w-1/4 sm:w-1/2 sm:bottom-0 relative bottom-16'>
              <label className='cursor-pointer'>
                <input
                  {...form.register('thumbnail')}
                  type='file'
                  className='hidden'
                />
                <div className='flex flex-col items-center p-3 text-white gap-2'>
                  {img === null ? (
                    <UserProfile width='120px' height='120px' />
                  ) : (
                    <div
                      className='w-[120px] h-[120px] rounded-full bg-center bg-cover'
                      style={{
                        backgroundImage: `url(${img})`,
                      }}
                    ></div>
                  )}
                  <p className='text-center'>{t('upload_photo')}</p>
                </div>
              </label>
            </div>
          </div>
          <UpdateInput
            type='text'
            placeholder={t('new_name_placeholder')}
            name='name'
            label={t('new_name_label')}
            newLabel={t('new_name_new_label')}
            cancel={cancel}
            handleCancel={handleCancel}
            handleEditing={handleEditing}
            defaultValue={userData?.name}
            handleEditProfile={handleEditProfile}
            repeatName=''
            errors={errors}
          />
          <UpdateInput
            type='email'
            placeholder={t('new_email_placeholder')}
            name='email'
            label={t('new_email_label')}
            newLabel=''
            defaultValue={userData?.email}
            handleCancel={handleCancel}
            handleEditing={handleEditing}
            handleEditProfile={handleEditProfile}
            repeatName=''
          />
          {userData.google_id === null && (
            <UpdateInput
              type='password'
              placeholder={t('new_password_placeholder')}
              name='password'
              repeatName='c_password'
              label={t('new_password_label')}
              newLabel={t('new_password_new_label')}
              repeatLabel={t('new_password_repeat_placeholder') as string}
              cancel={cancel}
              handleCancel={handleCancel}
              handleEditing={handleEditing}
              handleEditProfile={handleEditProfile}
              defaultValue=''
              errors={errors}
            />
          )}
          {apiError !== '' && (
            <p className='text-center text-default-btn'>{apiError}</p>
          )}
        </div>
        <div className='flex justify-end gap-4 py-3'>
          {isEditing && (
            <>
              <button
                className='text-input'
                type='button'
                onClick={() => {
                  handleClearApiError();
                  handleCancel(true);
                }}
              >
                {t('profile_cancel')}
              </button>
              <button
                className='text-white rounded py-2 px-3 bg-default-btn hover:bg-hover active:bg-active'
                type='submit'
                onClick={handleClearApiError}
              >
                {t('profile_save')}
              </button>
            </>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default UserUpdate;
