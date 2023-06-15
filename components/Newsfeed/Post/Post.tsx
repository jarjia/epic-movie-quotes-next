import { CommentIcon, HeartIcon } from '@/components';
import { PostTypes } from './types';
import usePost from './usePost';

const Post: React.FC<PostTypes> = (props) => {
  const {
    locale,
    openComments,
    handleOpenComments,
    handleSubmit,
    likeMutate,
    searchRef,
    setOpenComments,
    hasLiked,
    t,
  } = usePost(props.id, props.comments.length, props.likes);

  return (
    <div className='text-white text-xl bg-post-bg rounded-xl sm:p-8 p-4 my-8'>
      <div>
        <div className='flex items-center'>
          <div
            className='w-profile h-profile rounded-full bg-cover bg-center'
            style={{ backgroundImage: `url(${props.authorProfile})` }}
          ></div>
          <p className='pl-4'>{props.author}</p>
        </div>
        <div className='my-4'>
          <p className='break-words sm:text-base'>
            “<span>{props.quote[locale]}</span>”
            <span className='pl-1'>movie-</span>
            <span className='text-title px-2'>{props.movie[locale]}</span>(
            {props.releaseDate})
          </p>
        </div>
      </div>
      <div>
        <div
          className='w-full h-[400px] sm:h-[250px] bg-cover bg-white rounded-form-radius'
          style={{
            backgroundImage: `url(${props.thumbnail})`,
          }}
        ></div>
        <div className='flex py-4 gap-6'>
          <button onClick={handleOpenComments} className='flex gap-2'>
            {props.comments.length}
            <CommentIcon />
          </button>
          <button onClick={() => likeMutate(props.id)} className='flex gap-2'>
            {props.likes.length}
            <HeartIcon hasLiked={hasLiked} />
          </button>
        </div>
        <div className='w-full h-[1px] bg-search-bar-border'></div>
      </div>
      {openComments > 0 && (
        <div className='py-4'>
          {props.comments.length === 0 ? (
            <p className='text-center'>No Comments...</p>
          ) : (
            props.comments.slice(0, openComments).map((comment) => {
              return (
                <div key={comment.id}>
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
          {props.comments.length !== 0 && (
            <div className='flex justify-between items-center'>
              {openComments >= props.comments.length ? null : (
                <button
                  onClick={() => setOpenComments((prev) => prev + 2)}
                  className='pl-[74px] mt-2 text-white underline text-md'
                >
                  Show more
                </button>
              )}
              <button
                onClick={() => setOpenComments(0)}
                className='pl-[74px] mt-2 text-placeholder underline text-md'
              >
                Hide
              </button>
            </div>
          )}
        </div>
      )}
      <div className='flex items-center mt-2'>
        <div>
          <div
            className='w-profile h-profile rounded-full bg-center bg-cover'
            style={{ backgroundImage: 'url(/assets/images/user.png)' }}
          ></div>
        </div>
        <form className='w-full ml-3' onSubmit={handleSubmit}>
          <input
            ref={searchRef}
            type='text'
            className='w-full rounded-form-radius pl-4 placeholder-input pb-2 caret-white text-white border-0 bg-add-quote-bg focus:ring-0 focus:border-transparent'
            placeholder={`${t('comment_placeholder')}`}
          />
        </form>
      </div>
    </div>
  );
};

export default Post;
