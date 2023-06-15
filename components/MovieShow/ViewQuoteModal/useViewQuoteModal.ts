import { AppContext } from '@/context';
import { useNotificationService, useQuoteService } from '@/services';
import { QuotesTypes } from '@/types';
import { useContext, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useMutation, useQuery } from 'react-query';

const useViewQuoteModal = (quoteId: string | null) => {
  const { getQuote } = useQuoteService();
  const [quote, setQuote] = useState<QuotesTypes>({} as QuotesTypes);
  const { isLoading, isSuccess } = useQuery('quote', () => getQuote(quoteId), {
    onSuccess(data) {
      setQuote(data.data);
    },
    enabled: quoteId !== null || quoteId !== undefined || quoteId === 'null',
  });
  const { t } = useTranslation('movieList');
  let likesIds: number[] = [];

  if (isSuccess && quote.likes) {
    likesIds = quote.likes.map((item) => item.user.id);
  }

  const { postComment, postLike } = useNotificationService();
  const searchRef = useRef<HTMLInputElement>(null);
  const { userData } = useContext(AppContext);
  const [openComments, setOpenComments] = useState(0);

  const handleOpenComments = () => {
    if (openComments === 0) {
      setOpenComments(2);
    } else if (quote.comments.length === 0) {
      setOpenComments(0);
    }
  };

  const handleShowMore = () => {
    setOpenComments((prev) => prev + 2);
  };

  const handleHideComments = () => {
    setOpenComments(0);
  };

  const { mutate: likeMutate } = useMutation(postLike);

  const { mutate: createCommentMutate } = useMutation(postComment, {
    onSuccess() {
      if (searchRef.current) {
        searchRef.current.value = '';
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let commentData = {
      comment: searchRef.current?.value as string,
      quote_id: parseFloat(quoteId as string),
    };

    createCommentMutate(commentData);
  };

  return {
    isLoading,
    quote,
    handleSubmit,
    handleHideComments,
    handleOpenComments,
    handleShowMore,
    hasLiked: likesIds.includes(userData.id),
    likeMutate,
    t,
    searchRef,
    openComments,
    isSuccess,
  };
};

export default useViewQuoteModal;
