import { useQuoteService } from '@/services';
import { PostsTypes } from '@/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

const usePosts = (
  refetchPosts: boolean,
  handleRefetchPosts: (bool: boolean) => void
) => {
  const { getAllQuotes } = useQuoteService();
  const [posts, setPosts] = useState([] as PostsTypes[]);
  const [paginate, setPaginate] = useState(2);
  const router = useRouter();
  let search = router.query.search === undefined ? '' : router.query.search;
  const { refetch, isLoading, fetchNextPage } = useInfiniteQuery(
    ['quotes', paginate, search],
    ({ pageParam = paginate }) => getAllQuotes(pageParam, search as string),
    {
      onSuccess: (res) => {
        const { data } = res.pages[0];

        setPosts(data);
        handleRefetchPosts(false);
      },
      keepPreviousData: true,
      enabled: posts.length === 0 || refetchPosts ? true : false,
    }
  );

  useEffect(() => {
    if (refetchPosts) {
      setTimeout(() => {
        refetch();
      }, 500);
    }
  }, [refetch, refetchPosts]);

  useEffect(() => {
    fetchNextPage();
  }, [paginate, fetchNextPage]);

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
          if (postsLimit < posts.length - 1) {
            return posts.length;
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
  }, [posts.length]);

  return {
    posts,
    isLoading,
  };
};

export default usePosts;
