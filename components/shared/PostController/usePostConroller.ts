import { AppContext } from '@/context';
import { useNotificationService } from '@/services';
import { Post } from '@/types';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useMutation, useQueryClient } from 'react-query';

const usePostConroller = (data: Post, userId: number) => {
  const { postComment, postLike } = useNotificationService();
  const initialLikes: number[] = data.likes?.map((item) => item.user.id);
  const [openComments, setOpenComments] = useState(2);
  const [hasLiked, setHasLiked] = useState(false);
  const [likedIds, setLikedIds] = useState<number[]>(initialLikes);
  const [comments, setComments] = useState(data.comments);
  const [disabled, setDisabled] = useState(false);
  const [isLiked, setIsliked] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const { userData, newLikes, handleNewLikes, handleNewComment, commentsArr } =
    useContext(AppContext);
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();

  useEffect(() => {
    setComments(data.comments);
  }, [data.comments]);

  useEffect(() => {
    if (newLikes !== null) {
      let likesForQuoeteArr = newLikes.filter(
        (item) => item.quoteId === data.id
      );
      let likesForQuoete = likesForQuoeteArr[likesForQuoeteArr.length - 1];

      if (likesForQuoete?.quoteId === data.id) {
        setLikedIds([]);
        setLikedIds(likesForQuoete.likes);
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

  const { mutate: createCommentMutate, isLoading } = useMutation(postComment, {
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

    if (searchRef.current?.value && searchRef.current?.value.length > 0) {
      createCommentMutate(commentData);
    }
  };

  const sortedComments = comments
    .sort((a, b) => {
      let itemA: Date = new Date(a.created_at);
      let itemB: Date = new Date(b.created_at);
      return itemB.getTime() - itemA.getTime();
    })
    .slice(0, openComments);

  return {
    handleSubmit,
    setOpenComments,
    likedIds,
    isLiked,
    hasLiked,
    t,
    searchRef,
    comments,
    isLoading,
    sortedComments,
    disabled,
    openComments,
    handleLiked,
  };
};

export default usePostConroller;
