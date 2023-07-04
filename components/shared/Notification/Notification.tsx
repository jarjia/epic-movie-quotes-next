import { NotificationCard, TriangleIcon } from '@/components';
import useNotification from './useNotification';

const Notification = () => {
  const {
    isLoading,
    divRef,
    t,
    queryClient,
    notifications,
    filter,
    setFilter,
    setNotifications,
    router,
    markAllAsReadMutation,
  } = useNotification();

  return (
    <div>
      <div className='relative right-[6px] top-1'>
        <TriangleIcon />
      </div>
      <div className='absolute sm:left-0 right-20 sm:w-full w-[40%] mid:w-[60%]'>
        <div
          className='relative top-8 p-4 sm:p-2 bg-black rounded-xl'
          style={{ boxShadow: '0 0 30px black' }}
        >
          <div className='flex sm-max:flex-col mt-4 pb-2 items-center justify-between'>
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
                  queryClient.invalidateQueries('notifications');
                }, 200);
              }}
              className='sm-max:pt-2 underline sm:text-sm text-md text-white'
            >
              {t('mark_as_read')}
            </button>
          </div>
          <div className='flex sm-max:flex-col sm-max:text-center text-white gap-4 text-font-base'>
            <p>{t('filter_by')}: </p>
            <div
              className={`flex sm-max:justify-center items-center gap-2 ${
                router.locale === 'ka' ? 'sm:text-[11px]' : 'sm:text-base'
              }`}
            >
              <button
                className={`${
                  filter === 'like' ? 'underline text-placeholder' : ''
                } font-[400]`}
                onClick={() => {
                  if (filter === 'like') {
                    setFilter(null);
                  } else {
                    setFilter('like');
                  }
                }}
              >
                {t('filter_by_likes')}
              </button>
              <div
                className={`${
                  router.locale === 'ka' ? 'sm:h-[14px]' : 'sm:h-[18px]'
                } h-[20px] w-[2px] bg-white`}
              ></div>
              <button
                className={`${
                  filter === 'comment' ? 'underline text-placeholder' : ''
                } font-[400]`}
                onClick={() => {
                  if (filter === 'comment') {
                    setFilter(null);
                  } else {
                    setFilter('comment');
                  }
                }}
              >
                {t('filter_by_comments')}
              </button>
              <div
                className={`${
                  router.locale === 'ka' ? 'sm:h-[14px]' : 'sm:h-[18px]'
                } h-[20px] w-[2px] bg-white`}
              ></div>
              <button
                className={`${
                  filter === 'new' ? 'underline text-placeholder' : ''
                } font-[400]`}
                onClick={() => {
                  if (filter === 'new') {
                    setFilter(null);
                    queryClient.invalidateQueries(['notifications', 'new']);
                  } else {
                    setFilter('new');
                  }
                }}
              >
                {t('filter_by_new')}
              </button>
            </div>
          </div>
          <div
            ref={divRef}
            className='mt-8 max-h-[400px] sm-h:max-h-[300px] h-auto pb-1 pr-1 overflow-y-scroll scrollbar text-white'
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
              <p className='text-2xl mt-4'>Loading...</p>
            ) : (
              <p className='text-2xl mt-4'>{t('no_notifications')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
