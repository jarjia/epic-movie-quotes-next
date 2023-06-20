import { PostController } from '@/components';
import { PostTypes } from '@/types';
import usePost from './usePost';

const Post: React.FC<PostTypes> = (props) => {
  const { locale, t } = usePost();

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
            <span className='pl-1'>{t('movie')}-</span>
            <span className='text-title px-2'>{props.movie[locale]}</span>(
            {props.releaseDate})
          </p>
        </div>
      </div>
      <div
        className='w-full h-[400px] sm:h-[250px] bg-cover bg-white rounded-form-radius'
        style={{
          backgroundImage: `url(${props.thumbnail})`,
        }}
      ></div>
      <PostController data={props} userId={props.user_id} />
    </div>
  );
};

export default Post;
