import { SuccessIcon } from '@/components';
import { HandleFormStatus } from '@/types';
import { useTranslation } from 'next-i18next';

const Verified: React.FC<HandleFormStatus & { isLanding: boolean }> = (
  props
) => {
  const { t } = useTranslation('landingForms');

  return (
    <div className='mobile-linear sm:p-8 sm:rounded-form-radius flex flex-col items-center justify-center sm:relative sm:top-1/4'>
      <SuccessIcon />
      <h2 className='my-6 text-center text-error-page-title text-white text-form-title'>
        {t('thank_you')}
      </h2>
      <p className='my-2 text-center text-white'>{t('verified')}</p>
      {props.isLanding && (
        <button
          onClick={() => props.handleFormStatus('login')}
          className='text-center mt-4 text-white py-2 rounded bg-default-btn hover:bg-hover w-full active:bg-active'
        >
          {t('go_to_login')}
        </button>
      )}
    </div>
  );
};

export default Verified;
