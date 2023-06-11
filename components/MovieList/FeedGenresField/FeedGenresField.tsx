import { Controller } from 'react-hook-form';
import { GenreFieldTypes, GenreObjectType } from './types';
import { CloseIcon } from '@/components';
import useFeedGenresField from './useFeedGenresField';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const FeedGenresField: React.FC<GenreFieldTypes> = (props) => {
  const {
    handleAddGenre,
    handleDeleteGenre,
    handleSelect,
    filteredGenres,
    control,
    genres,
    select,
  } = useFeedGenresField(props.defaultVal);
  const { t } = useTranslation('movieList');
  const router = useRouter();
  const locale = router.locale;

  return (
    <>
      <Controller
        name='genres'
        control={control}
        defaultValue={genres}
        render={(): any => null}
      />
      <div className='w-full my-4'>
        <div
          className={`flex overflow-x-scroll scrollbar px-2 items-center border-[1px]  rounded bg-transparent ${
            genres.length < 1 && props.error['genres'] !== undefined
              ? 'border-default-btn'
              : 'border-placeholder'
          } w-full h-11`}
          onClick={handleSelect}
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
                  <p onClick={handleSelect}>{genre.genre[locale as never]}</p>
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
        <p className='text-default-btn text-sm'>
          {genres.length < 1 &&
            props.error['genres'] !== undefined &&
            t('genres_error')}
        </p>
        {select && (
          <div
            className={`relative bottom-${
              props.error['genres'] !== undefined ? '5' : '0'
            }`}
          >
            <div className='absolute max-h-60 overflow-y-scroll scrollbar bg-post-bg text-white rounded-b w-full z-[99]'>
              {filteredGenres &&
                filteredGenres.map((item: GenreObjectType) => {
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleAddGenre(item)}
                      className='cursor-pointer select-none p-1 px-2 hover:bg-blue-700'
                    >
                      {item.genre[locale as never]}
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
