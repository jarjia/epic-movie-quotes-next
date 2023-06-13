import { AppContext } from '@/context';
import { useContext } from 'react';
import { useTranslation } from 'next-i18next';

const useMovieQuotes = () => {
  const { t } = useTranslation('movieList');
  const { handleFeedFormStatus } = useContext(AppContext);

  return {
    t,
    handleFeedFormStatus,
  };
};

export default useMovieQuotes;
