import axios from './axios';
import { useRouter } from 'next/router';
import { PostQuoteTypes } from '@/types';

const useQuoteService = () => {
  const router = useRouter();
  let locale = router.locale;

  const postQuote = (data: PostQuoteTypes) => {
    return axios.post('/api/quote/create', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: { locale },
    });
  };

  return {
    postQuote,
  };
};

export default useQuoteService;
