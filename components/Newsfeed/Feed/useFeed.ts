import { AppContext } from '@/context';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

const useFeed = () => {
  const { feedFormStatus, currentQuoteId, isSearch, handleFeedFormStatus } =
    useContext(AppContext);
  const router = useRouter();
  const [isScrollUpNeeded, setIsScrollUpNeeded] = useState(false);
  const { t } = useTranslation('newsFeed');
  const queryClient = useQueryClient();
  const [search, setSearch] = useState(
    router.query.search === undefined ? '' : (router.query.search as string)
  );

  useEffect(() => {
    setTimeout(() => {
      queryClient.invalidateQueries('quotes');
    }, 500);
  }, [queryClient]);

  useEffect(() => {
    const handleBackScroll = () => {
      if (window.scrollY > window.innerHeight * 2) {
        setIsScrollUpNeeded(true);
      } else if (isScrollUpNeeded) {
        setIsScrollUpNeeded(false);
      }
    };

    window.addEventListener('scroll', handleBackScroll);
    return () => {
      window.removeEventListener('scroll', handleBackScroll);
    };
  }, [isScrollUpNeeded]);

  useEffect(() => {
    let allowedModalsArr = ['view-quote', 'add-quote', ''];
    if (!allowedModalsArr.includes(feedFormStatus as string)) {
      handleFeedFormStatus('');
    }
  }, [feedFormStatus, handleFeedFormStatus]);

  useEffect(() => {
    if (search.length === 0 && router.query.search !== undefined) {
      router.push(`/newsfeed`);
    }
  }, [search, router]);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return {
    t,
    handleChangeSearch,
    feedFormStatus,
    isSearch,
    currentQuoteId,
    isScrollUpNeeded,
    search,
  };
};

export default useFeed;
