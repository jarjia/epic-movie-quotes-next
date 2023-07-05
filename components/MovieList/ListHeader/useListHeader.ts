import { AppContext } from '@/context';
import { useRouter } from 'next/router';
import { KeyboardEvent, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';

const useListHeader = () => {
  const router = useRouter();
  const [isSearch, setIsSearch] = useState(false);
  const { handleFeedFormStatus } = useContext(AppContext);
  const [search, setSearch] = useState(
    router.query.search === undefined ? '' : (router.query.search as string)
  );
  const { t } = useTranslation('movieList');
  let timeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (search.length === 0 && router.query.search !== undefined) {
      router.push(`/movie-list`);
    }
  }, [search, router]);

  useEffect(() => {
    timeout.current = setTimeout(() => {
      if (search.length !== 0) {
        router.push(`/movie-list?search=${search}`);
      }
    }, 1000);

    return () => {
      if (timeout.current !== null) {
        clearTimeout(timeout.current);
      }
    };
  }, [search]);

  const handleOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      router.push(`/movie-list?search=${search}`);
    }
  };

  return {
    setIsSearch,
    isSearch,
    handleFeedFormStatus,
    t,
    handleOnEnter,
    setSearch,
    search,
  };
};

export default useListHeader;
