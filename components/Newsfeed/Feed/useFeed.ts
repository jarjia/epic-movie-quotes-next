import { AppContext } from '@/context';
import { useContext, useState } from 'react';

const useFeed = () => {
  const [refetchPosts, setRefetchPosts] = useState(false);
  const { feedFormStatus } = useContext(AppContext);

  const handleRefetchPosts = (bool: boolean) => {
    setRefetchPosts(bool);
  };

  return {
    feedFormStatus,
    handleRefetchPosts,
    refetchPosts,
  };
};

export default useFeed;
