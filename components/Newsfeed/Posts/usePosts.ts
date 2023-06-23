import { useQuoteService } from '@/services';
import { PostsTypes } from '@/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useInfiniteQuery } from 'react-query';

const usePosts = () => {
  const { getAllQuotes } = useQuoteService();
  const [paginate, setPaginate] = useState(2);
  const router = useRouter();
  const { t } = useTranslation('newsFeed');
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  let search = router.query.search === undefined ? '' : router.query.search;
  const { isLoading, fetchNextPage, hasNextPage, data } = useInfiniteQuery(
    ['quotes', paginate, search],
    ({ pageParam = paginate }) => getAllQuotes(pageParam, search as string),
    {
      getNextPageParam: (info) => {
        let cur_page = parseFloat(info.data.current_page);
        return info.data.last_page > cur_page ? ++cur_page : undefined;
      },
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement || document.body;

      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setIsScrolledToBottom(true);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const posts: PostsTypes[] = data?.pages[0]?.data?.quotes;

  useEffect(() => {
    if (isScrolledToBottom) {
      setPaginate((prev) => prev + 2);
    }
  }, [isScrolledToBottom]);

  useEffect(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [paginate, fetchNextPage, hasNextPage]);

  return {
    posts,
    isLoading,
    t,
  };
};

export default usePosts;
