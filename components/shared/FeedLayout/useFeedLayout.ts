import { AppContext } from '@/context';
import { useAuthService } from '@/services';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';

const useFeedLayout = () => {
  const { getUserData } = useAuthService();
  const { feedFormStatus, handleUserData } = useContext(AppContext);
  const router = useRouter();
  const { isLoading, isError } = useQuery('user', getUserData, {
    onSuccess(data) {
      handleUserData(data.data);
    },
    onError: () => {
      router.push('/403');
    },
  });

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
    isLoading,
    isError,
  };
};

export default useFeedLayout;
