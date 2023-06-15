import { useQuoteService } from '@/services';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

const usePosts = () => {
  const { getAllQuotes } = useQuoteService();
  const [paginate, setPaginate] = useState(2);
  const router = useRouter();
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
  const posts = data?.pages[0]?.data?.quotes;

  useEffect(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [paginate, fetchNextPage, hasNextPage]);

  useEffect(() => {
    let timeoutRef: NodeJS.Timeout | null = null;
    const handleScroll = () => {
      if (timeoutRef) {
        clearTimeout(timeoutRef);
      }

      timeoutRef = setTimeout(() => {
        const position = window.pageYOffset - window.innerHeight;
        let postsLimit = Math.floor(position / window.innerHeight) + 1;

        setPaginate(() => {
          if (postsLimit < posts?.length - 1) {
            return posts?.length;
          } else {
            return Math.floor(position / window.innerHeight) === -1
              ? 2
              : 2 + postsLimit;
          }
        });

        timeoutRef = null;
      }, 300);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef) {
        clearTimeout(timeoutRef);
      }
    };
  }, [posts?.length]);

  return {
    posts,
    isLoading,
  };
};

export default usePosts;
