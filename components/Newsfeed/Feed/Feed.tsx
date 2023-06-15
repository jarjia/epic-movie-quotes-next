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
  const { feedFormStatus } = useFeed();
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
        <NewsFeedControl />
        <Posts />
      </>
    </FeedLayout>
  );
};

export default Feed;
