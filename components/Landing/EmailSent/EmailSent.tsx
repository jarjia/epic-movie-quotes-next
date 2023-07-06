import { EmailSentIcon } from '@/components';
import { useTranslation } from 'next-i18next';
import { EmailSent } from './types';

const EmailSent: React.FC<EmailSent> = ({ isProfile }) => {
  const { t } = useTranslation('landingForms');

  return (
    <div
      className={`mobile-linear sm:p-8 sm:rounded-form-radius flex flex-col items-center justify-center sm:relative sm:top-1/4`}
    >
      <EmailSentIcon />
      <h2
        className={`my-2 text-error-page-title text-white ${
          isProfile ? 'text-xl' : 'text-form-title'
        }`}
      >
        {isProfile ? t('check_mail') : t('thank_you')}
      </h2>
      <p className='my-2 text-center text-white'>{t('email_verify_sent')}</p>
      {!isProfile && (
        <a
          href='https://mail.google.com'
          target='_blank'
          className='text-center mt-4 text-white py-2 rounded bg-default-btn hover:bg-hover w-full active:bg-active'
        >
          {t('go_to_mail')}
        </a>
      )}
    </div>
  );
};

export default EmailSent;
