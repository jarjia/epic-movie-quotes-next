import { GoogleIcon, Checkbox, Input, PasswordInput } from '@/components';
import useLoginForm from './useLoginForm';
import { HandleFormStatusTypes } from '@/types';

const LoginForm: React.FC<HandleFormStatusTypes> = ({ handleFormStatus }) => {
  const {
    errors,
    handleSubmit,
    onSubmit,
    setIsAuthorizingWithGoogle,
    isLoading,
    googleRedirectLoading,
    form,
    FormProvider,
    t,
  } = useLoginForm();

  return (
    <div className='w-full h-full'>
      <div className='text-center mb-8 sm:py-8 sm:pt-16 sm:mb-0'>
        <h2 className='text-form-title sm:text-2xl text-white font-medium'>
          {t('login_title')}
        </h2>
        <h4 className='text-form-small-title sm:py-2'>{t('login_desc')}</h4>
      </div>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            name='user'
            type='text'
            placeholder={t('username_placeholder')}
            label={t('name_or_email')}
            errors={errors}
          />
          <PasswordInput
            name='password'
            placeholder={t('password_placeholder')}
            label={t('password_label')}
            errors={errors}
          />
          <div className='flex justify-between py-2'>
            <div className='flex items-center gap-2 mb-2'>
              <Checkbox name='remember_me' label={t('rememeber_me')} />
            </div>
            <button
              type='button'
              className='text-link underline'
              onClick={() => handleFormStatus('recover-email')}
            >
              {t('forgot_password')}
            </button>
          </div>
          <div className='pt-1'>
            <button
              type='submit'
              disabled={isLoading}
              className={`${
                isLoading
                  ? 'bg-disabled cursor-default'
                  : 'bg-default-btn hover:bg-hover active:bg-active'
              } mb-[12px] w-full py-[6px] rounded text-white`}
            >
              {t('sign_in')}
            </button>
            <button
              type='button'
              onClick={() => setIsAuthorizingWithGoogle(true)}
              disabled={googleRedirectLoading}
              className='bg-transparent flex justify-center items-center border-[1px] border-white w-full py-[6px] rounded text-white'
            >
              <GoogleIcon />
              <span className='pl-1'>{t('google_register')}</span>
            </button>
          </div>
        </form>
      </FormProvider>
      <div className='flex justify-center pt-3'>
        <p className='text-form-small-title'>
          {t('have_not_acc')}
          <button
            className='underline text-link'
            onClick={() => handleFormStatus('register')}
          >
            {t('sign_up')}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
