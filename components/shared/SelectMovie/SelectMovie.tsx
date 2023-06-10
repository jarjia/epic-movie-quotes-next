import { useTranslation } from 'next-i18next';

const SelectMovie = () => {
  const { t } = useTranslation('newsFeed');

  return (
    <div className='mt-4'>
      <select className='text-white bg-black border-0 w-full sm:py-4'>
        <option value='' disabled selected>
          {t('choose_movie')}
        </option>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
      </select>
    </div>
  );
};

export default SelectMovie;
