import classes from '@/styles/Landing.module.css';
import { IsSureTypes } from './types';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

const IsSure = ({
  handleIsSure,
  updateProfileLoading,
  apiError,
}: IsSureTypes) => {
  const { t } = useTranslation('profile');

  useEffect(() => {
    if (apiError !== '') {
      handleIsSure(false);
    }
  }, [apiError, handleIsSure]);

  return (
    <div className='w-full flex items-center justify-center'>
      <div
        className={`${classes['is-sure']} flex flex-col pt-12 w-5/6 items-center justify-center mt-16 rounded-xl`}
      >
        <div className='w-full text-center pb-12 border-b-[1px] border-search-bar-border'>
          <p className='text-white'>{t('profile_sure')}</p>
        </div>
        <div className='flex justify-between w-full px-8 py-6'>
          <button
            onClick={() => handleIsSure(false)}
            type='button'
            className='text-input'
          >
            {t('profile_cancel')}
          </button>
          <button
            type='submit'
            disabled={updateProfileLoading}
            className={`text-white rounded px-4 py-1.5 text-primary-font ${
              updateProfileLoading
                ? 'bg-disabled'
                : 'bg-default-btn hover:bg-hover active:bg-active'
            }`}
          >
            {t('profile_confirm')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IsSure;
