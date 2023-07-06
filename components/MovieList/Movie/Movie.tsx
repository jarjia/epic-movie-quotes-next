import { QuoteIcon } from '@/components';
import useMovie from './useMovie';
import { Movie } from './types';
import Link from 'next/link';

const Movie: React.FC<Movie> = (props) => {
  const { containerRef, containerWidth, locale } = useMovie();

  return (
    <Link
      href={`/movie-list/${props.id}`}
      className='cursor-pointer text-white'
    >
      <div>
        <div>
          <div
            ref={containerRef}
            className='relative w-full bg-cover bg-horizon-center bg-white rounded-movie-radius'
            style={{
              height: containerWidth,
              backgroundImage: `url(${props.thumbnail})`,
            }}
          ></div>
        </div>
        <div className='flex mt-2'>
          <p className='text-xl truncate'>{props.movie[locale]}</p>
          <p className='text-xl pl-1'>({props.releaseDate})</p>
        </div>
        <div className='flex mt-2 gap-3 items-center'>
          <span className='text-font-base'>{props.quotes.length}</span>{' '}
          <QuoteIcon />
        </div>
      </div>
    </Link>
  );
};

export default Movie;
