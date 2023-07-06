import { PenIcon, TrashBinIcon } from '@/components';
import useMovieDesc from './useMovieDesc';
import { MovieDescProp } from './types';

const MovieDescription: React.FC<MovieDescProp> = (props) => {
  const { t, movieDeletionMutation, handleFeedFormStatus, locale } =
    useMovieDesc();

  return (
    <div className='max-h-full'>
      <div>
        <div
          className='w-full bg-cover bg-horizon-center sm:block hidden mt-3 h-[100px] sm-mid:h-[300px] sm:h-[550px] sm:rounded-xl large:h-[130px] rounded-[2px]'
          style={{
            backgroundImage: `url(${props.movie.thumbnail})`,
          }}
        ></div>
        <div className='flex sm:flex-col items-start sm:items-start sm:py-2 gap-2 justify-between'>
          <h2 className='flex text-title text-xl'>
            <span className='break-all capitalize max-h-[250px] overflow-y-scroll scrollbar'>
              {props.movie.movie[locale]}
            </span>
            <span className='pl-1'>({props.movie.releaseDate})</span>
          </h2>
          <div className='flex items-center gap-4 px-5 py-1.5 bg-add-quote-bg rounded'>
            <button onClick={() => handleFeedFormStatus('edit-movie')}>
              <PenIcon />
            </button>
            <span className='text-placeholder'>|</span>
            <button
              onClick={() => movieDeletionMutation(props.movie.id as number)}
            >
              <TrashBinIcon />
            </button>
          </div>
        </div>
        <div className='flex mt-2 flex-wrap py-4 gap-1 large:gap-2 sm:gap-2 sm:max-h-full max-h-[156px] sm:overflow-y-auto overflow-y-scroll scrollbar'>
          {props.movie.genres &&
            props.movie.genres.map((genre) => {
              return (
                <div
                  key={genre.id}
                  className='flex rounded-sm items-center bg-placeholder text-white px-3 py-[2px]'
                >
                  <p>{genre.genre[locale]}</p>
                </div>
              );
            })}
        </div>
        <div className='py-1.5'>
          <p className='text-input max-h-[100px] overflow-y-scroll scrollbar text-font-base'>
            {t('movie_show_director')}
            <span className='capitalize break-all pl-4 text-white'>
              {props.movie.director[locale]}
            </span>
          </p>
        </div>
        <p className='mt-2 pt-2 text-white leading-[150%] break-words large:text-font-base sm:max-h-full'>
          {props.movie.description[locale]}
        </p>
      </div>
    </div>
  );
};

export default MovieDescription;
