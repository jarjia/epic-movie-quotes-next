import {
  AddQuoteModal,
  BackArrowIcon,
  FeedFormLayout,
  FeedLayout,
  MobileSearchbar,
  NewsFeedControl,
  Posts,
  ViewQuoteModal,
} from '@/components';
import useFeed from './useFeed';

const Feed = () => {
  const {
    feedFormStatus,
    currentQuoteId,
    isScrollUpNeeded,
    t,
    handleChangeSearch,
    isSearch,
    search,
  } = useFeed();

  return (
    <FeedLayout>
      <>
        {feedFormStatus === 'add-quote' ? (
          <FeedFormLayout title={`${t('new_post_title')}`}>
            <AddQuoteModal />
          </FeedFormLayout>
        ) : feedFormStatus === 'view-quote' ? (
          <FeedFormLayout title={`${t('view_quote')}`}>
            <ViewQuoteModal quoteId={currentQuoteId} />
          </FeedFormLayout>
        ) : null}
        <div className={`${feedFormStatus !== '' && 'opacity-[0.2]'}`}>
          <NewsFeedControl
            handleChangeSearch={handleChangeSearch}
            search={search}
          />
          <Posts />
        </div>
        {isSearch && (
          <MobileSearchbar
            handleChangeSearch={handleChangeSearch}
            search={search}
          />
        )}
        {isScrollUpNeeded && (
          <div className='fixed sm:hidden mid:hidden top-[85%] left-[90%]'>
            <button
              onClick={() => window.scrollTo(0, 0)}
              className='rotate-90 bg-post-bg rounded-full p-4 px-3.5'
            >
              <BackArrowIcon isSearch={true} />
            </button>
          </div>
        )}
      </>
    </FeedLayout>
  );
};

export default Feed;
