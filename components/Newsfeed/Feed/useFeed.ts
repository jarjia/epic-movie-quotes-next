import { AppContext } from '@/context';
import { useContext } from 'react';

const useFeed = () => {
  const { feedFormStatus, currentQuoteId } = useContext(AppContext);

  return {
    feedFormStatus,
    currentQuoteId,
  };
};

export default useFeed;
