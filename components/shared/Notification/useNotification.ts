import { useNotificationService } from '@/services';
import { NotificationTypes } from '@/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

const useNotification = () => {
  const { t } = useTranslation('common');
  const divRef = useRef<HTMLDivElement | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [scrollTop, setScrollTop] = useState<number | undefined>(0);
  const [notifications, setNotifications] = useState<NotificationTypes[]>([]);
  const { getNotifications, readAllNotifications } = useNotificationService();
  const { data, fetchNextPage, refetch, isLoading, hasNextPage } =
    useInfiniteQuery(
      ['notifications', filter],
      ({ pageParam = 8 }) => getNotifications(pageParam, filter as string),
      {
        getNextPageParam: (params) => {
          return params.data.last_page > parseFloat(params.data.cur_page)
            ? parseFloat(params.data.cur_page) + 8
            : undefined;
        },
        keepPreviousData: true,
      }
    );
  let scrollTime = useRef<ReturnType<typeof setTimeout>>();
  const router = useRouter();

  const queryClient = useQueryClient();

  useEffect(() => {
    setNotifications(data?.pages[data.pages.length - 1].data.notifications);
  }, [data?.pages]);

  const { mutate: markAllAsReadMutation } = useMutation(readAllNotifications, {
    onSuccess() {
      queryClient.invalidateQueries('notifications');
    },
  });

  useEffect(() => {
    if (
      divRef.current &&
      scrollTop! + divRef.current?.clientHeight >
        divRef.current?.scrollHeight / 1.5 &&
      hasNextPage &&
      scrollTop! > 0
    ) {
      fetchNextPage();
    }
  }, [scrollTop, fetchNextPage, filter, hasNextPage]);

  const handleScroll = useCallback(() => {
    clearTimeout(scrollTime.current);
    scrollTime.current = setTimeout(() => {
      setScrollTop(divRef.current?.scrollTop);
    }, 200);
  }, []);

  useEffect(() => {
    let divElement = divRef.current!;
    divElement.addEventListener('touchmove', handleScroll);
    divElement.addEventListener('scroll', handleScroll);
    return () => {
      divElement.addEventListener('touchmove', handleScroll);
      divElement.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (filter !== null && filter !== '') {
      refetch();
    }
  }, [refetch, filter]);

  return {
    router,
    divRef,
    queryClient,
    t,
    filter,
    notifications,
    setNotifications,
    markAllAsReadMutation,
    setFilter,
    isLoading,
  };
};

export default useNotification;
