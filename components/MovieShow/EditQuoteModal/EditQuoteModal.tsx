import { FeedTextareaForFeed, QuotePhoto } from '@/components';
import useEditQuoteModal from './useEditQuoteModal';
import { EditQuote } from './types';

const EditQuoteModal: React.FC<EditQuote> = (props) => {
  const {
    FormProvider,
    form,
    quote,
    errors,
    isLoading,
    handleSubmit,
    onSubmit,
    t,
    editQuoteLoading,
  } = useEditQuoteModal(props.quoteId, props.movieId);

  if (isLoading || !quote.quote || quote.id === 0) {
    return (
      <div className='flex flex-col items-center gap-2 my-16 justify-center'>
        <h1 className='text-white text-3xl'>Loading...</h1>
      </div>
    );
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
          disabled={editQuoteLoading}
          className={`${
            editQuoteLoading
              ? 'bg-disabled'
              : 'bg-default-btn active:bg-active hover:bg-hover'
          } mt-4 mt-2 sm:py-2 text-white w-full rounded py-2`}
        >
          {t('edit_quote_submit')}
        </button>
      </form>
    </FormProvider>
  );
};

export default EditQuoteModal;
