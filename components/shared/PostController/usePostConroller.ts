import { AppContext } from '@/context';
import { useNotificationService } from '@/services';
import { PostTypes } from '@/types';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useMutation } from 'react-query';

const usePostConroller = (data: PostTypes, userId: number) => {
  const { postComment, postLike } = useNotificationService();
  const initialLikes: number[] = data.likes?.map((item) => item.user.id);
  const [openComments, setOpenComments] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [likedIds, setLikedIds] = useState<number[]>(initialLikes);
  const [comments, setComments] = useState(data.comments);
  const [disabled, setDisabled] = useState(false);
  const [isLiked, setIsliked] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const { userData, newLikes, handleNewLikes, handleNewComment, comment } =
    useContext(AppContext);
  const { t } = useTranslation('common');

  const handleOpenComments = () => {
    if (openComments === 0) {
      setOpenComments(2);
    } else if (data.comments.length === 0) {
      setOpenComments(0);
    }
  };

  useEffect(() => {
    if (newLikes !== null) {
      setLikedIds([]);
      setLikedIds(newLikes);
      handleNewLikes(null);
      if (newLikes.includes(userData.id)) {
        setHasLiked(true);
      } else {
        setHasLiked(false);
      }
    }
  }, [handleNewLikes, userData.id, newLikes, likedIds.length]);

  useEffect(() => {
    if (comment !== null) {
      setComments((prev) => {
        if (prev.some((item) => item.id === comment.id)) {
          return prev;
        } else return [comment, ...prev];
      });
      handleNewComment(null);
    }
  }, [comment, handleNewComment]);

  const handleLiked = () => {
    if (hasLiked) {
      setIsliked(false);
      setHasLiked(false);
      likedIds.length--;
    } else {
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
    if (hasLiked) {
      setIsliked(false);
    }
  }, [hasLiked]);

  const { mutate: likeMutate } = useMutation(postLike, {
    onSuccess() {
      setDisabled(false);
    },
  });

  const { mutate: createCommentMutate } = useMutation(postComment, {
    onSuccess() {
      if (searchRef.current) {
        searchRef.current.value = '';
        setOpenComments(2);
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
    searchRef,
    comments,
    disabled,
    openComments,
    handleOpenComments,
    handleLiked,
  };
};

export default usePostConroller;
