import { CloseIcon, ValidIcon } from '@/components';
import { ChangeSuccessTypes } from './types';

const ChangesSuccess: React.FC<ChangeSuccessTypes> = ({ handleIsSuccess }) => {
  return (
    <div className='hidden sm:flex justify-center w-full'>
      <div className='flex justify-between p-4 absolute w-[90%] z-[999] bg-success-message-bg rounded'>
        <div>
          <div className='relative top-[2px]'>
            <ValidIcon />
          </div>
          <span className='pl-6'>Changes updated succsessfully</span>
        </div>
        <button onClick={() => handleIsSuccess(false)}>
          <CloseIcon color={true} />
        </button>
      </div>
    </div>
  );
};

export default ChangesSuccess;
