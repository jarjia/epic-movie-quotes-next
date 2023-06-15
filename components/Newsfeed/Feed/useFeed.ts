import { AppContext } from '@/context';
import { useContext } from 'react';

const useFeed = () => {
  const { feedFormStatus } = useContext(AppContext);

  return {
    feedFormStatus,
  };
};

export default useFeed;
