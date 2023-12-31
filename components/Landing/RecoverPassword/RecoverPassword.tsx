import { HandleFormStatus } from '@/types';
import useRecoverPassword from './useRecoverPassword';
import { BackArrowIcon, PasswordInput } from '@/components';

const RecoverPassword: React.FC<HandleFormStatus> = ({ handleFormStatus }) => {
  const {
    handleSubmit,
    errors,
    form,
    passwordRecoverLoading,
    onSubmit,
    FormProvider,
    t,
  } = useRecoverPassword(handleFormStatus);

  return (
    <div className='w-full h-full'>
      <div className='text-center sm:py-8'>
        <h2 className='my-2 text-form-title sm:text-2xl text-white font-medium'>
          {t('recover_title')}
        </h2>
        <h4 className='my-2 text-form-small-title sm:py-2'>
          {t('recover_desc')}
        </h4>
      </div>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <PasswordInput
            name='password'
            placeholder={t('password_placeholder')}
            label={t('password_label')}
            errors={errors}
          />
          <PasswordInput
            name='confirm_password'
            placeholder={t('password_confirm_placeholder')}
            label={t('password_confirm_label')}
            errors={errors}
          />
          <div className='pt-2'>
            <button
              type='submit'
              disabled={passwordRecoverLoading}
              className={`${
                passwordRecoverLoading
                  ? 'bg-disabled cursor-default'
                  : 'bg-default-btn hover:bg-hover active:bg-active'
              } mb-[12px] w-full py-[6px] rounded text-white`}
            >
              {t('recover_submit')}
            </button>
          </div>
        </form>
      </FormProvider>
      <div className='flex justify-center py-3'>
        <p className='absolute text-form-small-title'>
          <button
            type='button'
            className='flex items-center gap-4 hover:underline'
            onClick={() => handleFormStatus('login')}
          >
            <BackArrowIcon isSearch={false} />
            {t('back_to_login')}
          </button>
        </p>
      </div>
    </div>
  );
};

export default RecoverPassword;
