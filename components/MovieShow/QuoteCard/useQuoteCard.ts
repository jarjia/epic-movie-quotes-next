import { useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { AppContext } from '@/context';
import { useQuoteService } from '@/services';
import { useMutation } from 'react-query';
import { errorToast } from '@/helpers';

const useQuoteCard = (handleRefecthQuotes: () => void) => {
  const { deleteQuote } = useQuoteService();
  const [isBox, setIsBox] = useState(false);
  const { t } = useTranslation('movieList');
  const { t: apiErr } = useTranslation('apiErrors');
  const { handleFeedFormStatus, handleCurrentQuoteId } = useContext(AppContext);
  const router = useRouter();
  let locale = router.locale as string;
  const { mutate: deleteQuoteMutate } = useMutation(deleteQuote, {
    onSuccess: () => {
      handleRefecthQuotes();
      handleFeedFormStatus('');
    },
    onError(err: any) {
      errorToast(apiErr, apiErr('delete_quote_failed'), err);
    },
  });

  const handleSetIsBox = () => {
    setIsBox(!isBox);
  };

  return {
    isBox,
    handleSetIsBox,
    t,
    locale,
    handleFeedFormStatus,
    deleteQuoteMutate,
    handleCurrentQuoteId,
  };
};

export default useQuoteCard;
