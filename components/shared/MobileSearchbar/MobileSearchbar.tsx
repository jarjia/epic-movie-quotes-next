import { BackArrowIcon } from '@/components/icons';
import useMobileSearchbar from './useMobileSearchbar';

const MobileSearchbar = () => {
  const { handleOnEnter, handleIsSearch, setSearch, search, t } =
    useMobileSearchbar();

  return (
    <div className='absolute z-[99] sm:block hidden bg-mobile-search shadow-2xl w-screen top-0 left-0 sm:h-screen h-[calc(100vh-15vh)]'>
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
            onChange={(e) => setSearch(e.target.value)}
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
