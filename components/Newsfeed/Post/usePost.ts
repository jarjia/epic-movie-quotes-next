import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';
import { SetState } from '@/types';
import { ka, enUS } from 'date-fns/locale';
import { formatDistanceToNow } from 'date-fns';

const usePost = (
  setModalWidth: SetState<number | null>,
  created_at: string
) => {
  const { t } = useTranslation('newsFeed');
  const { t: ago } = useTranslation('common');
  const router = useRouter();
  let locale = router.locale as string;
  const [postHeight, setPostheight] = useState<number | null>(null);
  const postRef = useRef<null | HTMLDivElement>(null);
  const percent = 60;
  const feedRef = useRef<null | HTMLDivElement>(null);
  const date = new Date(created_at);
  let dateLocale = router.locale === 'en' ? enUS : ka;
  let initialTimeAgo = formatDistanceToNow(date, { locale: dateLocale });
  if (router.locale === 'ka') {
    initialTimeAgo = initialTimeAgo.replace('თვე', 'თვი');
    initialTimeAgo = initialTimeAgo.replace('დღე', 'დღი');
    initialTimeAgo = initialTimeAgo.replace('წელი', 'წლი');
  }
  const [timePassed, setTimePassed] = useState(initialTimeAgo);

  useEffect(() => {
    let timeAgo = formatDistanceToNow(date, { locale: dateLocale });
    if (router.locale === 'ka') {
      timeAgo = timeAgo.replace('თვე', 'თვი');
      timeAgo = timeAgo.replace('დღე', 'დღი');
      timeAgo = timeAgo.replace('წელი', 'წლი');
    }
    setTimePassed(timeAgo);
  }, [date, locale, router.locale, dateLocale]);

  useEffect(() => {
    const handlePostWidth = () => {
      if (postRef.current) {
        let height = (percent / 100) * postRef.current.offsetWidth;
        setPostheight(Math.floor(height));
      }
      if (feedRef.current) {
        setModalWidth(feedRef.current.offsetWidth);
      }
    };

    handlePostWidth();
    window.addEventListener('resize', handlePostWidth);
    return () => {
      window.addEventListener('resize', handlePostWidth);
    };
  }, [setModalWidth]);

  return {
    locale,
    timePassed,
    postHeight,
    t,
    feedRef,
    ago,
    postRef,
  };
};

export default usePost;
