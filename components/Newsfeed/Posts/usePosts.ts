import { useQuoteService } from '@/services';
import { Posts } from '@/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useInfiniteQuery } from 'react-query';

const usePosts = () => {
  const { getAllQuotes } = useQuoteService();
  const router = useRouter();
  const { t } = useTranslation('newsFeed');
  const [fetchPage, setShouldFetchPage] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  let search = router.query.search === undefined ? '' : router.query.search;
  const { isLoading, fetchNextPage, data, hasNextPage } = useInfiniteQuery(
    ['quotes', search],
    ({ pageParam = 3 }) => getAllQuotes(pageParam, search as string),
    {
      getNextPageParam: (info) => {
        let cur = parseFloat(info.data.current_page);
        return info.data.last_page > cur ? cur + 3 : undefined;
      },
      keepPreviousData: true,
    }
  );

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const clientHeight = window.innerHeight;
    const scrollHeight = document.body.scrollHeight;

    const isAtMiddle = scrollTop >= (scrollHeight - clientHeight) / 2;
    const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;

    setShouldFetchPage(isAtMiddle);
    setAtBottom(isAtBottom);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchmove', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, []);

  const posts: Posts[] = data?.pages[data?.pages.length - 1]?.data?.quotes;

  useEffect(() => {
    if ((fetchPage || atBottom) && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, fetchPage, atBottom, hasNextPage]);

  return {
    posts,
    isLoading,
    t,
  };
};

export default usePosts;
