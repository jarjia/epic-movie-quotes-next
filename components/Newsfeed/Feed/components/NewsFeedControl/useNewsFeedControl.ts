import { useState } from 'react';

const useNewsFeedControl = () => {
  const [isSearch, setIsSearch] = useState(false);

  const handleIsSearch = () => {
    setIsSearch(!isSearch);
  };

  return {
    handleIsSearch,
    isSearch,
  };
};

export default useNewsFeedControl;
