import { FilledHeartIcon, QuoteIcon } from '@/components';
import { NotificationCard } from './types';
import useNotificationCard from './useNotificationCard';

const NotificationCard: React.FC<NotificationCard> = (props) => {
  const {
    readNotificationMutate,
    timePassed,
    handleCurrentQuoteId,
    t,
    curLocale,
    handleFeedFormStatus,
  } = useNotificationCard(props.created_at);

  return (
    <div
      onClick={() => {
        handleCurrentQuoteId(String(props.quoteId));
        readNotificationMutate(props.id);
        handleFeedFormStatus('view-quote');
        props.handleisNotification();
      }}
      className='flex cursor-pointer p-4 my-3 items-center border-[1px] gap-2 border-placeholder-opacity rounded'
    >
      <div className='flex flex-col justify-center items-center'>
        <div
          className={`w-profile border-2 h-profile relative sm:bottom-4 rounded-full bg-center bg-cover ${
            props.seen === 0 ? 'border-valid-form' : 'border-black'
          }`}
          style={{ backgroundImage: `url(${props.thumbnail})` }}
        ></div>
        <p className='relative bottom-4 sm-max:text-base justify-center text-valid-form w-full text-xl text-center sm:text-lg hidden sm:flex'>
          <span className='absolute'>{props.seen === 0 ? t('new') : ''}</span>
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
          <h4 className='flex sm-max:text-tiny-base sm:text-lg items-center text-xl gap-2 text-date-of-notification'>
            {props.type === 'like' ? (
              <>
                <FilledHeartIcon />
                {t('reacted')}
              </>
            ) : (
              <>
                <QuoteIcon />
                {t('commented')}
              </>
            )}
          </h4>
          <p className='text-valid-form text-xl sm:text-lg sm:hidden'>
            {props.seen === 0 ? t('new') : ''}
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
