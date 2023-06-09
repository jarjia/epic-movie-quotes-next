import {
  BellIcon,
  BurgerIcon,
  DropDown,
  MobileSearchbar,
  Notification,
  SearchbarIcon,
} from '@/components';
import useFeedNavbar from './useFeedNavbar';
import { useTranslation } from 'next-i18next';

const FeedNavbar = () => {
  const {
    handleLogout,
    isNotification,
    isSearch,
    handleIsBurger,
    handleIsSearch,
    router,
    handleisNotification,
  } = useFeedNavbar();
  const { t } = useTranslation('common');

  return (
    <nav className='flex justify-between items-center z-[10] px-16 py-5 sm:px-8 fixed bg-form-back w-full'>
      <div>
        <h3 className='text-title uppercase sm:text-base sm:hidden'>
          movie quotes
        </h3>
        <button onClick={handleIsBurger} className='hidden sm:block'>
          <BurgerIcon />
        </button>
      </div>
      <div className='flex items-center gap-6'>
        {isNotification && (
          <div
            className='absolute top-0 z-[98] left-0 w-screen h-screen'
            onClick={handleisNotification}
          ></div>
        )}
        {router.pathname === '/newsfeed' && (
          <button onClick={handleIsSearch} className='sm:block hidden'>
            <SearchbarIcon />
          </button>
        )}
        {isSearch && <MobileSearchbar />}
        <div className='z-[98]'>
          <div onClick={handleisNotification} className='cursor-pointer'>
            <div className='relative left-3 bottom-2'>
              <div className='absolute text-white rounded-full px-2 bg-notify-color'>
                3
              </div>
            </div>
            <BellIcon />
          </div>
          {isNotification && <Notification />}
        </div>
        <DropDown isNotification={isNotification} />
        <div className='flex gap-8 sm:gap-3 sm:hidden'>
          <div>
            <button
              onClick={handleLogout}
              className='text-white rounded sm:px-4 sm:py-[3px] px-6 py-[7px] border-2 border-white'
            >
              {t('log_out')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default FeedNavbar;
