import { CameraIcon, DropDownIcon } from '@/components';
import useSelectMovie from './useSelectMovie';
import { Keys } from '@/types';

const SelectMovie = () => {
  const {
    Controller,
    control,
    handleMovieId,
    setIsSelect,
    movieId,
    movies,
    locale,
    isSelect,
    selectRef,
    errors,
    t,
  } = useSelectMovie();

  return (
    <>
      <div className='mt-4'>
        <Controller
          name='movieId'
          control={control}
          render={() => <input type='hidden' />}
        />
        <div
          ref={selectRef}
          onClick={() => setIsSelect((prev) => !prev)}
          className={`${
            errors['movieId'] && movieId === null
              ? 'border-[1px] border-default-btn'
              : 'border-[1px] border-transparent'
          } text-white bg-black py-3 my-2 rounded`}
        >
          <button
            type='button'
            className='w-full px-3 flex text-font-base justify-between items-center gap-2'
          >
            <div className='flex truncate items-center gap-2'>
              <CameraIcon isMovie={false} />
              {movieId === null
                ? t('post_choose_movie')
                : movieId.movie[locale]}
            </div>
            <div>
              <DropDownIcon />
            </div>
          </button>
          {isSelect && (
            <div className='relative'>
              <div className='absolute max-h-24 overflow-y-scroll scrollbar bg-black px-2 py-1 text-white rounded-b w-full z-[99]'>
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
      <div className='relative bottom-1.5'>
        <p className='absolute text-default-btn text-sm tiny:text-tiny-font'>
          {errors['movieId'] && movieId === null && t('select_movie_err')}
        </p>
      </div>
    </>
  );
};

export default SelectMovie;
