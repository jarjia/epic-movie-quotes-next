import { AppContext } from '@/context';
import { useAuthService } from '@/services';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import {
  CommentEventTypes,
  LikeEventTypes,
  NotificationEventTypes,
} from './types';
import { PusherChannel } from 'laravel-echo/dist/channel';
import { useInstantiatePusher } from '@/helpers';

const useFeedLayout = () => {
  const { getUserData } = useAuthService();
  useInstantiatePusher();
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

  return {
    feedFormStatus,
    router,
    isLoading,
    isError,
  };
};

export default useFeedLayout;
