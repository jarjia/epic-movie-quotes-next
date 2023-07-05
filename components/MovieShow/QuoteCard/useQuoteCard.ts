import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { AppContext } from '@/context';
import { useQuoteService } from '@/services';
import { useMutation, useQueryClient } from 'react-query';
import { errorToast } from '@/helpers';
import { CommentTypes } from '@/types';

const useQuoteCard = (
  id: number,
  comments: CommentTypes[],
  likes: number[]
) => {
  const { deleteQuote } = useQuoteService();
  const [isBox, setIsBox] = useState(false);
  const { t } = useTranslation('movieList');
  const { t: apiErr } = useTranslation('apiErrors');
  const { handleFeedFormStatus, handleCurrentQuoteId } = useContext(AppContext);
  const router = useRouter();
  const queryClient = useQueryClient();
  let locale = router.locale as string;
  const { mutate: deleteQuoteMutate } = useMutation(deleteQuote, {
    onSuccess: () => {
      handleFeedFormStatus('');
      queryClient.invalidateQueries('movies');
    },
    onError(err: any) {
      errorToast(apiErr, apiErr('delete_quote_failed'), err);
    },
  });
  const [newComments, setNewComments] = useState(comments);
  const [newLikesArr, setNewLikesArr] = useState(likes);
  const { newLikes, commentsArr } = useContext(AppContext);
  const quoteRef = useRef<null | HTMLDivElement>(null);
  const [quoteHeight, setQuoteHeight] = useState<null | number>(null);

  const handleHeight = () => {
    if (quoteRef.current) setQuoteHeight(quoteRef.current?.offsetWidth / 2);
  };

  useEffect(() => {
    if (quoteRef.current) setQuoteHeight(quoteRef.current?.offsetWidth / 2);
    window.addEventListener('resize', handleHeight);
    return () => {
      window.addEventListener('resize', handleHeight);
    };
  }, []);

  useEffect(() => {
    if (commentsArr !== null) {
      let commentsForQuote = commentsArr.filter((item) => item.quote_id === id);
      commentsForQuote.map((commentItem) => {
        if (commentItem !== undefined) {
          setNewComments((prev) => {
            if (prev.some((item) => item.id === commentItem!.id)) {
              return prev;
            } else {
              return [commentItem!, ...prev];
            }
          });
        }
      });
    }
  }, [commentsArr, id]);

  useEffect(() => {
    if (newLikes !== null) {
      let likesForQuoeteArr = newLikes.filter((item) => item.quoteId === id);
      let likesForQuoete = likesForQuoeteArr[likesForQuoeteArr.length - 1];

      if (likesForQuoete?.quoteId === id) {
        setNewLikesArr([]);
        setNewLikesArr(likesForQuoete.likes);
      }
    }
  }, [id, newLikes]);

  return {
    isBox,
    setIsBox,
    t,
    locale,
    handleFeedFormStatus,
    deleteQuoteMutate,
    handleCurrentQuoteId,
    newComments,
    newLikesArr,
    quoteHeight,
    quoteRef,
  };
};

export default useQuoteCard;
