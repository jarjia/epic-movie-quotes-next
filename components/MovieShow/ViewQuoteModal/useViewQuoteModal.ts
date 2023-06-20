import { useQuoteService } from '@/services';
import { PostTypes } from '@/types';
import { useState } from 'react';
import { useQuery } from 'react-query';

const useViewQuoteModal = (quoteId: string | null) => {
  const { getQuote } = useQuoteService();
  const [quote, setQuote] = useState<PostTypes>({} as PostTypes);
  const { isLoading, isSuccess } = useQuery(
    ['quote', quoteId],
    () => getQuote(quoteId),
    {
      onSuccess(data) {
        setQuote(data.data);
      },
      enabled: quoteId !== null || quoteId !== undefined || quoteId === 'null',
    }
  );

  return {
    isLoading,
    quote,
    isSuccess,
  };
};

export default useViewQuoteModal;
