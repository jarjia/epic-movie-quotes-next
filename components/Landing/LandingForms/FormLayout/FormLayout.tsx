import { CloseIcon } from '@/components';
import { FormLayoutTypes } from './types';

const FormLayout: React.FC<FormLayoutTypes> = (props) => {
  return (
    <div className='flex justify-center items-center fixed z-[99] backdrop-blur-landing-blur w-screen h-screen'>
      <div className='w-[35%] large:w-[25%] h-auto sm:w-full sm:h-full rounded-form-radius bg-form-back sm:px-10 px-14 py-8'>
        <div className='float-right relative bottom-5 left-5 sm:left-2'>
          <div
            onClick={() => props.handleFormStatus('null')}
            className='absolute rotate-45 cursor-pointer'
          >
            <CloseIcon />
          </div>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default FormLayout;
