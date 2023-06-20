import { useQuoteService } from '@/services';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

const usePosts = () => {
  const { getAllQuotes } = useQuoteService();
  const [paginate, setPaginate] = useState(2);
  const router = useRouter();
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  let search = router.query.search === undefined ? '' : router.query.search;
  const { isLoading, fetchNextPage, hasNextPage, data } = useInfiniteQuery(
    ['quotes', paginate, search],
    ({ pageParam = paginate }) => getAllQuotes(pageParam, search as string),
    {
      getNextPageParam: (info) => {
        return info.data.last_page > parseFloat(info.data.current_page)
          ? ++info.data.current_page
          : undefined;
      },
      keepPreviousData: true,
    }
  );

  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;

    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
    setIsScrolledToBottom(isAtBottom);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const posts = data?.pages[0]?.data?.quotes;

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
  };
};

export default usePosts;
