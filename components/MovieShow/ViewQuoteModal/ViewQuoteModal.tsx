import { CommentIcon, HeartIcon } from '@/components';
import { ViewQuoteModalTypes } from './types';
import useViewQuoteModal from './useViewQuoteModal';

const ViewQuoteModal: React.FC<ViewQuoteModalTypes> = ({ quoteId }) => {
  const {
    quote,
    isLoading,
    handleHideComments,
    handleShowMore,
    handleOpenComments,
    openComments,
    searchRef,
    likeMutate,
    hasLiked,
    t,
    isSuccess,
    handleSubmit,
  } = useViewQuoteModal(quoteId);

  if (isLoading || !isSuccess) {
    return null;
  }

  return (
    <div className='text-white my-4'>
      <div className='flex flex-col gap-2 mb-4'>
        <div className='flex border-[1px] border-placeholder rounded justify-between p-2'>
          <p className='break-all pr-1'>{quote.quote?.en}</p>
          <span className='text-placeholder'>Eng</span>
        </div>
        <div className='flex border-[1px] border-placeholder rounded justify-between p-2'>
          <p className='break-all pr-1'>{quote.quote?.ka}</p>
          <span className='text-placeholder'>ქარ</span>
        </div>
      </div>
      <div>
        <div
          className='w-full h-[400px] sm:h-[250px] bg-cover bg-white rounded-form-radius'
          style={{
            backgroundImage: `url(${quote.thumbnail})`,
          }}
        ></div>
        <div className='flex py-4 gap-6'>
          <button onClick={handleOpenComments} className='flex gap-2'>
            {quote.comments?.length}
            <CommentIcon />
          </button>
          <button onClick={() => likeMutate(quote.id)} className='flex gap-2'>
            {quote.likes?.length}
            <HeartIcon hasLiked={hasLiked} />
          </button>
        </div>
        <div className='w-full h-[1px] bg-search-bar-border'></div>
      </div>
      {openComments > 0 && (
        <div className='py-4'>
          {quote.comments.length === 0 ? (
            <p className='text-center'>{t('no_comments')}</p>
          ) : (
            [...quote.comments]
              .reverse()
              .slice(0, openComments)
              .map((comment) => {
                return (
                  <div key={comment.id}>
                    <div className='flex items-center'>
                      <div
                        className='w-profile h-profile rounded-full bg-center bg-cover'
                        style={{
                          backgroundImage: `url(${comment.user.thumbnail})`,
                        }}
                      ></div>
                      <p className='pl-4 break-words'>{comment.user.name}</p>
                    </div>
                    <div className='pl-[74px] sm:pl-0 sm:pt-2'>
                      <p className='text-base break-words pb-3 border-b-[1px] border-search-bar-border'>
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                );
              })
          )}
          {quote.comments.length !== 0 && (
            <div className='flex justify-between items-center'>
              {openComments >= quote.comments.length ? null : (
                <button
                  onClick={handleShowMore}
                  className='pl-[74px] mt-2 text-white underline text-md'
                >
                  {t('show_more')}
                </button>
              )}
              <button
                onClick={handleHideComments}
                className='pl-[74px] mt-2 text-placeholder underline text-md'
              >
                {t('hide')}
              </button>
            </div>
          )}
        </div>
      )}
      <div className='flex items-center mt-2'>
        <div>
          <div
            className='w-profile h-profile rounded-full bg-center bg-cover'
            style={{ backgroundImage: 'url(/assets/images/user.png)' }}
          ></div>
        </div>
        <form className='w-full ml-3' onSubmit={handleSubmit}>
          <input
            ref={searchRef}
            type='text'
            className='w-full rounded-form-radius pl-4 placeholder-input pb-2 caret-white text-white border-0 bg-add-quote-bg focus:ring-0 focus:border-transparent'
            placeholder={`${t('comment_placeholder')}`}
          />
        </form>
      </div>
    </div>
  );
};

export default ViewQuoteModal;
