import React from 'react';
import useRecoverEmail from './useRecoverEmail';
import { HandleFormStatusTypes } from '@/types';
import { BackArrowIcon, Input } from '@/components';
import { useTranslation } from 'next-i18next';

const RecoverEmail: React.FC<HandleFormStatusTypes> = ({
  handleFormStatus,
}) => {
  const {
    handleSubmit,
    errors,
    form,
    onSubmit,
    recoverEmailLoading,
    FormProvider,
  } = useRecoverEmail(handleFormStatus);
  const { t } = useTranslation('landingForms');

  return (
    <div className='w-full h-full'>
      <div className='text-center sm:py-8'>
        <h2 className='my-2 text-form-title sm:text-2xl text-white font-medium'>
          {t('email_recover_title')}
        </h2>
        <h4 className='my-2 text-form-small-title sm:py-2'>
          {t('email_recover_desc')}
        </h4>
      </div>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            name='email'
            type='email'
            placeholder={t('email_placeholder')}
            label={t('email_label')}
            errors={errors}
          />
          <div className='pt-2'>
            <button
              type='submit'
              disabled={recoverEmailLoading}
              className={`${
                recoverEmailLoading
                  ? 'bg-disabled cursor-default'
                  : 'bg-default-btn hover:bg-hover active:bg-active'
              } mb-[12px] w-full py-[6px] rounded text-white`}
            >
              {t('email_recover_submit')}
            </button>
          </div>
        </form>
      </FormProvider>
      <div className='flex justify-center py-3'>
        <p className='absolute text-form-small-title'>
          <button
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

export default RecoverEmail;
