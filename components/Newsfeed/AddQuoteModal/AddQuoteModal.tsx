import { FeedTextareaForFeed, FileInput, SelectMovie } from '@/components';
import { FormProvider } from 'react-hook-form';
import useAddQuote from './useAddQuote';
import { useTranslation } from 'next-i18next';

const AddQuoteModal = () => {
  const { handleSubmit, form, onSubmit, errors } = useAddQuote();
  const { t } = useTranslation('newsFeed');

  return (
    <FormProvider {...form}>
      <form className='mt-8' onSubmit={handleSubmit(onSubmit)}>
        <FeedTextareaForFeed
          label='create new quote'
          name='quote[en]'
          lang='Eng'
          errorName='quote'
          errors={errors}
        />
        <FeedTextareaForFeed
          label='ახალი ციტატა'
          name='quote[ka]'
          lang='ქარ'
          errorName='quote'
          errors={errors}
        />
        <FileInput />
        <div>
          <p className='text-default-btn text-sm'>
            {errors['thumbnail']?.message as string}
          </p>
        </div>
        <SelectMovie />
        <div>
          <p className='text-default-btn text-sm'>
            {errors['movieId'] && t('select_movie_err')}
          </p>
        </div>
        <button
          type='submit'
          className='bg-default-btn hover:bg-hover mt-2 sm:py-2 text-white w-full rounded py-2 active:bg-active'
        >
          {t('post_quote_submit')}
        </button>
      </form>
    </FormProvider>
  );
};

export default AddQuoteModal;
