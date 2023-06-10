import { SearchbarIcon } from '@/components';
import { AppContext } from '@/context';
import { useContext } from 'react';
import { useTranslation } from 'next-i18next';

const Searchbar = () => {
  const { isSearch, handleIsSearch } = useContext(AppContext);
  const { t } = useTranslation('newsFeed');

  return (
    <div className='flex sm:hidden items-center pl-2'>
      {!isSearch ? (
        <button onClick={handleIsSearch} className='flex items-center gap-4'>
          <SearchbarIcon />
          <p className='text-input text-xl'>{t('search_by')}</p>
        </button>
      ) : (
        <div className='flex items-center gap-4 w-full'>
          <button onClick={handleIsSearch} className='absolute'>
            <SearchbarIcon />
          </button>
          <input
            type='text'
            className='w-full pl-8 placeholder:text-sm pb-2 caret-white text-white bg-transparent border-0 border-b-2 border-search-bar-border focus:ring-0 focus:border-search-bar-border'
            placeholder={`${t('search_by_placeholder')}`}
          />
        </div>
      )}
    </div>
  );
};

export default Searchbar;
