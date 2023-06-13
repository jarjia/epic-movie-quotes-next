import { useState } from 'react';
import { useTranslation } from 'next-i18next';

const useQuoteCard = () => {
  const [isBox, setIsBox] = useState(false);
  const { t } = useTranslation('movieList');

  const handleSetIsBox = () => {
    setIsBox(!isBox);
  };

  return {
    isBox,
    handleSetIsBox,
    t,
  };
};

export default useQuoteCard;
