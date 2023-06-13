import { NotificationCard, TriangleIcon } from '@/components';
import { useTranslation } from 'next-i18next';

const Notification = () => {
  const { t } = useTranslation('common');

  return (
    <div className='bg-red-500'>
      <div className='relative right-[6px] top-1'>
        <TriangleIcon />
      </div>
      <div className='absolute sm:left-0 right-20 sm:w-full w-[40%]'>
        <div
          className='relative top-8 p-4 sm:p-2 bg-black rounded-xl'
          style={{ boxShadow: '0 0 30px black' }}
        >
          <div className='flex mt-4 items-center justify-between'>
            <h2 className='text-white text-3xl sm:text-2xl'>
              {t('notifications')}
            </h2>
            <button className='underline sm:text-lg text-md text-white'>
              {t('mark_as_read')}
            </button>
          </div>
          <div className='mt-8 text-white'>
            <NotificationCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
