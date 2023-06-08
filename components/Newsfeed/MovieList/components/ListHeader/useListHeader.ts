import { AppContext } from '@/context';
import { useContext, useState } from 'react';

const useListHeader = () => {
  const [isSearch, setIsSearch] = useState(false);
  const { handleFeedFormStatus } = useContext(AppContext);

  const handleIsSearch = () => {
    setIsSearch(!isSearch);
  };

  return {
    handleIsSearch,
    isSearch,
    handleFeedFormStatus,
  };
};

export default useListHeader;
