import { useNotificationService } from '@/services';
import { NotificationTypes } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';

const useNotification = () => {
  const { t } = useTranslation('common');
  const divRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState<number | undefined>(0);
  const [notifications, setNotifications] = useState<NotificationTypes[]>([]);
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
    if (scrollTop! + 400 === divRef.current?.scrollHeight && hasNextPage) {
      fetchNextPage();
    }
  }, [scrollTop, fetchNextPage, hasNextPage]);

  const handleScroll = () => {
    setScrollTop(divRef.current?.scrollTop);
  };

  useEffect(() => {
    let divElement = divRef.current!;
    divElement.addEventListener('scroll', handleScroll);
    return () => {
      divElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
