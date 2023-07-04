import { AppContext } from '@/context';
import { useQuoteService } from '@/services';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useMutation, useQueryClient } from 'react-query';

const useFeedForm = () => {
  const { deleteQuote } = useQuoteService();
  const { handleFeedFormStatus, userData, feedFormStatus } =
    useContext(AppContext);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { t } = useTranslation('movieList');
  const { mutate: deleteQuoteMutate } = useMutation(deleteQuote, {
    onSuccess: () => {
      handleFeedFormStatus('');
      queryClient.invalidateQueries('movies');
    },
  });
  const offTopRef = useRef<null | HTMLDivElement>(null);
  const headerRef = useRef<null | HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<number | null>(null);
  const screenHeight = window.innerWidth < 916 ? 100 : 95;

  const handleChangeRef = () => {
    if (offTopRef.current && headerRef.current) {
      const newSum =
        offTopRef.current.offsetTop + headerRef.current.clientHeight;
      setMaxHeight(newSum);
    }
  };

  useEffect(() => {
    handleChangeRef();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleChangeRef);
    return () => {
      window.addEventListener('resize', handleChangeRef);
    };
  }, []);

  return {
    deleteQuoteMutate,
    maxHeight,
    offTopRef,
    headerRef,
    router,
    handleFeedFormStatus,
    userData,
    t,
    feedFormStatus,
    screenHeight,
  };
};

export default useFeedForm;
