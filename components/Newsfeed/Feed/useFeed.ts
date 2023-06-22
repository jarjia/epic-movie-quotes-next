import { AppContext } from '@/context';
import { useContext, useEffect } from 'react';

const useFeed = () => {
  const { feedFormStatus, currentQuoteId, handleFeedFormStatus } =
    useContext(AppContext);

  useEffect(() => {
    let allowedModalsArr = ['view-quote', 'add-quote'];
    if (!allowedModalsArr.includes(feedFormStatus as string)) {
      handleFeedFormStatus('');
    }
  }, [feedFormStatus, handleFeedFormStatus]);

  return {
    feedFormStatus,
    currentQuoteId,
  };
};

export default useFeed;
