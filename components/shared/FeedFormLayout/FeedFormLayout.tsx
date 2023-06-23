import { CloseIcon, PenIcon, TrashBinIcon, UserProfile } from '@/components';
import { FeedFormLayoutTypes } from './types';
import useFeedForm from './useFeedForm';

const FeedFormLayout: React.FC<FeedFormLayoutTypes> = ({
  children,
  title,
  quoteId,
  isEdit,
  isDelete,
  handleRefecthQuotes,
}) => {
  const {
    deleteQuoteMutate,
    userData,
    feedFormStatus,
    router,
    t,
    handleFeedFormStatus,
  } = useFeedForm(handleRefecthQuotes);

  return (
    <div className='relative sm:absolute sm:left-0 sm:top-0 w-full z-[999]'>
      <div
        className={`absolute ${
          router.pathname === '/newsfeed' ? 'w-full' : 'w-4/6'
        } sm:w-full large:max-h-screen  rounded-form-radius bg-form-back`}
      >
        <div
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
        <div
          className={`px-6 py-4 my-4 sm:h-screen h-[410px] ${
            feedFormStatus === 'add-quote' ||
            feedFormStatus === 'add-quote-movie'
              ? 'large:min-h-[500px]'
              : 'large:min-h-[700px]'
          } large:max-h-full overflow-y-scroll scrollbar`}
        >
          <div className='flex items-center gap-4 text-white text-xl'>
            <UserProfile />
            <h4>{userData?.name}</h4>
          </div>
          <div className='mb-0 sm:mb-36'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default FeedFormLayout;
