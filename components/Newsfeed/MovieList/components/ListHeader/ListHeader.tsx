import { AddIcon, SearchbarIcon } from '@/components';
import useListHeader from './useListHeader';
import { MovieStructureTypes } from '@/types';
import { useState } from 'react';
import { useRouter } from 'next/router';

const ListHeader: React.FC<{ movies: MovieStructureTypes[] }> = (props) => {
  const { isSearch, handleIsSearch, handleFeedFormStatus } = useListHeader();
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleOnEnter = (e: any) => {
    e.preventDefault();
    router.push(`/movie-list?search=${search}`);
  };

  return (
    <div className='flex justify-between items-center'>
      <div>
        <h3 className='flex sm:flex-col text-2xl text-white'>
          <span className='pr-2'>My list of movies</span>
          <span className='sm:mt-2 sm:text-base'>
            (Total {props.movies?.length})
          </span>
        </h3>
      </div>
      <div className='flex items-center justify-center gap-6'>
        <div className='block sm:hidden'>
          {!isSearch ? (
            <button
              onClick={handleIsSearch}
              className='flex items-center gap-2'
            >
              <SearchbarIcon />
              <p className='text-input text-lg'>Search</p>
            </button>
          ) : (
            <div className='flex items-center gap-4 w-[300px]'>
              <button onClick={handleIsSearch} className='absolute'>
                <SearchbarIcon />
              </button>
              <form className='w-full' onSubmit={handleOnEnter}>
                <input
                  type='text'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className='w-full pl-8 caret-white text-white bg-transparent border-0 border-b-2 border-search-bar-border focus:ring-0 focus:border-search-bar-border'
                  placeholder='Search movies by their name'
                />
              </form>
            </div>
          )}
        </div>
        <button
          onClick={() => handleFeedFormStatus('add-movie')}
          className='flex items-center text-white p-2 rounded gap-2 bg-default-btn hover:bg-hover active:bg-active'
        >
          <AddIcon />
          Add movie
        </button>
      </div>
    </div>
  );
};

export default ListHeader;
