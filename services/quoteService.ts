import axios from './axios';
import { useRouter } from 'next/router';
import { PostQuoteTypes, UpdateQuotesTypes } from '@/types';

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

  const getQuotes = (movieId: number) => {
    return axios.get('/api/movie/quotes', {
      params: { movieId },
    });
  };

  const getQuote = (quoteId: string | null) => {
    return axios.get('/api/movie/quote', {
      params: { quoteId },
    });
  };

  const deleteQuote = (quoteId: string | null) => {
    return axios.delete(`/api/quote/delete/${quoteId}`);
  };

  const updateQuote = (
    data: UpdateQuotesTypes & { quoteId: string | null }
  ) => {
    return axios.post(`/api/quote/update/${data.quoteId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const getAllQuotes = (paginate: number, search: string) => {
    console.log(paginate, search);

    return axios.get('/api/quotes/all', {
      params: { paginate, search },
    });
  };

  return {
    postQuote,
    getQuotes,
    getQuote,
    deleteQuote,
    updateQuote,
    getAllQuotes,
  };
};

export default useQuoteService;
