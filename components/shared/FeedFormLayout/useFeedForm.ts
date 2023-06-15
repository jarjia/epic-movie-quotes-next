import { AppContext } from '@/context';
import { useQuoteService } from '@/services';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import { useMutation } from 'react-query';

const useFeedForm = (handleRefecthQuotes?: () => void) => {
  const { deleteQuote } = useQuoteService();
  const { handleFeedFormStatus, userData } = useContext(AppContext);
  const router = useRouter();
  const { t } = useTranslation('movieList');
  const { mutate: deleteQuoteMutate } = useMutation(deleteQuote, {
    onSuccess: () => {
      if (handleRefecthQuotes) {
        handleRefecthQuotes();
      }
      handleFeedFormStatus('');
    },
  });

  return {
    deleteQuoteMutate,
    router,
    handleFeedFormStatus,
    userData,
    t,
  };
};

export default useFeedForm;
