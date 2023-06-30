import { AppContext } from '@/context';
import { KeyboardEvent, useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const useMobileSearchbar = () => {
  const { handleIsSearch } = useContext(AppContext);
  const { t } = useTranslation('common');
  const router = useRouter();
  const [search, setSearch] = useState<string>(router.query.search as string);

  const handleOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      let searchValue = encodeURIComponent(search);
      router.push(`/newsfeed?search=${searchValue}`);

      const onComplete = () => {
        router.events.off('routeChangeComplete', onComplete);
      };
      handleIsSearch();
      router.events.on('routeChangeComplete', onComplete);
    }
  };

  return {
    handleOnEnter,
    handleIsSearch,
    search,
    setSearch,
    t,
  };
};

export default useMobileSearchbar;
