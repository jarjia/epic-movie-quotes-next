import { AppContext } from '@/context';
import { useAuthService } from '@/services';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { CommentEvent, LikeEvent, NotificationEvent } from './types';
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

  useEffect(() => {
    let channel: PusherChannel | null = null;

    if (window.Echo) {
      channel = window.Echo.private(
        `notification.${userData.id}`
      ) as PusherChannel;
      channel!.listen('NotificationEvent', (data: NotificationEvent) => {
        if (data.notification.notify) {
          setTimeout(() => {
            queryClient.invalidateQueries('notifications');
            queryClient.invalidateQueries('notifications-count');
          }, 500);
        }
      });
    }

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [userData.id, queryClient]);

  useEffect(() => {
    let channel: PusherChannel | null = null;

    if (window.Echo) {
      channel = window.Echo.channel('liked') as PusherChannel;
      channel!.listen('QuoteLiked', (data: LikeEvent) =>
        handleNewLikes(data.message)
      );
    }

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    let channel: PusherChannel | null = null;

    if (window.Echo) {
      channel = window.Echo.channel('commented') as PusherChannel;
      channel!.listen('QuoteComment', (data: CommentEvent) =>
        handleNewComment(data.message.new_comment)
      );
    }

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, []);

  return {
    feedFormStatus,
    setShouldLogout,
    setIsBurger,
    router,
    isLoading,
    isError,
    handleFeedFormStatus,
    isBurger,
  };
};

export default useFeedLayout;
