import { useQuoteService } from '@/services';
import { PostTypes } from '@/types';
import { useQuery } from 'react-query';

const useViewQuoteModal = (quoteId: string | null) => {
  const { getQuote } = useQuoteService();
  const { isLoading, data, isSuccess } = useQuery(
    ['quotes', quoteId],
    () => getQuote(quoteId),
    {
      enabled: quoteId !== null || quoteId !== undefined || quoteId === 'null',
    }
  );

  const quote: PostTypes = data?.data;

  return {
    isLoading,
    quote,
    isSuccess,
  };
};

export default useViewQuoteModal;
