import { useRouter } from 'next/router';
import { NewsFeedControl, Posts } from './components';
import { useEffect } from 'react';
import { FeedLayout } from '@/components';

const Feed = () => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('auth') === null) {
      router.push('/403');
    } else {
      sessionStorage.removeItem('form-status');
    }
  }, [router]);

  return (
    <FeedLayout>
      <>
        <NewsFeedControl />
        <Posts />
      </>
    </FeedLayout>
  );
};

export default Feed;
