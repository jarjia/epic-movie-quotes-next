import { BackArrowIcon } from '@/components/icons';
import { AppContext } from '@/context';
import { ChangeEvent, KeyboardEvent, useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const MobileSearchbar = () => {
  const { handleIsSearch } = useContext(AppContext);
  const { t } = useTranslation('common');
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      let searchValue = encodeURIComponent(search);
      router.push(`/newsfeed?search=${searchValue}`);

      const onComplete = () => {
        router.events.off('routeChangeComplete', onComplete);
      };
      handleIsSearch();
      router.events.on('routeChangeComplete', onComplete);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className='absolute z-[99] sm:block hidden bg-mobile-search shadow-2xl w-screen top-0 left-0 h-[calc(100vh-15vh)]'>
      <div className='grid py-2 grid-cols-mobile-search-cols w-full'>
        <button
          className='flex items-center justify-center w-full h-full'
          onClick={handleIsSearch}
        >
          <BackArrowIcon isSearch={true} />
        </button>
        <div className='w-full'>
          <input
            type='text'
            value={search}
            onChange={handleOnChange}
            onKeyDown={handleOnEnter}
            placeholder={`${t('search_by')}`}
            className='placeholder-white placeholder:text-sm w-full text-white bg-transparent border-0 caret-white focus:ring-0 focus:border-transparent'
          />
        </div>
      </div>
      <div className='w-full bg-search-bar-border h-[1px]'></div>
      <div className='py-6 px-16 flex gap-3 flex-col text-white'>
        <p className='text-input'>{t('search_movies')}</p>
        <p className='text-input'>{t('search_quotes')}</p>
      </div>
    </div>
  );
};

export default MobileSearchbar;
