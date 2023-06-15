import { AppContext } from '@/context';
import { useNotificationService } from '@/services';
import { useRouter } from 'next/router';
import { useContext, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useMutation } from 'react-query';
import { likeTypes } from '@/types';

const usePost = (
  quoteId: number,
  commentsLength: number,
  likes: likeTypes[]
) => {
  const likesIds = likes.map((item) => item.user.id);
  const router = useRouter();
  let locale = router.locale as string;
  const { postComment, postLike } = useNotificationService();
  const searchRef = useRef<HTMLInputElement>(null);
  const { userData } = useContext(AppContext);
  const [openComments, setOpenComments] = useState(0);
  const [hasLiked] = useState(likesIds.includes(userData.id) ? true : false);
  const { t } = useTranslation('newsfeed');

  const handleOpenComments = () => {
    if (openComments === 0) {
      setOpenComments(2);
    } else if (commentsLength === 0) {
      setOpenComments(0);
    }
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
      quote_id: quoteId,
    };

    createCommentMutate(commentData);
  };

  return {
    locale,
    handleOpenComments,
    handleSubmit,
    userData,
    searchRef,
    t,
    openComments,
    likeMutate,
    hasLiked,
    setOpenComments,
  };
};

export default usePost;
