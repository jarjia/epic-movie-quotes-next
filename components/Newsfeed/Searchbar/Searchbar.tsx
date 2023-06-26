import { SearchbarIcon } from '@/components';
import { AppContext } from '@/context';
import { ChangeEvent, KeyboardEvent, useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const Searchbar = () => {
  const { isSearch, handleIsSearch } = useContext(AppContext);
  const { t } = useTranslation('newsFeed');
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      let searchValue = encodeURIComponent(search);
      router.push(`/newsfeed?search=${searchValue}`);

      const onComplete = () => {
        router.events.off('routeChangeComplete', onComplete);
      };

      router.events.on('routeChangeComplete', onComplete);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

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
            value={search}
            onChange={handleOnChange}
            onKeyDown={handleOnEnter}
            className='w-full pl-8 text-sm pb-2 caret-white text-white bg-transparent border-0 border-b-2 border-search-bar-border focus:ring-0 focus:border-search-bar-border'
            placeholder={`${t('search_by_placeholder')}`}
          />
        </div>
      )}
    </div>
  );
};

export default Searchbar;
