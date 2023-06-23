import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const useMovie = () => {
  const containerRef = useRef<HTMLImageElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const router = useRouter();
  let locale = router.locale as string;

  useEffect(() => {
    const handleWidth = () => {
      const width = containerRef.current?.offsetWidth || 0;
      setContainerWidth(width - width / 8);
    };

    handleWidth();
    window.addEventListener('resize', handleWidth);

    return () => {
      window.removeEventListener('resize', handleWidth);
    };
  }, []);

  return {
    containerRef,
    containerWidth,
    locale,
    router,
  };
};

export default useMovie;
