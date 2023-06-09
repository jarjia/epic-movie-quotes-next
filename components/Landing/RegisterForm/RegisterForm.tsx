import { Input, GoogleIcon, PasswordInput } from '@/components';
import useRegisterForm from './useRegisterForm';
import { HandleFormStatusTypes } from '@/types';
import { useTranslation } from 'next-i18next';

const RegisterForm: React.FC<HandleFormStatusTypes> = ({
  handleFormStatus,
}) => {
  const {
    errors,
    handleSubmit,
    onSubmit,
    handleUserRedirectGoogle,
    form,
    FormProvider,
  } = useRegisterForm(handleFormStatus);
  const { t } = useTranslation('landingForms');

  return (
    <div className='w-full h-full'>
      <div className='text-center sm:py-8'>
        <h2 className='text-form-title sm:text-2xl text-white font-medium'>
          {t('registration_title')}
        </h2>
        <h4 className='text-form-small-title sm:py-2'>
          {t('registration_desc')}
        </h4>
      </div>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            name='name'
            type='text'
            placeholder={t('name_placeholder')}
            label={t('name_label')}
            errors={errors}
          />
          <Input
            name='email'
            type='email'
            placeholder={t('email_placeholder')}
            label={t('email_label')}
            errors={errors}
          />
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
          <div className='pt-1'>
            <button
              type='submit'
              className='bg-default-btn hover:bg-hover mb-[12px] active:bg-active w-full py-[6px] rounded text-white'
            >
              {t('get_started')}
            </button>
            <button
              type='button'
              onClick={handleUserRedirectGoogle}
              className='bg-transparent flex justify-center items-center border-[1px] border-white w-full py-[6px] rounded text-white'
            >
              <GoogleIcon />
              <span className='pl-1'>{t('google_register')}</span>
            </button>
          </div>
        </form>
      </FormProvider>
      <div className='flex justify-center py-3'>
        <p className='absolute text-form-small-title'>
          {t('have_acc')}
          <button
            className='underline text-link'
            onClick={() => handleFormStatus('login')}
          >
            {t('log_in')}
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
