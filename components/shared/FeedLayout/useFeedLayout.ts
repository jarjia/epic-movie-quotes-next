import { AppContext } from '@/context';
import { useAuthService } from '@/services';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import {
  CommentEventTypes,
  LikeEventTypes,
  NotificationEventTypes,
} from './types';
import { PusherChannel } from 'laravel-echo/dist/channel';
import { useInstantiatePusher } from '@/hooks';

const useFeedLayout = () => {
  const { getUserData, getLogoutUser } = useAuthService();
  useInstantiatePusher();
  const {
    feedFormStatus,
    handleUserData,
    handleNewLikes,
    userData,
    handleFeedFormStatus,
    handleNewComment,
  } = useContext(AppContext);
  const [shouldLogout, setShouldLogout] = useState(false);
  const [isBurger, setIsBurger] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isLoading, isError } = useQuery('user', getUserData, {
    onSuccess(data) {
      if (data?.data?.remember_token !== null) {
        localStorage.setItem('remember_me', 'true');
      } else {
        localStorage.removeItem('remember_me');
      }
      handleUserData(data.data);
    },
    onError: () => {
      router.push('/403');
      localStorage.removeItem('remember_me');
    },
  });
  useQuery('log-out', getLogoutUser, {
    onSuccess: () => {
      router.push('/');
      localStorage.removeItem('remember_me');
      queryClient.removeQueries('log-out');
      setShouldLogout(false);
      queryClient.invalidateQueries('user');
    },
    enabled: shouldLogout,
  });

  useEffect(() => {
    if (feedFormStatus !== '') {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [feedFormStatus]);

  const handleNotify = (data: NotificationEventTypes) => {
    if (data.notification.notify) {
      setTimeout(() => {
        queryClient.invalidateQueries('notifications');
        queryClient.invalidateQueries('notifications-count');
      }, 500);
    }
  };

  useEffect(() => {
    let channel: PusherChannel | null = null;

    if (window.Echo) {
      channel = window.Echo.private(
        `notification.${userData.id}`
      ) as PusherChannel;
      channel!.listen('NotificationEvent', handleNotify);
    }

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [userData.id]);

  const handleQuoteLiked = (data: LikeEventTypes) => {
    handleNewLikes(data.message);
  };

  useEffect(() => {
    let channel: PusherChannel | null = null;

    if (window.Echo) {
      channel = window.Echo.channel('liked') as PusherChannel;
      channel!.listen('QuoteLiked', handleQuoteLiked);
    }

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, []);

  const handleCommented = (data: CommentEventTypes) => {
    handleNewComment(data.message.new_comment);
  };

  useEffect(() => {
    let channel: PusherChannel | null = null;

    if (window.Echo) {
      channel = window.Echo.channel('commented') as PusherChannel;
      channel!.listen('QuoteComment', handleCommented);
    }

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, []);

  const handleLogout = () => {
    setShouldLogout(true);
  };

  const handleBurger = () => {
    setIsBurger(!isBurger);
  };

  return {
    feedFormStatus,
    handleLogout,
    handleBurger,
    router,
    isLoading,
    isError,
    handleFeedFormStatus,
    isBurger,
  };
};

export default useFeedLayout;
