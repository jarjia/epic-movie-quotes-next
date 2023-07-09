import { SearchbarIcon } from '@/components';
import useSearchbar from './useSearchbar';
import { Search } from '@/types';

const Searchbar: React.FC<Search> = ({ search, handleChangeSearch }) => {
  const { isSearch, setIsSearch, t, handleOnEnter } = useSearchbar(search);

  return (
    <div className='flex sm:hidden items-center pl-2'>
      {!isSearch ? (
        <button
          onClick={() => setIsSearch((prev: boolean) => !prev)}
          className='flex items-center gap-4 mid:gap-2'
        >
          <SearchbarIcon />
          <p className='text-input text-xl mid:text-sm'>{t('search_by')}</p>
        </button>
      ) : (
        <div className='flex items-center gap-4 w-full'>
          <button
            onClick={() => setIsSearch((prev: boolean) => !prev)}
            className='absolute'
          >
            <SearchbarIcon />
          </button>
          <input
            type='text'
            value={search}
            onChange={handleChangeSearch}
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
