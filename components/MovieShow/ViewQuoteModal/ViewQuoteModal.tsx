import { PostController } from '@/components';
import { ViewQuoteModal } from './types';
import useViewQuoteModal from './useViewQuoteModal';

const ViewQuoteModal: React.FC<ViewQuoteModal> = ({ quoteId }) => {
  const { quote, isLoading, isSuccess } = useViewQuoteModal(quoteId);

  if (isLoading || !isSuccess) {
    return (
      <div className='flex flex-col items-center gap-2 my-16 justify-center'>
        <h1 className='text-white text-3xl'>Loading...</h1>
      </div>
    );
  }

  return (
    <div className='text-white my-4'>
      <div className='flex flex-col gap-2 mb-4'>
        <div className='flex border-[1px] border-placeholder rounded justify-between p-2'>
          <p className='break-all pr-1 italic'>{quote.quote?.en}</p>
          <span className='text-placeholder'>Eng</span>
        </div>
        <div className='flex border-[1px] border-placeholder rounded justify-between p-2'>
          <p className='break-all pr-1 italic'>{quote.quote?.ka}</p>
          <span className='text-placeholder'>ქარ</span>
        </div>
      </div>
      <div
        className='w-full bg-horizon-center h-[400px] sm:h-[250px] bg-cover bg-white rounded-form-radius'
        style={{
          backgroundImage: `url(${quote.thumbnail})`,
        }}
      ></div>
      {quote.likes !== undefined && (
        <PostController data={quote} userId={quote.user_id} />
      )}
    </div>
  );
};

export default ViewQuoteModal;
