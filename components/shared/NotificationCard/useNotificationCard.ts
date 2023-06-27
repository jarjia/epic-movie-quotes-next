import { AppContext } from '@/context';
import { useNotificationService } from '@/services';
import { formatDistanceToNow } from 'date-fns';
import { ka, enUS } from 'date-fns/locale';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';

const useNotificationCard = (ago: string) => {
  const { t } = useTranslation('common');
  const { readNotification } = useNotificationService();
  const date = useMemo(() => new Date(ago), [ago]);
  const router = useRouter();
  let locale = router.locale === 'en' ? enUS : ka;
  const { handleFeedFormStatus, handleCurrentQuoteId } = useContext(AppContext);
  const queryClient = useQueryClient();
  const [timePassed, setTimePassed] = useState(
    formatDistanceToNow(date, { locale })
  );
  const { mutate: readNotificationMutate } = useMutation(readNotification, {
    onSuccess() {
      queryClient.invalidateQueries('notifications-count');
      queryClient.invalidateQueries('notifications');
    },
  });
  console.log(formatDistanceToNow(date, { locale }));

  useEffect(() => {
    const interval = setInterval(() => {
      let timeAgo = formatDistanceToNow(date, { locale });
      if (router.locale === 'ka') {
        timeAgo = timeAgo.replace('თვე', 'თვი');
        timeAgo = timeAgo.replace('დღე', 'დღი');
        timeAgo = timeAgo.replace('წელი', 'წლი');
      }
      setTimePassed(timeAgo);
    }, 1000);

    return () => clearInterval(interval);
  }, [date, locale, router.locale]);

  return {
    readNotification,
    timePassed,
    readNotificationMutate,
    handleFeedFormStatus,
    t,
    curLocale: router.locale,
    handleCurrentQuoteId,
  };
};

export default useNotificationCard;
