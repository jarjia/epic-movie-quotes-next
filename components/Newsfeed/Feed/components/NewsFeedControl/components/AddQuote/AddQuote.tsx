import { AddQuoteIcon } from '@/components';
import { useContext } from 'react';
import { AppContext } from '@/context';

const AddQuote = () => {
  const { handleFeedFormStatus } = useContext(AppContext);

  return (
    <button
      onClick={() => handleFeedFormStatus('add-quote')}
      className='flex items-center sm:w-full sm:bg-transparent p-2 px-4 gap-4 rounded-form-radius bg-add-quote-bg'
    >
      <AddQuoteIcon />
      <p className='text-white text-xl'>Write new quote</p>
    </button>
  );
};

export default AddQuote;
