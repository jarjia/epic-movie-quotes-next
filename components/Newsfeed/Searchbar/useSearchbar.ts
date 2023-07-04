import { AppContext } from '@/context';
import { KeyboardEvent, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const useSearchbar = () => {
  const { isSearch, handleIsSearch } = useContext(AppContext);
  const { t } = useTranslation('newsFeed');
  const router = useRouter();
  const [search, setSearch] = useState(
    router.query.search === undefined ? '' : (router.query.search as string)
  );

  useEffect(() => {
    if (search.length === 0 && router.query.search !== undefined) {
      router.push(`/newsfeed`);
    }
  }, [search, router]);

  const handleOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      let searchValue = encodeURIComponent(search);
      router.push(`/newsfeed?search=${searchValue}`);

      const onComplete = () => {
        router.events.off('routeChangeComplete', onComplete);
      };

      router.events.on('routeChangeComplete', onComplete);
    }
  };

  return {
    setSearch,
    handleOnEnter,
    isSearch,
    t,
    handleIsSearch,
    search,
  };
};

export default useSearchbar;
