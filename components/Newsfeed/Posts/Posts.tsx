import { Post } from '@/components';
import usePosts from './usePosts';
import { Posts } from '@/types';
import { Posts as LocalPosts } from './types';

const Posts: React.FC<LocalPosts> = (props) => {
  const { posts, isLoading, t } = usePosts();

  if (isLoading) {
    return (
      <div className='flex flex-col items-center gap-2 my-16 justify-center'>
        <h1 className='text-white text-3xl'>Loading...</h1>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className='flex flex-col items-center gap-2 my-16 justify-center'>
        <h1 className='text-white text-3xl'>{t('no_posts')}</h1>
      </div>
    );
  }

  return (
    <div className='my-4 pb-2'>
      {posts.map((post: Posts) => {
        return (
          <Post
            key={post.id}
            id={post.id}
            thumbnail={post.thumbnail}
            quote={post.quote}
            releaseDate={post.movies.releaseDate}
            author={post.movies.user.name}
            authorProfile={post.movies.user.thumbnail}
            movie={post.movies.movie}
            comments={post.comments}
            likes={post.likes}
            user_id={post.movies.user_id}
            setModalWidth={props.setModalWidth}
          />
        );
      })}
    </div>
  );
};

export default Posts;
