import { AppContext } from '@/context';
import { KeyboardEvent, useContext } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const useSearchbar = (search: string) => {
  const { isSearch, setIsSearch } = useContext(AppContext);
  const { t } = useTranslation('newsFeed');
  const router = useRouter();

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
    handleOnEnter,
    isSearch,
    t,
    setIsSearch,
    search,
  };
};

export default useSearchbar;
