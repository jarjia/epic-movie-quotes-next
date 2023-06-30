import { FeedTextareaForFeed, FileInput, SelectMovie } from '@/components';
import { FormProvider } from 'react-hook-form';
import useAddQuote from './useAddQuote';

const AddQuoteModal = () => {
  const { handleSubmit, form, onSubmit, errors, t, addQuoteLoading } =
    useAddQuote();

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
        <SelectMovie />
        <button
          type='submit'
          disabled={addQuoteLoading}
          className={`${
            addQuoteLoading
              ? 'bg-disabled'
              : 'bg-default-btn active:bg-active hover:bg-hover'
          } mt-6 sm:py-2 text-white w-full rounded py-2`}
        >
          {t('post_quote_submit')}
        </button>
      </form>
    </FormProvider>
  );
};

export default AddQuoteModal;
