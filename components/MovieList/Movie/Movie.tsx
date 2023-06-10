import { QuoteIcon } from '@/components';
import useMovie from './useMovie';
import { MovieTypes } from './types';

const Movie: React.FC<MovieTypes> = (props) => {
  const { containerRef, containerWidth, locale } = useMovie();

  return (
    <div className='text-white'>
      <div>
        <div
          ref={containerRef}
          className='relative w-full bg-cover bg-white rounded-movie-radius'
          style={{
            height: containerWidth,
            backgroundImage: `url(${props.thumbnail})`,
          }}
        ></div>
      </div>
      <div className='mt-2'>
        <p className='text-xl'>
          {props.movie[locale as never]} ({props.releaseDate})
        </p>
      </div>
      <div className='flex mt-2 gap-3 items-center'>
        <span className='text-font-base'>10</span> <QuoteIcon />
      </div>
    </div>
  );
};

export default Movie;
