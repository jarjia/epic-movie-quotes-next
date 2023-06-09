import { HandleFormStatusTypes } from '@/types';
import { useTranslation } from 'next-i18next';

const Title: React.FC<HandleFormStatusTypes> = ({ handleFormStatus }) => {
  const { t } = useTranslation('landing');

  return (
    <section>
      <div className='flex flex-col justify-center items-center h-[calc(100vh-100px)]'>
        <div className='flex justify-center'>
          <h1 className='text-title text-h1 font-bold w-[70%] text-center tracking-[1px] sm:text-2xl'>
            {t('landing_slogan')}
          </h1>
        </div>
        <div className='mt-4'>
          <button
            onClick={() => handleFormStatus('register')}
            className='text-white capitalize rounded px-6 py-[8px] bg-default-btn hover:bg-hover active:bg-active'
          >
            {t('get_started')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Title;
