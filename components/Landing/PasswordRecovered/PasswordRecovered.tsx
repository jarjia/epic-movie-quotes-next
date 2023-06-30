import { SuccessIcon } from '@/components';
import { HandleFormStatusTypes } from '@/types';
import classes from '@/styles/Landing.module.css';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const PasswordRecovered: React.FC<HandleFormStatusTypes> = ({
  handleFormStatus,
}) => {
  const { t } = useTranslation('landingForms');
  const router = useRouter();

  return (
    <div
      className={`${classes['mobile-linear']} sm:p-8 sm:rounded-form-radius flex flex-col items-center justify-center sm:relative sm:top-1/4`}
    >
      <SuccessIcon />
      <h2
        className={`my-2 text-white ${
          router.locale === 'ka' ? 'text-2xl' : 'text-form-title'
        }`}
      >
        {t('recovered_success')}
      </h2>
      <p className='my-2 text-center text-white'>
        {t('recovered_success_desc')}
      </p>
      <button
        onClick={() => handleFormStatus('login')}
        className='text-center mt-4 text-white py-2 rounded bg-default-btn hover:bg-hover w-full active:bg-active'
      >
        {t('log_in')}
      </button>
    </div>
  );
};

export default PasswordRecovered;
