import { CameraIcon, DropDownIcon } from '@/components';
import useSelectMovie from './useSelectMovie';
import { Keys } from '@/types';

const SelectMovie = () => {
  const {
    Controller,
    control,
    handleMovieId,
    handleSelect,
    movieId,
    movies,
    locale,
    isSelect,
    t,
  } = useSelectMovie();

  return (
    <div className='mt-4'>
      <Controller
        name='movieId'
        control={control}
        render={() => <input type='hidden' />}
      />
      <div
        onClick={handleSelect}
        className='text-white bg-black border-0 py-3 my-2'
      >
        <button
          type='button'
          className='w-full px-3 flex text-font-base justify-between items-center gap-2'
        >
          <div className='flex items-center gap-2'>
            <CameraIcon />
            {movieId === null ? t('post_choose_movie') : movieId.movie[locale]}
          </div>
          <div>
            <DropDownIcon />
          </div>
        </button>
        {isSelect && (
          <div className='relative top-2'>
            <div className='absolute w-full h-[1px] bg-placeholder my-2'></div>
            <div className='absolute px-3 py-1 w-full flex flex-col bg-black'>
              {movies && movies.length !== 0 ? (
                movies.map((item: { id: number; movie: Keys }) => {
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleMovieId(item)}
                      className='truncate py-1 cursor-pointer hover:bg-blue-700 px-1 select-none'
                    >
                      {item.movie[locale]}
                    </div>
                  );
                })
              ) : (
                <div className='truncate py-1 px-1 select-none'>
                  {t('no_movies')}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectMovie;
