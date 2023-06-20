import { NotificationCard, TriangleIcon } from '@/components';
import useNotification from './useNotification';

const Notification = () => {
  const {
    isLoading,
    divRef,
    t,
    queryClient,
    notifications,
    setNotifications,
    markAllAsReadMutation,
  } = useNotification();

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
            <button
              onClick={() => {
                setNotifications((prev) =>
                  prev.map((item) => ({ ...item, seen: 1 }))
                );
                markAllAsReadMutation();
                setTimeout(() => {
                  queryClient.invalidateQueries('notifications-count');
                }, 200);
              }}
              className='underline sm:text-lg text-md text-white'
            >
              {t('mark_as_read')}
            </button>
          </div>
          <div
            ref={divRef}
            className='mt-8 max-h-[400px] pr-1 overflow-y-scroll scrollbar text-white'
          >
            {notifications !== undefined && notifications.length !== 0 ? (
              notifications.map((item) => {
                return (
                  <NotificationCard
                    key={item.id}
                    id={item.id}
                    type={item.notification}
                    name={item.from.name}
                    thumbnail={item.from.thumbnail}
                    ago={item.created_at}
                    seen={item.seen}
                    created_at={item.created_at}
                    quoteId={item.quote_id}
                  />
                );
              })
            ) : isLoading ? (
              <p className='text-2xl'>Loading...</p>
            ) : (
              <p className='text-2xl'>No notifications...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
