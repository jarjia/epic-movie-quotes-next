import { MovieDescTypes } from '@/types';
import useEditMovieModal from './useEditMovieModal';
import {
  FeedGenresField,
  FeedBaseInput,
  ReplacePhoto,
  FeedTextareaForFeed,
} from '@/components';
import { useTranslation } from 'next-i18next';

const EditMovieModal: React.FC<MovieDescTypes> = ({ movie }) => {
  const {
    FormProvider,
    form,
    control,
    handleSubmit,
    onSubmit,
    Controller,
    errors,
  } = useEditMovieModal(movie && movie.id);
  const { t } = useTranslation('formErrors');

  return (
    <FormProvider {...form}>
      {movie !== undefined && (
        <form
          className='mt-8'
          onSubmit={handleSubmit(onSubmit)}
          encType='multipart/form-data'
        >
          <FeedBaseInput
            name='movie[en]'
            errorName='movie'
            label='Movie name'
            lang='Eng'
            type='text'
            errors={errors}
            defaultVal={movie.movie.en}
          />
          <FeedBaseInput
            name='movie[ka]'
            errorName='movie'
            label='ფილმის სახელი'
            lang='ქარ'
            type='text'
            errors={errors}
            defaultVal={movie.movie.ka}
          />
          <FeedGenresField
            error={errors as { genres: {} }}
            defaultVal={movie.genres}
          />
          <Controller
            name='releaseDate'
            control={control}
            defaultValue={movie.releaseDate}
            render={({ field, fieldState: { error } }) => {
              let errorMessage = t('movie_release_date');

              return (
                <>
                  <div className='flex'>
                    <span
                      className={`${
                        error !== undefined
                          ? 'border-default-btn'
                          : 'border-placeholder'
                      } text-placeholder border-[1px] border-r-0 inline-flex items-center pl-2 text-sm bg-transparent rounded-l-md`}
                    >
                      წელი/year:
                    </span>
                    <input
                      type='text'
                      {...field}
                      onChange={(e) => {
                        let value = e.target.value;
                        if (parseInt(value) < 0) {
                          value = '';
                        }
                        if (isNaN(parseInt(value))) {
                          value = '';
                        }
                        field.onChange(value);
                      }}
                      className={`${
                        error !== undefined
                          ? 'border-default-btn focus:border-default-btn'
                          : 'border-placeholder focus:border-placeholder'
                      } w-full caret-white text-white border-l-0 border-[1px] rounded-r bg-transparent focus:ring-0 block flex-1 min-w-0`}
                    />
                  </div>
                  <p className='text-default-btn text-sm'>
                    {error !== undefined && errorMessage}
                  </p>
                </>
              );
            }}
          />
          <FeedBaseInput
            name='director[en]'
            errorName='director'
            label='Director'
            lang='Eng'
            type='text'
            errors={errors}
            defaultVal={movie.director.en}
          />
          <FeedBaseInput
            name='director[ka]'
            errorName='director'
            label='დირექტორი'
            lang='ქარ'
            type='text'
            errors={errors}
            defaultVal={movie.director.ka}
          />
          <FeedTextareaForFeed
            name='description[en]'
            errorName='description'
            label='description'
            lang='Eng'
            errors={errors}
            defaultVal={movie.description.en}
          />
          <FeedTextareaForFeed
            name='description[ka]'
            errorName='description'
            label='ფილმის აღწერა'
            lang='ქარ'
            errors={errors}
            defaultVal={movie.description.ka}
          />
          <ReplacePhoto movieImage={movie.thumbnail} />
          <button
            type='submit'
            className='bg-default-btn hover:bg-hover mt-4 text-white w-full py-2 rounded active:bg-active'
          >
            Edit movie
          </button>
        </form>
      )}
    </FormProvider>
  );
};

export default EditMovieModal;
