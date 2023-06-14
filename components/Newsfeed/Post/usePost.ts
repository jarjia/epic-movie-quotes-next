import { AppContext } from '@/context';
import { useNotificationService } from '@/services';
import { useRouter } from 'next/router';
import { useContext, useRef, useState } from 'react';
import { useMutation } from 'react-query';

const usePost = (
  quoteId: number,
  commentsLength: number,
  likes: { id: number; user: { id: number } }[]
) => {
  const likesIds = likes.map((item) => item.user.id);
  const router = useRouter();
  let locale = router.locale as string;
  const { postComment, postLike } = useNotificationService();
  const searchRef = useRef<HTMLInputElement>(null);
  const { userData } = useContext(AppContext);
  const [openComments, setOpenComments] = useState(0);
  const [hasLiked] = useState(likesIds.includes(userData.id) ? true : false);

  const handleOpenComments = () => {
    if (openComments === 0) {
      setOpenComments(2);
    } else if (commentsLength === 0) {
      setOpenComments(0);
    }
  };

  const handleShowMore = () => {
    setOpenComments((prev) => prev + 2);
  };

  const handleHideComments = () => {
    setOpenComments(0);
  };

  const { mutate: likeMutate } = useMutation(postLike, {
    onSuccess(data) {
      console.log(data);
    },
  });

  const { mutate: createCommentMutate } = useMutation(postComment, {
    onSuccess() {
      if (searchRef.current) {
        searchRef.current.value = '';
      }
    },
    onError: (err) => {
      console.log(err);
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
    handleHideComments,
    handleOpenComments,
    handleShowMore,
    handleSubmit,
    userData,
    searchRef,
    openComments,
    likeMutate,
    hasLiked,
  };
};

export default usePost;
