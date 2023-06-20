import { AppContext } from '@/context';
import { instantiatePusher } from '@/helpers';
import { useAuthService } from '@/services';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';

const useFeedLayout = () => {
  const { getUserData } = useAuthService();
  const {
    feedFormStatus,
    handleUserData,
    handleNewLikes,
    userData,
    handleNewComment,
  } = useContext(AppContext);
  const router = useRouter();
  const { isLoading, isError } = useQuery('user', getUserData, {
    onSuccess(data) {
      handleUserData(data.data);
    },
    onError: () => {
      router.push('/403');
    },
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (feedFormStatus !== '') {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [feedFormStatus]);

  const handleNotify = (data: any) => {
    if (data.notification.notify) {
      queryClient.invalidateQueries('notifications');
      queryClient.invalidateQueries('notifications-count');
    }
  };

  useEffect(() => {
    const pusherInitialized = instantiatePusher();
    let channel: any = null;

    if (pusherInitialized) {
      channel = window.Echo.private(`notification.${userData.id}`);
      channel.listen('NotificationEvent', handleNotify);
    }

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [userData.id]);

  const handleQuoteLiked = (data: any) => {
    handleNewLikes(data.message.likes);
  };

  useEffect(() => {
    const pusherInitialized = instantiatePusher();
    let channel: any = null;

    if (pusherInitialized) {
      channel = window.Echo.channel('liked');
      channel.listen('QuoteLiked', handleQuoteLiked);
    }

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, []);

  const handleCommented = (data: any) => {
    handleNewComment(data.message.new_comment);
  };

  useEffect(() => {
    const pusherInitialized = instantiatePusher();
    let channel: any = null;

    if (pusherInitialized) {
      channel = window.Echo.channel('commented');
      channel.listen('QuoteComment', handleCommented);
    }

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, []);

  return {
    feedFormStatus,
    router,
    isLoading,
    isError,
  };
};

export default useFeedLayout;
