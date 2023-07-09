import {
  BellIcon,
  BurgerIcon,
  DropDown,
  Notification,
  SearchbarIcon,
} from '@/components';
import useFeedNavbar from './useFeedNavbar';
import { AppBars } from '@/types';

const FeedNavbar: React.FC<AppBars> = ({ setShouldLogout, setIsBurger }) => {
  const {
    isNotification,
    t,
    notSeenNotifications,
    setIsSearch,
    router,
    setIsNotification,
  } = useFeedNavbar();

  return (
    <nav className='flex justify-between items-center z-[998] px-16 py-5 sm:px-8 fixed bg-form-back w-full'>
      <div>
        <h3 className='text-title uppercase sm:text-base sm:hidden font-medium'>
          movie quotes
        </h3>
        <button
          onClick={() => setIsBurger((prev: boolean) => !prev)}
          className='hidden sm:block'
        >
          <BurgerIcon />
        </button>
      </div>
      <div className='flex items-center gap-6'>
        {isNotification && (
          <div
            className='absolute top-0 z-[98] left-0 w-screen h-screen'
            onClick={() => setIsNotification(!isNotification)}
          ></div>
        )}
        {router.pathname === '/newsfeed' && (
          <button
            onClick={() => setIsSearch((prev: boolean) => !prev)}
            className='sm:block hidden'
          >
            <SearchbarIcon />
          </button>
        )}
        <div className='z-[98]'>
          <div
            onClick={() => setIsNotification(!isNotification)}
            className='cursor-pointer'
          >
            {notSeenNotifications !== 0 &&
              notSeenNotifications !== null &&
              notSeenNotifications !== undefined && (
                <div className='relative left-3 bottom-2'>
                  <div className='absolute bg-notify-color flex justify-center items-center text-center w-[26px] h-[26px] text-white rounded-full px-2'>
                    <span className='text-sm'>
                      {notSeenNotifications !== null &&
                      notSeenNotifications > 99
                        ? '99+'
                        : notSeenNotifications === 0
                        ? ''
                        : notSeenNotifications}
                    </span>
                  </div>
                </div>
              )}
            <BellIcon />
          </div>
          {isNotification && (
            <Notification setIsNotification={setIsNotification} />
          )}
        </div>
        <DropDown isNotification={isNotification} />
        <div className='flex gap-8 sm:gap-3 sm:hidden'>
          <div>
            <button
              onClick={() => setShouldLogout(true)}
              className='text-white rounded w-[96px] h-[38px] border-2 border-white'
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
