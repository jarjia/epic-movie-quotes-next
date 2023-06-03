import { NewsFeedControl, Posts } from './components';
import { AddQuoteModal, FeedFormLayout, FeedLayout } from '@/components';
import useFeed from './useFeed';

const Feed = () => {
  const { feedFormStatus } = useFeed();

  return (
    <FeedLayout>
      <>
        {feedFormStatus === 'add-quote' ? (
          <FeedFormLayout title='write new quote'>
            <AddQuoteModal />
          </FeedFormLayout>
        ) : null}
        <div className={`${feedFormStatus !== '' && 'opacity-[0.2]'}`}></div>
        <NewsFeedControl />
        <Posts />
      </>
    </FeedLayout>
  );
};

export default Feed;
