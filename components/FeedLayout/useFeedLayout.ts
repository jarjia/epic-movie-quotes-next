import { AppContext } from '@/context';
import { useContext, useEffect } from 'react';

const useFeedLayout = () => {
  const { feedFormStatus } = useContext(AppContext);

  useEffect(() => {
    if (feedFormStatus !== '') {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [feedFormStatus]);

  return {
    feedFormStatus,
  };
};

export default useFeedLayout;
