import { NotificationCard, TriangleIcon } from '@/components';

const Notification = () => {
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
            <h2 className='text-white text-3xl sm:text-2xl'>Notifications</h2>
            <button className='underline sm:text-lg text-xl text-white'>
              Mark all as read
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
