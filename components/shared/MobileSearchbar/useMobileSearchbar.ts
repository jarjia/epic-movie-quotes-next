import { AppContext } from '@/context';
import { KeyboardEvent, useContext } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const useMobileSearchbar = (search: string) => {
  const { handleIsSearch } = useContext(AppContext);
  const { t } = useTranslation('common');
  const router = useRouter();

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
    t,
  };
};

export default useMobileSearchbar;
