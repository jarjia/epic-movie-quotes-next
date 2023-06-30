import { Controller } from 'react-hook-form';
import { GenreFieldTypes } from './types';
import { CloseIcon } from '@/components';
import useFeedGenresField from './useFeedGenresField';
import { GenreObjectType } from '@/types';

const FeedGenresField: React.FC<GenreFieldTypes> = (props) => {
  const {
    handleAddGenre,
    handleDeleteGenre,
    setSelect,
    filteredGenres,
    control,
    genresRef,
    genres,
    t,
    locale,
    select,
  } = useFeedGenresField(props.defaultVal as GenreObjectType[]);

  return (
    <>
      <Controller
        name='genres'
        control={control}
        defaultValue={genres}
        render={(): any => null}
      />
      <div ref={genresRef} className='w-full my-6'>
        <div
          className={`flex overflow-x-scroll scrollbar px-2 items-center border-[1px] rounded bg-transparent ${
            genres.length < 1 && props.error['genres'] !== undefined
              ? 'border-default-btn'
              : 'border-placeholder'
          } w-full h-11`}
          onClick={() => setSelect((prev) => !prev)}
        >
          {genres.length === 0 ? (
            <p className='text-white select-none'>{t('genres_placeholder')}</p>
          ) : (
            genres.map((genre) => {
              return (
                <div
                  key={genre.id}
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  className='flex rounded-sm items-center gap-1 bg-placeholder text-white mx-0.5 px-2 py-[2px]'
                >
                  <p onClick={() => setSelect((prev) => !prev)}>
                    {genre.genre[locale]}
                  </p>
                  <button
                    type='button'
                    onClick={() => handleDeleteGenre(genre.id)}
                  >
                    <CloseIcon color={false} isSmall={true} />
                  </button>
                </div>
              );
            })
          )}
        </div>
        <div>
          <p className='absolute text-default-btn text-sm tiny:text-tiny-font'>
            {genres.length < 1 &&
              props.error['genres'] !== undefined &&
              t('genres_error')}
          </p>
        </div>
        {select && (
          <div className='relative'>
            <div className='absolute max-h-60 overflow-y-scroll scrollbar bg-form-back text-white rounded-b w-full z-[99]'>
              {filteredGenres &&
                filteredGenres.map((item: GenreObjectType) => {
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleAddGenre(item)}
                      className='cursor-pointer select-none p-1 px-2 hover:bg-blue-700'
                    >
                      {item.genre[locale]}
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FeedGenresField;
