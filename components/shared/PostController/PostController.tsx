import { CommentIcon, HeartIcon, UserProfile } from '@/components';
import usePostConroller from './usePostConroller';
import { PostTypes } from '@/types';

const PostController: React.FC<{ data: PostTypes; userId: number }> = ({
  data,
  userId,
}) => {
  const {
    disabled,
    openComments,
    likedIds,
    handleCommentScroll,
    handleOpenComments,
    handleSubmit,
    handleLiked,
    searchRef,
    comments,
    setOpenComments,
    isLiked,
    hasLiked,
    t,
  } = usePostConroller(data, userId);

  if (comments === undefined) {
    return null;
  }

  return (
    <>
      <div className='flex py-4 gap-6'>
        <button onClick={handleOpenComments} className='select-none flex gap-2'>
          {comments.length}
          <CommentIcon />
        </button>
        <button
          onClick={handleLiked}
          disabled={disabled}
          className='flex gap-2 select-none'
        >
          {likedIds.length}
          <HeartIcon hasLiked={hasLiked || isLiked} />
        </button>
      </div>
      <div className='w-full h-[1px] bg-search-bar-border'></div>
      {openComments > 0 && (
        <div className='py-4 sm:py-2'>
          {comments.length === 0 ? (
            <p className='text-center'>{t('no_comments')}</p>
          ) : (
            comments
              .sort((a, b) => {
                let itemA: Date = new Date(a.created_at);
                let itemB: Date = new Date(b.created_at);
                return itemB.getTime() - itemA.getTime();
              })
              .slice(0, openComments)
              .map((comment) => {
                return (
                  <div key={comment.id} className='sm:pt-2'>
                    <div className='flex items-center'>
                      <div
                        className='w-profile h-profile rounded-full bg-center bg-cover'
                        style={{
                          backgroundImage: `url(${comment.user.thumbnail})`,
                        }}
                      ></div>
                      <p className='pl-4 break-words'>{comment.user.name}</p>
                    </div>
                    <div className='pl-[74px] sm:pl-0 sm:pt-2'>
                      <p className='text-base break-words pb-3 border-b-[1px] border-search-bar-border'>
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                );
              })
          )}
          {comments.length !== 0 && (
            <div className='flex justify-between items-center'>
              {openComments >= comments.length ? null : (
                <button
                  onClick={() => {
                    setOpenComments((prev) => prev + 2);
                    handleCommentScroll(true);
                  }}
                  className='pl-[74px] sm:pl-0 mt-2 text-white underline text-md'
                >
                  {t('show_more')}
                </button>
              )}
              <button
                onClick={() => {
                  handleCommentScroll(false);
                  setOpenComments(0);
                }}
                className='pl-[74px] sm:pl-0 mt-2 text-placeholder underline text-md'
              >
                {t('hide')}
              </button>
            </div>
          )}
        </div>
      )}
      <div className='flex items-center mt-2'>
        <UserProfile />
        <form className='w-full ml-3' onSubmit={handleSubmit}>
          <input
            ref={searchRef}
            type='text'
            className='w-full rounded-form-radius pl-4 placeholder-input pb-2 caret-white text-white border-0 bg-add-quote-bg focus:ring-0 focus:border-transparent'
            placeholder={`${t('comment_placeholder')}`}
          />
        </form>
      </div>
    </>
  );
};

export default PostController;
