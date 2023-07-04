import { AppContext } from '@/context';
import { useRouter } from 'next/router';
import { KeyboardEvent, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

const useListHeader = () => {
  const router = useRouter();
  const [isSearch, setIsSearch] = useState(false);
  const { handleFeedFormStatus } = useContext(AppContext);
  const [search, setSearch] = useState(
    router.query.search === undefined ? '' : (router.query.search as string)
  );
  const { t } = useTranslation('movieList');

  useEffect(() => {
    if (search.length === 0 && router.query.search !== undefined) {
      router.push(`/movie-list`);
    }
  }, [search, router]);

  const handleOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      router.push(`/movie-list?search=${search}`);
    }
  };

  return {
    setSearch,
    setIsSearch,
    isSearch,
    handleFeedFormStatus,
    t,
    handleOnEnter,
    search,
  };
};

export default useListHeader;
