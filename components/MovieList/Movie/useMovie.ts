import { useEffect, useRef, useState } from 'react';

const useMovie = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

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
  };
};

export default useMovie;
