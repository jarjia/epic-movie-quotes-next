import { AddIcon, SearchbarIcon } from '@/components';
import useListHeader from './useListHeader';
import { MovieStructureTypes } from '@/types';

const ListHeader: React.FC<{ movies: MovieStructureTypes[] }> = (props) => {
  const {
    isSearch,
    handleFeedFormStatus,
    search,
    handleOnEnter,
    setSearch,
    setIsSearch,
    t,
  } = useListHeader();

  return (
    <div className='flex justify-between items-center'>
      <div>
        <h3 className='flex sm:flex-col text-2xl text-white'>
          <span className='pr-2'>{t('title')}</span>
          <span className='sm:mt-2 sm:text-base'>
            ({t('total')} {props.movies?.length})
          </span>
        </h3>
      </div>
      <div className='flex items-center justify-center gap-6'>
        <div className='block sm:hidden'>
          {!isSearch ? (
            <button
              onClick={() => setIsSearch((prev) => !prev)}
              className='flex items-center gap-2'
            >
              <SearchbarIcon />
              <p className='text-input text-lg'>{t('search')}</p>
            </button>
          ) : (
            <div className='flex items-center gap-4 w-[300px]'>
              <button
                onClick={() => setIsSearch((prev) => !prev)}
                className='absolute'
              >
                <SearchbarIcon />
              </button>
              <form className='w-full'>
                <input
                  type='text'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleOnEnter}
                  className='w-full pl-8 caret-white text-white bg-transparent border-0 border-b-2 border-search-bar-border focus:ring-0 focus:border-search-bar-border'
                  placeholder={`${t('search_placeholder')}`}
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
          {t('add_movie')}
        </button>
      </div>
    </div>
  );
};

export default ListHeader;
