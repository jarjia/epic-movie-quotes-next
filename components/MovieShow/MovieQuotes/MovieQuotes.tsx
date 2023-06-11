import { AddIcon, QuoteCard } from '@/components';
import { useTranslation } from 'next-i18next';
import { MovieQuotesTypes } from './types';
import { useContext } from 'react';
import { AppContext } from '@/context';

const MovieQuotes: React.FC<MovieQuotesTypes> = (props) => {
  const { t } = useTranslation('movieList');
  const { handleFeedFormStatus } = useContext(AppContext);

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
          <p className='text-2xl text-white'>
            {t('total_quotes')} ({t('total')} 7)
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
          <QuoteCard />
          <QuoteCard />
        </div>
      </div>
    </div>
  );
};

export default MovieQuotes;
