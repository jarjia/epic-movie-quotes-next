import { DropDown } from '@/components';
import { HandleFormStatusTypes } from '@/types';
import { useTranslation } from 'next-i18next';

const Navbar: React.FC<HandleFormStatusTypes> = (props) => {
  const { t } = useTranslation('landing');

  return (
    <nav className='flex justify-between items-center sm:px-4 px-16 py-5 fixed bg-transparent w-full'>
      <div>
        <h3 className='text-title uppercase sm:text-base'>Movie quotes</h3>
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
