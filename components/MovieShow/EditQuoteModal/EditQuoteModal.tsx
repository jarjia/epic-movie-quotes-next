import { FeedTextareaForFeed, QuotePhoto } from '@/components';
import useEditQuoteModal from './useEditQuoteModal';
import { EditQuoteTypes } from './types';

const EditQuoteModal: React.FC<EditQuoteTypes> = (props) => {
  const {
    FormProvider,
    form,
    quote,
    errors,
    isLoading,
    handleSubmit,
    onSubmit,
    t,
  } = useEditQuoteModal(
    props.quoteId,
    props.movieId,
    props.handleRefecthQuotes
  );

  if (isLoading || !quote.quote || quote.id === 0) {
    return null;
  }

  return (
    <FormProvider {...form}>
      <form
        className='mt-8'
        onSubmit={handleSubmit(onSubmit)}
        encType='multipart/form-data'
      >
        <FeedTextareaForFeed
          name='quote[en]'
          errorName='quote'
          label={`"${'Quote in English.'}"`}
          lang='Eng'
          errors={errors}
        />
        <FeedTextareaForFeed
          name='quote[ka]'
          errorName='quote'
          label={`“${'ციტატა ქართულ ენაზე'}“`}
          lang='ქარ'
          errors={errors}
        />
        <QuotePhoto thumbnail={quote.thumbnail} />
        <button
          type='submit'
          className='bg-default-btn hover:bg-hover mt-4 text-white w-full py-2 rounded active:bg-active'
        >
          {t('edit_quote_submit')}
        </button>
      </form>
    </FormProvider>
  );
};

export default EditQuoteModal;
