import { AddFriendIcon, FilledHeartIcon, QuoteIcon } from '@/components';
import { NotificationCard } from './types';
import useNotificationCard from './useNotificationCard';

const NotificationCard: React.FC<NotificationCard> = (props) => {
  const {
    readNotificationMutate,
    timePassed,
    handleCurrentQuoteId,
    t,
    rejectFriendMutation,
    acceptFriendMutation,
    acceptLoading,
    refetchUserFriends,
    rejectLoading,
    curLocale,
    handleFeedFormStatus,
  } = useNotificationCard(props.created_at);

  return (
    <div
      onClick={() => {
        if (props.type !== 'friend-request') {
          handleCurrentQuoteId(String(props.quoteId));
          readNotificationMutate(props.id);
          handleFeedFormStatus('view-quote');
          props.setIsNotification((prev: boolean) => !prev);
        }
      }}
      className={`flex ${
        props.type === 'friend-request' ? 'cursor-default' : 'cursor-pointer'
      } p-4 my-3 items-center border-[1px] gap-2 border-placeholder-opacity rounded`}
    >
      <div className='flex flex-col justify-center items-center'>
        <div
          className={`w-profile border-2 h-profile relative sm:bottom-4 rounded-full bg-center bg-cover ${
            props.seen === 0 && props.type !== 'friend-request'
              ? 'border-valid-form'
              : 'border-black'
          }`}
          style={{ backgroundImage: `url(${props.thumbnail})` }}
        ></div>
        <p className='relative bottom-4 sm-max:text-base justify-center text-valid-form w-full text-xl text-center sm:text-lg hidden sm:flex'>
          <span className='absolute'>
            {props.type !== 'friend-request' && props.seen === 0
              ? t('new')
              : ''}
          </span>
        </p>
      </div>
      <div className='w-full pl-1'>
        <div className='flex items-center justify-between'>
          <h4 className='text-xl sm-max:text-base'>{props.name}</h4>
          <p className='text-lg capitalize sm:hidden text-date-of-notification sm:text-lg'>
            {timePassed}
            {curLocale === 'ka' && 'ს'} {t('ago')}
          </p>
        </div>
        <div className='my-2 flex sm:block items-center justify-between'>
          <div className='flex w-full sm-max:text-tiny-base sm:text-lg items-center text-xl gap-2 text-date-of-notification'>
            {props.type === 'like' ? (
              <>
                <FilledHeartIcon />
                {t('reacted')}
              </>
            ) : props.type === 'comment' ? (
              <>
                <QuoteIcon />
                {t('commented')}
              </>
            ) : (
              <div className='flex justify-between items-center w-full'>
                <p className='text-base flex items-center gap-2'>
                  <AddFriendIcon /> {t('f_request')}
                </p>
                <div className='flex mt-2 sm-max:flex-col'>
                  <button
                    disabled={rejectLoading || acceptLoading}
                    onClick={() => {
                      acceptFriendMutation({
                        friend_id: props.to_user,
                        sender_id: props.from.id,
                        not_id: props.id,
                      });
                      refetchUserFriends();
                    }}
                    className='text-base sm-max:px-1 bg-blue-700 hover:bg-blue-800 sm-max:rounded-full sm-max:mb-1 rounded-l-full px-2 py-1'
                  >
                    Accept
                  </button>
                  <button
                    disabled={rejectLoading || acceptLoading}
                    onClick={() =>
                      rejectFriendMutation({
                        friend_id: props.from.id,
                        not_id: props.id,
                      })
                    }
                    className='text-base sm-max:px-1 bg-red-700 hover:bg-red-800 sm-max:rounded-full sm-max:mt-1 rounded-r-full px-2 py-1'
                  >
                    Reject
                  </button>
                </div>
              </div>
            )}
          </div>
          <p className='text-valid-form text-xl sm:text-lg sm:hidden'>
            {props.type !== 'friend-request' && props.seen === 0
              ? t('new')
              : ''}
          </p>
          <p className='sm-max:text-tiny-base text-xl capitalize sm:block hidden text-date-of-notification sm:text-lg'>
            {timePassed}
            {curLocale === 'ka' && 'ს'} {t('ago')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
