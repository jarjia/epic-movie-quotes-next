import { PostController } from '@/components';
import { Post } from '@/types';
import usePost from './usePost';

const Post: React.FC<Post> = (props) => {
  const { locale, t, postHeight, postRef } = usePost();

  return (
    <div className='text-white text-xl bg-post-bg rounded-xl sm:p-6 p-4 my-8'>
      <div>
        <div className='flex items-center'>
          <div
            className='w-profile h-profile rounded-full bg-cover bg-center'
            style={{ backgroundImage: `url(${props.authorProfile})` }}
          ></div>
          <p className='pl-4 capitalize'>{props.author}</p>
        </div>
        <div className='my-4'>
          <p className='break-words sm:text-base'>
            “<span className='break-words'>{props.quote[locale]}</span>”
            <span className='pl-1'>{t('movie')}-</span>
            <span className='text-title pr-2'>{props.movie[locale]}</span>(
            {props.releaseDate})
          </p>
        </div>
      </div>
      <div
        ref={postRef}
        className='w-full bg-cover bg-white rounded-form-radius'
        style={{
          backgroundImage: `url(${props.thumbnail})`,
          height: `${postHeight}px`,
        }}
      ></div>
      <PostController data={props} userId={props.user_id} />
    </div>
  );
};

export default Post;
