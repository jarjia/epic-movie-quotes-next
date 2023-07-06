import { CloseIcon, ValidIcon } from '@/components';
import { ChangeSuccess } from './types';
import { useTranslation } from 'next-i18next';

const ChangesSuccess: React.FC<ChangeSuccess> = ({ handleIsSuccess }) => {
  const { t } = useTranslation('profile');

  return (
    <div className='hidden sm:flex justify-center w-full'>
      <div className='flex justify-between p-4 absolute w-[90%] z-[999] bg-success-message-bg rounded'>
        <div>
          <div className='relative top-[2px]'>
            <ValidIcon />
          </div>
          <span className='pl-6'>{t('changed')}</span>
        </div>
        <button onClick={() => handleIsSuccess(false)}>
          <CloseIcon color={true} isSmall={false} />
        </button>
      </div>
    </div>
  );
};

export default ChangesSuccess;
