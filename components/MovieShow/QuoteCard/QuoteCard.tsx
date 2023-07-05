import {
  CommentIcon,
  EyeIcon,
  HeartIcon,
  PenIcon,
  TrashBinIcon,
} from '@/components';
import useQuoteCard from './useQuoteCard';
import { QuoteCardTypes } from './types';

const QuoteCard: React.FC<QuoteCardTypes> = ({
  thumbnail,
  quote,
  id,
  likes,
  comments,
}) => {
  const {
    isBox,
    setIsBox,
    t,
    locale,
    handleFeedFormStatus,
    newLikesArr,
    deleteQuoteMutate,
    handleCurrentQuoteId,
    newComments,
    quoteHeight,
    quoteRef,
  } = useQuoteCard(id, comments, likes);

  return (
    <div className='bg-post-bg pt-4 px-5 rounded-form-radius'>
      {isBox && (
        <div
          className='fixed z-[996] top-0 left-0 w-screen h-screen'
          onClick={() => setIsBox((prev) => !prev)}
        ></div>
      )}
      <div className='grid grid-cols-quote-card sm:grid-cols-[1fr] pb-4 border-b-[1px] border-placeholder gap-4'>
        <div
          ref={quoteRef}
          className='w-full mt-3 min-h-[70px] bg-center large:min-h-[130px] bg-cover rounded-[2px]'
          style={{
            backgroundImage: `url(${thumbnail})`,
            height: `${quoteHeight}px`,
          }}
        ></div>
        <div className='grid grid-cols-1 grid-rows-[5%_95%] w-full h-full pr-8'>
          <div className='flex relative justify-end w-full left-4 mb-1'>
            {isBox && (
              <div className='sm:hidden block relative top-4 sm:top-0 right-8 z-[997]'>
                <div className='flex flex-col sm:right-[-50px] absolute bg-add-quote-bg rounded-form-radius gap-4 p-6 w-[200px]'>
                  <button
                    onClick={() => {
                      setIsBox((prev) => !prev);
                      handleCurrentQuoteId(String(id));
                      handleFeedFormStatus('view-quote');
                    }}
                    className='flex w-full items-center text-white gap-2'
                  >
                    <EyeIcon isPassword={false} />
                    <p>{t('view_quote')}</p>
                  </button>
                  <button
                    onClick={() => {
                      setIsBox((prev) => !prev);
                      handleCurrentQuoteId(String(id));
                      handleFeedFormStatus('edit-quote');
                    }}
                    className='flex w-full items-center text-white gap-2'
                  >
                    <PenIcon />
                    <p>{t('edit_quote')}</p>
                  </button>
                  <button
                    onClick={() => {
                      deleteQuoteMutate(String(id));
                      setIsBox((prev) => !prev);
                    }}
                    className='flex w-full items-center text-white gap-2'
                  >
                    <TrashBinIcon />
                    <p>{t('delete_quote')}</p>
                  </button>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsBox((prev) => !prev)}
              className='py-1 absolute sm:hidden flex'
            >
              <span className='w-[5px] h-[5px] mx-0.5 bg-white rounded-full'></span>
              <span className='w-[5px] h-[5px] mx-0.5 bg-white rounded-full'></span>
              <span className='w-[5px] h-[5px] mx-0.5 bg-white rounded-full'></span>
            </button>
          </div>
          <p className='flex pl-4 sm:pl-1 items-center text-placeholder max-h-[100px] text-xl'>
            <span className='line-clamp-3 break-all'>
              &quot;{quote[locale]}&quot;
            </span>
          </p>
        </div>
      </div>
      <div className='flex justify-between py-4'>
        <div className='flex gap-6'>
          <div className='flex gap-2 text-white'>
            {newComments.length}
            <CommentIcon />
          </div>
          <div className='flex gap-2 text-white'>
            {newLikesArr.length}
            <HeartIcon hasLiked={false} />
          </div>
        </div>
        <div className='relative right-8'>
          {isBox && (
            <div className='sm:block hidden relative top-4 sm:top-0 right-8 z-[997]'>
              <div className='flex flex-col sm:left-[-120px] sm:bottom-2 absolute bg-add-quote-bg rounded-form-radius gap-4 p-6 w-[200px]'>
                <button
                  onClick={() => {
                    setIsBox((prev) => !prev);
                    handleCurrentQuoteId(String(id));
                    handleFeedFormStatus('view-quote');
                  }}
                  className='flex w-full items-center text-white gap-2'
                >
                  <EyeIcon isPassword={false} />
                  <p>{t('view_quote')}</p>
                </button>
                <button
                  onClick={() => {
                    setIsBox((prev) => !prev);
                    handleCurrentQuoteId(String(id));
                    handleFeedFormStatus('edit-quote');
                  }}
                  className='flex w-full items-center text-white gap-2'
                >
                  <PenIcon />
                  <p>{t('edit_quote')}</p>
                </button>
                <button
                  onClick={() => {
                    deleteQuoteMutate(String(id));
                    setIsBox((prev) => !prev);
                  }}
                  className='flex w-full items-center text-white gap-2'
                >
                  <TrashBinIcon />
                  <p>{t('delete_quote')}</p>
                </button>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsBox((prev) => !prev)}
            className='py-1 absolute sm:flex hidden'
          >
            <span className='w-[5px] h-[5px] mx-0.5 bg-white rounded-full'></span>
            <span className='w-[5px] h-[5px] mx-0.5 bg-white rounded-full'></span>
            <span className='w-[5px] h-[5px] mx-0.5 bg-white rounded-full'></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
