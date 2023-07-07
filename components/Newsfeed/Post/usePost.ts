import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';

const usePost = () => {
  const { t } = useTranslation('newsFeed');
  const router = useRouter();
  let locale = router.locale as string;
  const [postHeight, setPostheight] = useState<number | null>(null);
  const postRef = useRef<null | HTMLDivElement>(null);
  const percent = 60;

  useEffect(() => {
    const handlePostWidth = () => {
      if (postRef.current) {
        let height = (percent / 100) * postRef.current.offsetWidth;
        setPostheight(Math.floor(height));
      }
    };

    if (postRef.current) {
      let height = (percent / 100) * postRef.current.offsetWidth;
      setPostheight(Math.floor(height));
    }
    window.addEventListener('resize', handlePostWidth);
    return () => {
      window.addEventListener('resize', handlePostWidth);
    };
  }, []);

  return {
    locale,
    postHeight,
    t,
    postRef,
  };
};

export default usePost;
