import { CloseIcon, PenIcon, TrashBinIcon, UserProfile } from '@/components';
import { FeedFormLayoutTypes } from './types';
import useFeedForm from './useFeedForm';

const FeedFormLayout: React.FC<FeedFormLayoutTypes> = ({
  children,
  title,
  quoteId,
  isEdit,
  isDelete,
}) => {
  const {
    deleteQuoteMutate,
    userData,
    router,
    t,
    maxHeight,
    offTopRef,
    headerRef,
    handleFeedFormStatus,
    feedFormStatus,
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
        } fixed sm:w-full mid:w-[63%] large:max-h-screen rounded-form-radius bg-post-bg`}
      >
        <div
          ref={headerRef}
          className={`grid grid-cols-[97%_3%] border-b-[1px] border-search-bar-border p-4 py-6`}
        >
          {isEdit ? (
            <div className='flex items-center absolute gap-4 px-5 py-1.5 rounded'>
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
            <div className='absolute'>
              <button
                className='flex text-white items-center gap-2 mt-2'
                onClick={() => {
                  deleteQuoteMutate(quoteId as string);
                }}
              >
                <TrashBinIcon /> {t('delete_quote')}
              </button>
            </div>
          ) : null}
          <div>
            <h2 className='text-white text-2xl text-center capitalize'>
              {title}
            </h2>
          </div>
          <div>
            <button
              onClick={() => handleFeedFormStatus('')}
              className='relative cursor-pointer'
            >
              <CloseIcon color={false} isSmall={false} />
            </button>
          </div>
        </div>
        {maxHeight !== null && (
          <div
            className={`px-6 mb-1 py-4 my-4 h-auto ${
              router.pathname === '/newsfeed' && feedFormStatus === 'add-quote'
                ? 'sm:h-[70vh] sm-h:h-screen'
                : 'sm:h-screen'
            } overflow-y-scroll scrollbar`}
            style={{
              maxHeight: `calc(95vh - ${maxHeight}px)`,
            }}
          >
            <div className='flex items-center gap-4 text-white text-xl'>
              <UserProfile />
              <h4>{userData?.name}</h4>
            </div>
            <div className='pb-1 drop-shadow-none'>{children}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedFormLayout;
