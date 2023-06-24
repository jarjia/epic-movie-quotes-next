import { AppContext } from '@/context';
import { useNotificationService } from '@/services';
import { PostTypes } from '@/types';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useMutation, useQueryClient } from 'react-query';

const usePostConroller = (data: PostTypes, userId: number) => {
  const { postComment, postLike } = useNotificationService();
  const initialLikes: number[] = data.likes?.map((item) => item.user.id);
  const [openComments, setOpenComments] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [likedIds, setLikedIds] = useState<number[]>(initialLikes);
  const [comments, setComments] = useState(data.comments);
  const [disabled, setDisabled] = useState(false);
  const [isLiked, setIsliked] = useState(false);
  const [howMuchScrolled, setHowMuchScrolled] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);
  const {
    userData,
    newLikes,
    handleNewLikes,
    handleNewComment,
    feedFormStatus,
    commentsArr,
  } = useContext(AppContext);
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();

  const handleCommentScroll = (bool: boolean) => {
    if (feedFormStatus === '') {
      const currentScrollHeight = window.scrollY;
      setHowMuchScrolled((prev) => prev + 180);
      let newScrollHeight = howMuchScrolled;
      if (bool) {
        newScrollHeight = currentScrollHeight + 180;
      } else {
        setHowMuchScrolled(0);
        newScrollHeight = currentScrollHeight - howMuchScrolled;
      }
      window.scrollTo(0, newScrollHeight as number);
    }
  };

  const handleOpenComments = () => {
    if (openComments === 0) {
      setOpenComments(2);
      handleCommentScroll(true);
    } else if (data.comments.length === 0) {
      setOpenComments(0);
      handleCommentScroll(false);
    }
  };

  useEffect(() => {
    if (newLikes !== null) {
      let likesForQuoete = newLikes.find((item) => item.quoteId === data.id);
      if (likesForQuoete?.quoteId === data.id) {
        setLikedIds([]);
        setLikedIds(likesForQuoete.likes);
        if (likesForQuoete.likes.includes(userData.id)) {
          setHasLiked(true);
        } else {
          setHasLiked(false);
        }
      }
    }
  }, [
    handleNewLikes,
    userData.id,
    queryClient,
    newLikes,
    data.id,
    likedIds.length,
  ]);

  const handleLiked = () => {
    if (hasLiked) {
      setIsliked(false);
      setHasLiked(false);
      likedIds.length--;
    } else {
      setHasLiked(true);
      setIsliked(true);
      likedIds.length++;
    }
    setDisabled(true);
    likeMutate({ quoteId: data.id, to_user: data.user_id });
  };

  useEffect(() => {
    if (likedIds.includes(userData.id)) {
      setHasLiked(true);
    } else {
      setHasLiked(false);
    }
  }, [likedIds, userData.id]);

  useEffect(() => {
    if (commentsArr !== null) {
      let commentsForQuote = commentsArr.filter(
        (item) => item.quote_id === data.id
      );
      commentsForQuote.map((commentItem) => {
        if (commentItem !== undefined) {
          setComments((prev) => {
            if (prev.some((item) => item.id === commentItem!.id)) {
              return prev;
            } else {
              return [commentItem!, ...prev];
            }
          });
        }
      });
    }
  }, [commentsArr, handleNewComment, data.id]);

  const { mutate: likeMutate } = useMutation(postLike, {
    onSuccess() {
      setDisabled(false);
    },
  });

  const { mutate: createCommentMutate } = useMutation(postComment, {
    onSuccess() {
      if (searchRef.current) {
        searchRef.current.value = '';
        if (openComments === 0) {
          setOpenComments(2);
        }
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let commentData = {
      comment: searchRef.current?.value as string,
      quote_id: data.id,
      to_user: userId,
    };

    createCommentMutate(commentData);
  };

  return {
    handleSubmit,
    setOpenComments,
    likedIds,
    isLiked,
    hasLiked,
    t,
    handleCommentScroll,
    searchRef,
    comments,
    disabled,
    openComments,
    handleOpenComments,
    handleLiked,
  };
};

export default usePostConroller;
