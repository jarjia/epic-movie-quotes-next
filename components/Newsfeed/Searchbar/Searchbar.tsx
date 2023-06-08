import { SearchbarIcon } from '@/components';
import { AppContext } from '@/context';
import { useContext } from 'react';

const Searchbar = () => {
  const { isSearch, handleIsSearch } = useContext(AppContext);

  return (
    <div className='flex sm:hidden items-center pl-2'>
      {!isSearch ? (
        <button onClick={handleIsSearch} className='flex items-center gap-4'>
          <SearchbarIcon />
          <p className='text-input text-xl'>Search by</p>
        </button>
      ) : (
        <div className='flex items-center gap-4 w-full'>
          <button onClick={handleIsSearch} className='absolute'>
            <SearchbarIcon />
          </button>
          <input
            type='text'
            className='w-full pl-8 pb-2 caret-white text-white bg-transparent border-0 border-b-2 border-search-bar-border focus:ring-0 focus:border-search-bar-border'
            placeholder='Enter @ to search movies, Enter # to search quotes '
          />
        </div>
      )}
    </div>
  );
};

export default Searchbar;
