import { useQuoteService } from '@/services';
import { Post } from '@/types';
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

  const quote: Post = data?.data;

  return {
    isLoading,
    quote,
    isSuccess,
  };
};

export default useViewQuoteModal;
