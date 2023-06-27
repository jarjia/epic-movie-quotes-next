import { CloseIcon } from '@/components';
import { FormLayoutTypes } from './types';
import useFormLayout from './useFormLayout';

const FormLayout: React.FC<FormLayoutTypes> = ({
  handleFormStatus,
  children,
}) => {
  const { handleFeedFormStatus } = useFormLayout();

  return (
    <div
      onClick={() => {
        handleFormStatus('null');
        handleFeedFormStatus('');
      }}
      className={`${
        children.type === 'section' ? 'hidden' : 'flex'
      } justify-center drop-shadow-none items-center fixed z-[99] backdrop-blur-landing-blur w-screen h-screen`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='w-[35%] overflow-y-scroll scrollbar mid:w-1/2 large:w-[25%] h-auto sm:w-full sm:h-full sm:rounded-none rounded-form-radius bg-form-back sm:px-10 px-14 py-8'
      >
        <div className='float-right relative bottom-5 left-5 sm:left-2'>
          <div
            onClick={() => {
              handleFormStatus('null');
              handleFeedFormStatus('');
            }}
            className='absolute cursor-pointer'
          >
            <CloseIcon color={false} isSmall={false} />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default FormLayout;
