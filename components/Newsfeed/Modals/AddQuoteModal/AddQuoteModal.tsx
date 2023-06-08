import { FeedTextarea, FileInput, SelectMovie } from '@/components';
import { FormProvider } from 'react-hook-form';
import useAddQuote from './useAddQuote';

const AddQuoteModal = () => {
  const { handleSubmit, form, onSubmit } = useAddQuote();

  return (
    <FormProvider {...form}>
      <form className='mt-8' onSubmit={handleSubmit(onSubmit)}>
        <FeedTextarea placeholder='create new quote' lang='Eng' />
        <FeedTextarea placeholder='ახალი ციტატა' lang='ქარ' />
        <FileInput />
        <SelectMovie />
        <button
          type='submit'
          className='bg-default-btn hover:bg-hover mt-2 sm:py-2 text-white w-full rounded py-2 active:bg-active'
        >
          Post
        </button>
      </form>
    </FormProvider>
  );
};

export default AddQuoteModal;
