import { AppContext } from '@/context';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

const useFeed = () => {
  const router = useRouter();
  const { feedFormStatus } = useContext(AppContext);

  useEffect(() => {
    if (localStorage.getItem('auth') === null) {
      router.push('/403');
    } else {
      sessionStorage.removeItem('form-status');
    }
  }, [router]);

  return {
    feedFormStatus,
  };
};

export default useFeed;
