import useEditMovieModal from './useEditMovieModal';
import {
  FeedGenresField,
  FeedBaseInput,
  ReplacePhoto,
  FeedTextareaForFeed,
} from '@/components';
import { EditMovieTypes } from './types';

const EditMovieModal: React.FC<EditMovieTypes> = ({ movie }) => {
  const {
    FormProvider,
    form,
    control,
    handleSubmit,
    onSubmit,
    t,
    Controller,
    editMovieLoading,
    errors,
  } = useEditMovieModal(movie && movie.id);

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
              let errorMessage = t('formErrors:movie_release_date');

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
                  <div className='relative bottom-1.5'>
                    <p className='absolute text-default-btn text-sm tiny:text-tiny-font'>
                      {error !== undefined && error.message === 'Required'
                        ? errorMessage
                        : error?.message}
                    </p>
                  </div>
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
            disabled={editMovieLoading}
            className={`${
              editMovieLoading
                ? 'bg-disabled'
                : 'bg-default-btn active:bg-active hover:bg-hover'
            } mt-4 mt-2 sm:py-2 text-white w-full rounded py-2`}
          >
            {t('movieList:edit_movie')}
          </button>
        </form>
      )}
    </FormProvider>
  );
};

export default EditMovieModal;
