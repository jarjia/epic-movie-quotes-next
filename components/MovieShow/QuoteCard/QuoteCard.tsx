import {
  CommentIcon,
  EyeIcon,
  HeartIcon,
  PenIcon,
  TrashBinIcon,
} from '@/components';
import useQuoteCard from './useQuoteCard';

const QuoteCard = () => {
  const { isBox, handleSetIsBox, t } = useQuoteCard();

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
            backgroundImage:
              'url(https://i2-prod.chroniclelive.co.uk/incoming/article20915599.ece/ALTERNATES/s615b/0_BILLY-ELLIOT.jpg)',
          }}
        ></div>
        <div className='flex flex-col justify-center items-center w-full h-full pr-8'>
          <div className='flex justify-end w-full relative left-4 mb-1'>
            {isBox && (
              <div className='relative top-4 right-8 z-[999]'>
                <div className='flex flex-col absolute bg-add-quote-bg rounded-form-radius gap-4 p-6 w-[200px]'>
                  <button className='flex w-full items-center text-white gap-2'>
                    <EyeIcon />
                    <p>{t('view_quote')}</p>
                  </button>
                  <button className='flex w-full items-center text-white gap-2'>
                    <PenIcon />
                    <p>{t('edit_quote')}</p>
                  </button>
                  <button className='flex w-full items-center text-white gap-2'>
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
          <p className='flex mt-2 items-center text-placeholder max-h-[100px] text-xl'>
            <span className='line-clamp-3 break-all'>
              &quot;You dont understand! I coulda had class. I coulda been a
              contender. I couldve been somebody,&quot;
            </span>
          </p>
        </div>
      </div>
      <div className='flex py-4 gap-6'>
        <button className='flex gap-2 text-white'>
          7
          <CommentIcon />
        </button>
        <button className='flex gap-2 text-white'>
          10
          <HeartIcon />
        </button>
      </div>
    </div>
  );
};

export default QuoteCard;
