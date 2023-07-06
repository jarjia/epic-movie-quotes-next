import { useUserUpdate } from '@/hooks';
import { MobileInputUpdate } from './types';
import { HookUserUpdate } from '@/types';
import { IsSure, PasswordInput } from '@/components';
import { useTranslation } from 'next-i18next';

const MobileUserUpdate = ({
  editProfile,
  handleEditProfileClear,
  handleIsSure,
  handleIsSuccess,
  isSure,
}: MobileInputUpdate) => {
  const { t } = useTranslation('profile');
  const userUpdateProps: HookUserUpdate = {
    handleIsSuccess,
    handleEditProfileClear,
    editProfile,
    handleIsSure,
  };
  const {
    form,
    FormProvider,
    handleSubmit,
    input,
    isObjEmpty,
    trigger,
    errors,
    onSubmit,
    updateProfileLoading,
    apiError,
    setApiError,
    password,
  } = useUserUpdate(userUpdateProps);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='sm:block hidden'
        noValidate
      >
        {isSure ? (
          <IsSure
            name={editProfile.name}
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
                      className='autofill-for-landing px-2 py-2 placeholder-placeholder focus:ring-2 focus:ring-ring-offset-color outline-none bg-input rounded'
                      placeholder={editProfile.placeholder}
                      autoComplete='off'
                    />
                    <div className='mt-[2px]'>
                      <p className='absolute text-default-btn font-normal text-md'>
                        {errors[editProfile.name]?.message as string}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className='p-4 my-2 w-full border-[1px] border-search-bar-border'>
                      <h3 className='text-white'>
                        {t('profile_password_rules_title')}
                      </h3>
                      <ul className='list-disc pl-5 pt-2'>
                        <li
                          className={`${
                            password?.length >= 8
                              ? 'text-disc-valid'
                              : 'text-input'
                          }`}
                        >
                          <span
                            className={`${
                              password?.length >= 8
                                ? 'text-white'
                                : 'text-input'
                            }`}
                          >
                            {t('profile_password_rule_one')}
                          </span>
                        </li>
                        <li
                          className={`${
                            password?.length <= 15 && password?.length > 0
                              ? 'text-disc-valid'
                              : 'text-input'
                          }`}
                        >
                          <span
                            className={`${
                              password?.length <= 15 && password?.length > 0
                                ? 'text-white'
                                : 'text-input'
                            }`}
                          >
                            {t('profile_password_rule_two')}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <PasswordInput
                      name={editProfile.name}
                      label={t('new_pass')}
                      errors={errors}
                      placeholder='***********'
                    />
                    <PasswordInput
                      name='c_password'
                      label={t('repeat_pass')}
                      errors={errors}
                      placeholder='***********'
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
                onClick={() =>
                  handleEditProfileClear({
                    name: '',
                    label: '',
                    placeholder: '',
                    isEdit: false,
                    type: '',
                  })
                }
                type='button'
                className='text-input text-primary-font'
              >
                {t('profile_cancel')}
              </button>
              <button
                type='button'
                onClick={() => {
                  trigger();
                  setApiError('');
                  isObjEmpty(errors) &&
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
