import { AddIcon, QuoteCard } from '@/components';
import { MovieQuotes } from './types';
import useMovieQuotes from './useMovieQuotes';

const MovieQuotes: React.FC<MovieQuotes> = (props) => {
  const { t, handleFeedFormStatus } = useMovieQuotes();

  return (
    <div className='flex flex-col'>
      <div
        className='w-full bg-cover bg-horizon-center sm:hidden block h-[350px] large:h-[400px] rounded-xl'
        style={{
          backgroundImage: `url(${props.movieImage})`,
        }}
      ></div>
      <div className='flex items-center'>
        <button
          onClick={() => handleFeedFormStatus('add-quote-movie')}
          className='sm:flex px-1 hidden justify-center items-center text-white w-add-btn-w h-add-btn-h rounded gap-2 bg-default-btn hover:bg-hover active:bg-active'
        >
          <AddIcon />
          {t('add_quote')}
        </button>
      </div>
      <div className='bg-placeholder sm:block hidden w-full h-[1px] mt-6'></div>
      <div>
        <div className='flex items-center mt-6 gap-2'>
          <div className='flex text-2xl text-white'>
            <div className='pr-1'>
              <span className='sm:hidden block'>{t('total_quotes')}</span>
              <span className='sm:block hidden'>
                {t('mobile_total_quotes')}
              </span>
            </div>
            (<span className='pl-1 block sm:hidden'>{t('total')}</span>
            <span className='pl-2 pr-1 sm:pl-1'>{props.quotes.length}</span>)
          </div>
          <span className='bg-placeholder sm:hidden block h-[25px] w-[1px] mx-2'></span>
          <button
            onClick={() => handleFeedFormStatus('add-quote-movie')}
            className='sm:hidden flex justify-center items-center text-white w-add-btn-w h-add-btn-h rounded gap-2 bg-default-btn hover:bg-hover active:bg-active'
          >
            <AddIcon />
            {t('add_quote')}
          </button>
        </div>
        <div className='flex flex-col gap-8 mt-8'>
          {props.quotes.map((quote) => {
            let likeIds = quote.likes.map((item) => item.id);
            return (
              <QuoteCard
                key={quote.id}
                id={quote.id}
                thumbnail={quote.thumbnail}
                quote={quote.quote}
                comments={quote.comments}
                likes={likeIds}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieQuotes;
