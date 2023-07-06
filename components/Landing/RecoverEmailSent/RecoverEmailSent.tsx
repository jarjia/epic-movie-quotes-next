import { EmailSentIcon } from '@/components';
import { HandleFormStatus } from '@/types';
import { useTranslation } from 'next-i18next';

const RecoverEmailSent: React.FC<HandleFormStatus> = ({ handleFormStatus }) => {
  const { t } = useTranslation('landingForms');
  return (
    <div className='mobile-linear sm:p-8 sm:rounded-form-radius flex flex-col items-center justify-center sm:relative sm:top-1/4'>
      <EmailSentIcon />
      <h2 className='my-2 text-center leading-[1.15] text-error-page-title text-white text-form-title'>
        {t('check_mail')}
      </h2>
      <p className='my-2 text-center text-white'>{t('check_desc')}</p>
      <a
        href='https://mail.google.com'
        target='_blank'
        className='text-center mt-4 text-white py-2 rounded bg-default-btn hover:bg-hover w-full active:bg-active'
      >
        {t('go_to_mail')}
      </a>
      <button
        onClick={() => handleFormStatus('null')}
        className='mt-8 hover:underline text-form-small-title'
      >
        {t('skip')}
      </button>
    </div>
  );
};

export default RecoverEmailSent;
