import { EmailSentIcon } from '@/components';
import classes from '@/styles/Landing.module.css';
import { HandleFormStatusTypes } from '@/types';
import { useTranslation } from 'next-i18next';

const EmailSent: React.FC<HandleFormStatusTypes> = ({ handleFormStatus }) => {
  const { t } = useTranslation('landingForms');

  return (
    <div
      className={`${classes['mobile-linear']} sm:p-8 sm:rounded-form-radius flex flex-col items-center justify-center sm:relative sm:top-1/4`}
    >
      <EmailSentIcon />
      <h2 className='my-6 text-error-page-title text-white text-3xl'>
        {t('thank_you')}
      </h2>
      <p className='my-2 text-center text-white'>{t('email_verify_sent')}</p>
      <button
        onClick={() => handleFormStatus('login')}
        className='text-center mt-4 text-white py-2 rounded bg-default-btn hover:bg-hover w-full active:bg-active'
      >
        {t('log_in')}
      </button>
    </div>
  );
};

export default EmailSent;
