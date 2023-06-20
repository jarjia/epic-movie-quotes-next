import { Post } from '@/components';
import usePosts from './usePosts';
import { PostsTypes } from '@/types';

const Posts = () => {
  const { posts, isLoading } = usePosts();

  if (isLoading) {
    return null;
  }

  return (
    <div className='my-4 pb-2'>
      {posts.map((post: PostsTypes) => {
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
          />
        );
      })}
    </div>
  );
};

export default Posts;
