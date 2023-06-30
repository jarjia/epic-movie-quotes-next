import { AppContext } from '@/context';
import { useRouter } from 'next/router';
import { KeyboardEvent, useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';

const useListHeader = () => {
  const [isSearch, setIsSearch] = useState(false);
  const { handleFeedFormStatus } = useContext(AppContext);
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { t } = useTranslation('movieList');

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
