import { CloseIcon, PenIcon, TrashBinIcon, UserProfile } from '@/components';
import { FeedFormLayout } from './types';
import useFeedForm from './useFeedForm';

const FeedFormLayout: React.FC<FeedFormLayout> = ({
  children,
  title,
  quoteId,
  isEdit,
  isDelete,
}) => {
  const {
    deleteQuoteMutate,
    userData,
    screenHeight,
    router,
    t,
    maxHeight,
    offTopRef,
    headerRef,
    handleFeedFormStatus,
  } = useFeedForm();

  return (
    <div
      className={`${
        router.pathname === '/newsfeed' ? 'flex justify-center' : ''
      } relative sm:fixed sm:left-0 sm:top-0 w-full z-[999]`}
    >
      <div
        ref={offTopRef}
        className={`${
          router.pathname === '/newsfeed' ? `w-1/2 huge:w-2/6` : 'w-1/2'
        } fixed sm:w-full mid:w-[63%] large:max-h-screen rounded-form-radius sm:rounded-none bg-post-bg`}
      >
        <div
          ref={headerRef}
          className={`grid grid-cols-[3%_94%_3%] items-center border-b-[1px] border-search-bar-border p-4 py-6`}
        >
          <div className='sm:ml-3'>
            {isEdit ? (
              <div className='flex sm-tiny:flex-col-reverse items-center gap-4 px-0 py-1.5 rounded'>
                <button
                  onClick={() => {
                    handleFeedFormStatus('edit-quote');
                  }}
                >
                  <PenIcon />
                </button>
                <span className='text-placeholder'>|</span>
                <button
                  onClick={() => {
                    deleteQuoteMutate(quoteId as string);
                  }}
                >
                  <TrashBinIcon />
                </button>
              </div>
            ) : isDelete ? (
              <div>
                <button
                  className='flex text-white items-center gap-2 mt-2'
                  onClick={() => {
                    deleteQuoteMutate(quoteId as string);
                  }}
                >
                  <TrashBinIcon />{' '}
                  <span className='tiny:hidden block'>{t('delete_quote')}</span>
                </button>
              </div>
            ) : null}
          </div>
          <div>
            <h2 className='text-white text-2xl text-center capitalize'>
              {title}
            </h2>
          </div>
          <div>
            <button
              onClick={() => handleFeedFormStatus('')}
              className='relative cursor-pointer sm:right-2'
            >
              <CloseIcon color={false} isSmall={false} />
            </button>
          </div>
        </div>
        {maxHeight !== null && (
          <div
            className='px-6 mb-1 py-4 mb-4 h-auto sm:h-screen overflow-y-scroll scrollbar'
            style={{
              maxHeight: `calc(${screenHeight}vh - ${maxHeight}px)`,
            }}
          >
            <div className='flex items-center gap-4 text-white text-xl'>
              <UserProfile />
              <h4>{userData?.name}</h4>
            </div>
            <div className='pb-1 drop-shadow-none sm:mb-20'>{children}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedFormLayout;
