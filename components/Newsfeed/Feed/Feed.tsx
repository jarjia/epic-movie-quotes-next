import {
  AddQuoteModal,
  FeedFormLayout,
  FeedLayout,
  NewsFeedControl,
  Posts,
  ViewQuoteModal,
} from '@/components';
import useFeed from './useFeed';
import { useTranslation } from 'next-i18next';

const Feed = () => {
  const { feedFormStatus, currentQuoteId } = useFeed();
  const { t } = useTranslation('newsFeed');

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
        <div className={`${feedFormStatus !== '' && 'opacity-[0.2]'}`}></div>
        <NewsFeedControl />
        <Posts />
      </>
    </FeedLayout>
  );
};

export default Feed;
