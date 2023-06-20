import {
  FeedBaseInput,
  FeedGenresField,
  FeedTextareaForFeed,
  FileInput,
} from '@/components';
import useAddMovie from './useAddMovie';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

const AddMovieModal = () => {
  const {
    FormProvider,
    onSubmit,
    handleSubmit,
    t: addMovie,
    control,
    form,
    errors,
  } = useAddMovie();
  const { t } = useTranslation('formErrors');

  return (
    <FormProvider {...form}>
      <form className='mt-8' onSubmit={handleSubmit(onSubmit)}>
        <FeedBaseInput
          name='movie[en]'
          errorName='movie'
          label='Movie name'
          lang='Eng'
          type='text'
          errors={errors}
        />
        <FeedBaseInput
          name='movie[ka]'
          errorName='movie'
          label='ფილმის სახელი'
          lang='ქარ'
          type='text'
          errors={errors}
        />
        <FeedGenresField error={errors as { genres: {} }} />
        <Controller
          name='releaseDate'
          control={control}
          render={({ field, fieldState: { error } }) => {
            let errorMessage = t('movie_release_date');

            return (
              <div className='flex flex-col'>
                <input
                  type='text'
                  placeholder='წელი/year'
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
                      ? 'border-default-btn'
                      : 'border-placeholder'
                  } w-full placeholder-white focus:border-placeholder caret-white pl-2 text-white bg-transparent pr-10 rounded border-[1px] focus:ring-0 block flex-1 min-w-0 w-full`}
                />
                <p className='text-default-btn text-sm'>
                  {error !== undefined && errorMessage}
                </p>
              </div>
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
        />
        <FeedBaseInput
          name='director[ka]'
          errorName='director'
          label='დირექტორი'
          lang='ქარ'
          type='text'
          errors={errors}
        />
        <FeedTextareaForFeed
          name='description[en]'
          errorName='description'
          label='description'
          lang='Eng'
          errors={errors}
        />
        <FeedTextareaForFeed
          name='description[ka]'
          errorName='description'
          label='ფილმის აღწერა'
          lang='ქარ'
          errors={errors}
        />
        <FileInput />
        <div>
          <p className='text-default-btn text-sm'>
            {errors['thumbnail']?.message as string}
          </p>
        </div>
        <button
          type='submit'
          className='bg-default-btn hover:bg-hover mt-4 sm:py-2 text-white w-full rounded py-2 active:bg-active'
        >
          {addMovie('add_movie')}
        </button>
      </form>
    </FormProvider>
  );
};

export default AddMovieModal;
