import { useRouter } from 'next/router';
import { FeedLayout } from '../FeedLayout';
import { NewsFeedControl, Posts } from './components';
import { useEffect } from 'react';

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
