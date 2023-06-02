import { FeedTextarea, FileInput, SelectMovie } from '@/components';

const AddQuoteModal = () => {
  return (
    <form className='mt-8'>
      <FeedTextarea placeholder='create new quote' lang='Eng' />
      <FeedTextarea placeholder='ახალი ციტატა' lang='ქარ' />
      <FileInput />
      <SelectMovie />
      <button
        type='submit'
        className='bg-default-btn hover:bg-hover mt-2 sm:py-2 text-white w-full rounded py-1 active:bg-active'
      >
        Post
      </button>
    </form>
  );
};

export default AddQuoteModal;
