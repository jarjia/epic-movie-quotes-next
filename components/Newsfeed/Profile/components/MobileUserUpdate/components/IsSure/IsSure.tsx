import classes from '@/styles/Landing.module.css';

const IsSure = ({
  handleIsSure,
}: {
  handleIsSure: (bool: boolean) => void;
}) => {
  return (
    <div className='w-full flex items-center justify-center'>
      <div
        className={`${classes['is-sure']} flex flex-col pt-12 w-5/6 items-center justify-center mt-16 rounded-xl`}
      >
        <div className='w-full text-center pb-12 border-b-[1px] border-search-bar-border'>
          <p className='text-white'>Are you sure to make changes ?</p>
        </div>
        <div className='flex justify-between w-full px-8 py-6'>
          <button
            onClick={() => handleIsSure(false)}
            type='button'
            className='text-input'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='text-white rounded px-4 py-1.5 text-primary-font bg-default-btn hover:bg-hover active:bg-active'
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default IsSure;
