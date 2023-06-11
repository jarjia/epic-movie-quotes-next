import { PenIcon, TrashBinIcon } from '@/components';
import useMovieDesc from './useMovieDesc';
import { MovieDescTypes } from '@/types';

const MovieDescription: React.FC<MovieDescTypes> = (props) => {
  const { t, locale, handleDelete, handleFeedFormStatus } = useMovieDesc();

  return (
    <div className='max-h-full'>
      <div>
        <div
          className='w-full sm:block hidden mt-3 h-[100px] sm:h-[250px] sm:rounded-xl large:h-[130px] bg-cover rounded-[2px]'
          style={{
            backgroundImage: `url(${props.movie.thumbnail})`,
          }}
        ></div>
        <div className='flex sm:flex-col items-center sm:items-start sm:py-2 gap-2 justify-between'>
          <h2 className='text-title text-xl'>
            {props.movie.movie[locale as never]} ({props.movie.releaseDate})
          </h2>
          <div className='flex items-center gap-4 px-5 py-1.5 bg-add-quote-bg rounded'>
            <button onClick={() => handleFeedFormStatus('edit-movie')}>
              <PenIcon />
            </button>
            <span className='text-placeholder'>|</span>
            <button onClick={() => handleDelete(props.movie.id)}>
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
                  <p>{genre.genre[locale as never]}</p>
                </div>
              );
            })}
        </div>
        <div className='py-1.5'>
          <p className='text-input text-font-base'>
            {t('movie_show_director')}
            <span className='pl-4 text-white'>
              {props.movie.director[locale as never]}
            </span>
          </p>
        </div>
        <p className='text-white leading-[150%] break-all large:text-font-base sm:max-h-full max-h-[250px] overflow-y-scroll scrollbar'>
          {props.movie.description[locale as never]}
        </p>
      </div>
    </div>
  );
};

export default MovieDescription;
