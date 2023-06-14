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
  likesNumber,
  commentsNumber,
  handleRefecthQuotes,
}) => {
  const {
    isBox,
    handleSetIsBox,
    t,
    locale,
    handleFeedFormStatus,
    deleteQuoteMutate,
    handleCurrentQuoteId,
  } = useQuoteCard(handleRefecthQuotes);

  return (
    <div className='bg-post-bg pt-4 px-5 rounded-form-radius'>
      {isBox && (
        <div
          className='fixed z-[998] top-0 left-0 w-screen h-screen'
          onClick={handleSetIsBox}
        ></div>
      )}
      <div className='grid grid-cols-quote-card pb-4 border-b-[1px] border-placeholder gap-4'>
        <div
          className='w-full mt-3 h-[100px] large:h-[130px] bg-cover rounded-[2px]'
          style={{
            backgroundImage: `url(${thumbnail})`,
          }}
        ></div>
        <div className='grid grid-cols-1 grid-rows-[5%_95%] w-full h-full pr-8'>
          <div className='flex relative justify-end w-full left-4 mb-1'>
            {isBox && (
              <div className='relative top-4 right-8 z-[999]'>
                <div className='flex flex-col sm:right-[-50px] absolute bg-add-quote-bg rounded-form-radius gap-4 p-6 w-[200px]'>
                  <button
                    onClick={() => {
                      handleSetIsBox();
                      handleCurrentQuoteId(String(id));
                      handleFeedFormStatus('view-quote');
                    }}
                    className='flex w-full items-center text-white gap-2'
                  >
                    <EyeIcon />
                    <p>{t('view_quote')}</p>
                  </button>
                  <button
                    onClick={() => {
                      handleSetIsBox();
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
                      handleSetIsBox();
                    }}
                    className='flex w-full items-center text-white gap-2'
                  >
                    <TrashBinIcon />
                    <p>{t('delete_quote')}</p>
                  </button>
                </div>
              </div>
            )}
            <button onClick={handleSetIsBox} className='flex py-1 absolute'>
              <span className='w-[5px] h-[5px] mx-0.5 bg-white rounded-full'></span>
              <span className='w-[5px] h-[5px] mx-0.5 bg-white rounded-full'></span>
              <span className='w-[5px] h-[5px] mx-0.5 bg-white rounded-full'></span>
            </button>
          </div>
          <p className='flex pl-4 items-center text-placeholder max-h-[100px] text-xl'>
            <span className='line-clamp-3 break-all'>
              &quot;{quote[locale]}&quot;
            </span>
          </p>
        </div>
      </div>
      <div className='flex py-4 gap-6'>
        <div className='flex gap-2 text-white'>
          {commentsNumber}
          <CommentIcon />
        </div>
        <div className='flex gap-2 text-white'>
          {likesNumber}
          <HeartIcon hasLiked={false} />
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
