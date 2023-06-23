import { useNotificationService } from '@/services';
import { NotificationTypes } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';

const useNotification = () => {
  const { t } = useTranslation('common');
  const divRef = useRef<HTMLDivElement | null>(null);
  const [notifications, setNotifications] = useState<NotificationTypes[]>([]);
  const [isBottom, setIsBottom] = useState(false);
  const { getNotifications, readAllNotifications } = useNotificationService();
  const { data, fetchNextPage, isLoading, hasNextPage } = useInfiniteQuery(
    'notifications',
    ({ pageParam = 4 }) => getNotifications(pageParam),
    {
      getNextPageParam: (params) => {
        return params.data.last_page > parseFloat(params.data.cur_page)
          ? parseFloat(params.data.cur_page) + 4
          : undefined;
      },
      keepPreviousData: true,
    }
  );

  const queryClient = useQueryClient();

  useEffect(() => {
    setNotifications(data?.pages[data.pages.length - 1].data.notifications);
  }, [data?.pages]);

  const { mutate: markAllAsReadMutation } = useMutation(readAllNotifications);

  useEffect(() => {
    const handleScroll = () => {
      const div = divRef.current;

      if (div) {
        const { scrollTop, scrollHeight, clientHeight } = div;

        if (scrollTop + clientHeight >= scrollHeight - 10) {
          setIsBottom(true);
        }
      }
    };
    const div = divRef.current;
    if (div) {
      div.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (div) {
        div.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (isBottom && hasNextPage) {
      fetchNextPage();
    }
  }, [isBottom, fetchNextPage, hasNextPage]);

  return {
    divRef,
    queryClient,
    t,
    notifications,
    setNotifications,
    markAllAsReadMutation,
    isLoading,
  };
};

export default useNotification;
