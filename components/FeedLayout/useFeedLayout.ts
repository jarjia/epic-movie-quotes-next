import { AppContext } from '@/context';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

const useFeedLayout = () => {
  const { feedFormStatus } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    if (feedFormStatus !== '') {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [feedFormStatus]);

  return {
    feedFormStatus,
    router,
  };
};

export default useFeedLayout;
