import { CloseIcon } from '@/components';
import { FormLayoutTypes } from './types';
import { useContext } from 'react';
import { AppContext } from '@/context';
import { useAuthService } from '@/services';
import { useQuery } from 'react-query';

const FormLayout: React.FC<FormLayoutTypes> = ({
  handleFormStatus,
  children,
}) => {
  const { handleFeedFormStatus } = useContext(AppContext);
  const { getCrsfToken } = useAuthService();
  useQuery('csrf-token', getCrsfToken);

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
        className='w-[35%] mid:w-1/2 large:w-[25%] h-auto sm:w-full sm:h-full sm:rounded-none rounded-form-radius bg-form-back sm:px-10 px-14 py-8'
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
        <div className='h-full overflow-y-scroll scrollbar'>{children}</div>
      </div>
    </div>
  );
};

export default FormLayout;
