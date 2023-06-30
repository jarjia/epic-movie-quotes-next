import { LinkExpiredIcon } from '@/components';
import classes from '@/styles/Landing.module.css';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { LinkExpiretTypes } from './types';

const LinkExpired: React.FC<LinkExpiretTypes> = ({
  handleFormStatus,
  isProfile,
}) => {
  const router = useRouter();
  const { t } = useTranslation('landingForms');

  return (
    <div
      className={`${classes['mobile-linear']} sm:p-8 sm:rounded-form-radius flex flex-col items-center justify-center sm:relative sm:top-1/4`}
    >
      <LinkExpiredIcon />
      <h2
        className={`my-2 ${
          router.locale === 'ka' ? 'text-3xl' : 'text-error-page-title'
        } text-center text-white text-form-title`}
      >
        {t('expired_title')}
      </h2>
      <p className='my-2 text-center text-white'>{t('expired_desc')}</p>
      {!isProfile && (
        <button
          onClick={() => {
            if (router.query.recover_token !== undefined) {
              handleFormStatus('login');
            } else if (router.query.token !== undefined) {
              handleFormStatus('register');
            }
          }}
          className='text-center mt-4 text-white py-2 rounded bg-default-btn hover:bg-hover w-full active:bg-active'
        >
          {t('expired_submit')}
        </button>
      )}
    </div>
  );
};

export default LinkExpired;
