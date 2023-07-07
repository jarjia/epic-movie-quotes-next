import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';
import { SetState } from '@/types';

const usePost = (setModalWidth: SetState<number | null>) => {
  const { t } = useTranslation('newsFeed');
  const router = useRouter();
  let locale = router.locale as string;
  const [postHeight, setPostheight] = useState<number | null>(null);
  const postRef = useRef<null | HTMLDivElement>(null);
  const percent = 60;
  const feedRef = useRef<null | HTMLDivElement>(null);

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
    postHeight,
    t,
    feedRef,
    postRef,
  };
};

export default usePost;
