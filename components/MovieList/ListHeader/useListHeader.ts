import { AppContext } from '@/context';
import { useRouter } from 'next/router';
import { ChangeEvent, KeyboardEvent, useContext, useState } from 'react';

const useListHeader = () => {
  const [isSearch, setIsSearch] = useState(false);
  const { handleFeedFormStatus } = useContext(AppContext);
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      router.push(`/movie-list?search=${search}`);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleIsSearch = () => {
    setIsSearch(!isSearch);
  };

  return {
    handleIsSearch,
    isSearch,
    handleFeedFormStatus,
    handleOnEnter,
    handleOnChange,
    search,
  };
};

export default useListHeader;
