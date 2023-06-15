import { useContext } from 'react';
import { AppContext } from '@/context';
import { AddQuote, Searchbar } from '@/components';
import { NewsFeedControlPropTypes } from './types';

const NewsFeedControl: React.FC<NewsFeedControlPropTypes> = (props) => {
  const { isSearch } = useContext(AppContext);

  return (
    <div
      className='grid sm:block sm:w-full'
      style={{
        gridTemplateColumns: isSearch ? '0.7fr 1.3fr' : '1.5fr 0.5fr',
      }}
    >
      <AddQuote />
      <Searchbar handleRefetchPosts={props.handleRefetchPosts} />
    </div>
  );
};

export default NewsFeedControl;
