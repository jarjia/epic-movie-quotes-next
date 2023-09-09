import { DropDown } from '@/components';
import { HandleFormStatus } from '@/types';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

const Navbar: React.FC<HandleFormStatus> = (props) => {
  const { t } = useTranslation('landing');

  useEffect(() => {
    console.log(
      process.env.NEXT_PUBLIC_API_BASE_URL_FOR_AUTH,
      process.env.NEXT_PUBLIC_APP_BASE_URL
    );
  }, []);

  return (
    <nav className='flex justify-between items-center sm:px-4 z-[3] px-16 py-5 fixed bg-post-bg shadow w-full'>
      <div>
        <h3 className='text-title uppercase sm:text-base font-medium'>
          Movie quotes
        </h3>
      </div>
      <div className='flex gap-8'>
        <DropDown isNotification={false} />
        <div className='flex gap-8 sm:gap-3'>
          <div>
            <button
              onClick={() => props.handleFormStatus('register')}
              className='text-white rounded sm:px-4 sm:py-[4px] px-6 py-[8px] bg-default-btn hover:bg-hover active:bg-active'
            >
              {t('sign_up')}
            </button>
          </div>
          <div>
            <button
              onClick={() => props.handleFormStatus('login')}
              className='text-white rounded sm:px-4 sm:py-[3px] px-6 py-[7px] border-2 border-white'
            >
              {t('log_in')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
