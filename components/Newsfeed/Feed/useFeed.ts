import { AppContext } from '@/context';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

const useFeed = () => {
  const { feedFormStatus, currentQuoteId, handleFeedFormStatus } =
    useContext(AppContext);
  const [isScrollUpNeeded, setIsScrollUpNeeded] = useState(false);
  const { t } = useTranslation('newsFeed');

  const handleBackScroll = useCallback(() => {
    if (window.scrollY > window.innerHeight * 2) {
      setIsScrollUpNeeded(true);
    } else if (isScrollUpNeeded) {
      setIsScrollUpNeeded(false);
    }
  }, [isScrollUpNeeded]);

  useEffect(() => {
    window.addEventListener('scroll', handleBackScroll);
    return () => {
      window.removeEventListener('scroll', handleBackScroll);
    };
  }, [handleBackScroll]);

  useEffect(() => {
    let allowedModalsArr = ['view-quote', 'add-quote', ''];
    if (!allowedModalsArr.includes(feedFormStatus as string)) {
      handleFeedFormStatus('');
    }
  }, [feedFormStatus, handleFeedFormStatus]);

  return {
    t,
    feedFormStatus,
    currentQuoteId,
    isScrollUpNeeded,
  };
};

export default useFeed;
