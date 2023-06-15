import { AddIcon, QuoteCard } from '@/components';
import { MovieQuotesTypes } from './types';
import useMovieQuotes from './useMovieQuotes';

const MovieQuotes: React.FC<MovieQuotesTypes> = (props) => {
  const { t, handleFeedFormStatus } = useMovieQuotes();

  return (
    <div className='flex flex-col'>
      <div
        className='w-full sm:hidden block h-[350px] large:h-[400px] bg-cover rounded-xl'
        style={{
          backgroundImage: `url(${props.movieImage})`,
        }}
      ></div>
      <div>
        <div className='flex items-center mt-6 gap-2'>
          <p className='flex text-2xl text-white'>
            <span className='pr-1'>{t('total_quotes')}</span>(
            <span className='pl-1 block sm:hidden'>{t('total')}</span>
            <span className='pl-2 pr-1 sm:pl-1'>{props.quotes.length}</span>)
          </p>
          <span className='bg-placeholder h-[25px] w-[1px] mx-2'></span>
          <button
            onClick={() => handleFeedFormStatus('add-quote-movie')}
            className='flex items-center text-white p-2 rounded gap-2 bg-default-btn hover:bg-hover active:bg-active'
          >
            <AddIcon />
            {t('add_quote')}
          </button>
        </div>
        <div className='flex flex-col gap-8 mt-8'>
          {props.quotes.map((quote) => {
            return (
              <QuoteCard
                handleRefecthQuotes={props.handleRefecthQuotes}
                key={quote.id}
                id={quote.id}
                thumbnail={quote.thumbnail}
                quote={quote.quote}
                commentsNumber={quote.comments.length}
                likesNumber={quote.likes.length}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieQuotes;
