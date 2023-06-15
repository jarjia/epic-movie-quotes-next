import { useQuoteService } from '@/services';
import { PostsTypes } from '@/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const usePosts = (
  refetchPosts: boolean,
  handleRefetchPosts: (bool: boolean) => void
) => {
  const { getAllQuotes } = useQuoteService();
  const [posts, setPosts] = useState([] as PostsTypes[]);
  const [paginate, setPaginate] = useState(2);
  const router = useRouter();
  let search = router.query.search === undefined ? '' : router.query.search;
  const { refetch, isLoading } = useQuery(
    ['quotes', search],
    () => getAllQuotes(paginate, search as string),
    {
      onSuccess: (res) => {
        setPosts(res.data);
      },
      enabled: posts.length === 0 || refetchPosts ? true : false,
    }
  );

  useEffect(() => {
    if (refetchPosts) {
      refetch();
      handleRefetchPosts(false);
    }
  }, [refetchPosts, refetch, router.query.search, handleRefetchPosts]);

  useEffect(() => {
    refetch();
  }, [paginate, refetch]);

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

  console.log(posts);

  return {
    posts,
    isLoading,
  };
};

export default usePosts;
