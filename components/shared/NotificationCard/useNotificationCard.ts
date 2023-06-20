import { AppContext } from '@/context';
import { useNotificationService } from '@/services';
import { formatDistanceToNow } from 'date-fns';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';

const useNotificationCard = (ago: string) => {
  const { t } = useTranslation('common');
  const { readNotification } = useNotificationService();
  const date = useMemo(() => new Date(ago), [ago]);
  const { handleFeedFormStatus, handleCurrentQuoteId } = useContext(AppContext);
  const queryClient = useQueryClient();
  const [timePassed, setTimePassed] = useState(formatDistanceToNow(date));
  const { mutate: readNotificationMutate } = useMutation(readNotification, {
    onSuccess() {
      queryClient.invalidateQueries('notifications-count');
      queryClient.invalidateQueries('notifications');
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimePassed(formatDistanceToNow(date));
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return {
    readNotification,
    timePassed,
    readNotificationMutate,
    handleFeedFormStatus,
    t,
    handleCurrentQuoteId,
  };
};

export default useNotificationCard;
