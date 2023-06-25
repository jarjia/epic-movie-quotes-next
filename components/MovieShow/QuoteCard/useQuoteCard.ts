import { useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { AppContext } from '@/context';
import { useQuoteService } from '@/services';
import { useMutation } from 'react-query';
import { errorToast } from '@/helpers';

const useQuoteCard = (handleRefecthQuotes: () => void, id: number) => {
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
  const { newLikes, commentsArr } = useContext(AppContext);
  let newLikesForQuote = newLikes?.find((item) => item.quoteId === id);
  let newCommentsForQuote = commentsArr?.find((item) => item.quote_id === id);

  return {
    isBox,
    setIsBox,
    t,
    locale,
    handleFeedFormStatus,
    deleteQuoteMutate,
    handleCurrentQuoteId,
    newCommentsForQuote,
    newLikesForQuote,
  };
};

export default useQuoteCard;
