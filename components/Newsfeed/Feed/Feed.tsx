import {
  AddQuoteModal,
  FeedFormLayout,
  FeedLayout,
  NewsFeedControl,
  Posts,
} from '@/components';
import useFeed from './useFeed';
import { useTranslation } from 'next-i18next';

const Feed = () => {
  const { feedFormStatus, refetchPosts, handleRefetchPosts } = useFeed();
  const { t } = useTranslation('newsFeed');

  return (
    <FeedLayout>
      <>
        {feedFormStatus === 'add-quote' ? (
          <FeedFormLayout title={`${t('new_post_title')}`}>
            <AddQuoteModal />
          </FeedFormLayout>
        ) : null}
        <div className={`${feedFormStatus !== '' && 'opacity-[0.2]'}`}></div>
        <NewsFeedControl handleRefetchPosts={handleRefetchPosts} />
        <Posts
          handleRefetchPosts={handleRefetchPosts}
          refetchPosts={refetchPosts}
        />
      </>
    </FeedLayout>
  );
};

export default Feed;
