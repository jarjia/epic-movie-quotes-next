import { useUserUpdate } from '@/hooks';
import { MobileInputUpdateTypes } from './types';
import { hookUserUpdateTypes } from '@/types';
import { IsSure, PasswordInput } from '@/components';
import { useTranslation } from 'next-i18next';

const MobileUserUpdate = ({
  editProfile,
  handleEditProfileClear,
  handleIsSure,
  handleIsSuccess,
  isSure,
}: MobileInputUpdateTypes) => {
  const { t } = useTranslation('profile');
  const userUpdateProps: hookUserUpdateTypes = {
    handleIsSuccess,
    handleEditProfileClear,
    editProfile,
  };
  const {
    form,
    FormProvider,
    handleSubmit,
    input,
    isObjEmpty,
    errors,
    onSubmit,
    updateProfileLoading,
    apiError,
    handleClearApiError,
  } = useUserUpdate(userUpdateProps);
  const error: any = errors;

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='sm:block hidden'
        noValidate
      >
        {isSure ? (
          <IsSure
            apiError={apiError}
            handleIsSure={handleIsSure}
            updateProfileLoading={updateProfileLoading}
          />
        ) : (
          <>
            <div className='flex pt-12 pb-16 items-center justify-center w-full mt-4 bg-post-bg sm:bg-add-quote-bg rounded-xl'>
              <div className='w-5/6'>
                {editProfile.name !== 'password' ? (
                  <div className='flex flex-col'>
                    <label className='text-white mb-1' htmlFor='name'>
                      {editProfile.placeholder}
                    </label>
                    <input
                      type={editProfile.type}
                      {...form.register(editProfile.name)}
                      className='px-2 py-2 placeholder-placeholder focus:ring-2 focus:ring-ring-offset-color outline-none bg-input rounded'
                      placeholder={editProfile.placeholder}
                      autoComplete='off'
                    />
                    <div className='mt-[2px]'>
                      <p className='absolute text-default-btn font-normal text-md'>
                        {error[editProfile.name]?.message}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className='p-4 my-2 w-full border-[1px] border-search-bar-border'>
                      <h3 className='text-white'>
                        {t('profile_password_rules_title')}
                      </h3>
                      <ul className='pl-5 pt-2'>
                        <li className='list-disc text-input'>
                          {t('profile_password_rule_one')}
                        </li>
                        <li className='list-disc text-white'>
                          {t('profile_password_rule_two')}
                        </li>
                      </ul>
                    </div>
                    <PasswordInput
                      name={editProfile.name}
                      label={t('new_pass')}
                      errors={error}
                      placeholder={t('new_pass')}
                    />
                    <PasswordInput
                      name='c_password'
                      label={t('repeat_pass')}
                      errors={errors}
                      placeholder={t('repeat_pass')}
                    />
                  </>
                )}
                {apiError !== '' && (
                  <p className='text-center text-default-btn'>
                    {apiError || ''}
                  </p>
                )}
              </div>
            </div>
            <div className='flex p-2 items-center justify-between px-8 mt-2'>
              <button
                onClick={handleEditProfileClear}
                type='button'
                className='text-input text-primary-font'
              >
                {t('profile_cancel')}
              </button>
              <button
                type='button'
                onClick={() => {
                  handleClearApiError();
                  isObjEmpty(error) &&
                    input !== undefined &&
                    handleIsSure(true);
                }}
                className='text-white rounded px-5 py-1.5 text-primary-font bg-default-btn hover:bg-hover active:bg-active'
              >
                {t('profile_confirm')}
              </button>
            </div>
          </>
        )}
      </form>
    </FormProvider>
  );
};

export default MobileUserUpdate;
