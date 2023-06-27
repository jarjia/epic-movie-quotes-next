import { AddQuoteIcon } from '@/components';
import { useContext } from 'react';
import { AppContext } from '@/context';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const AddQuote = () => {
  const router = useRouter();
  const { handleFeedFormStatus } = useContext(AppContext);
  const { t } = useTranslation('newsFeed');

  return (
    <button
      onClick={() => handleFeedFormStatus('add-quote')}
      className='flex items-center sm:w-full sm:bg-transparent p-2 px-4 gap-4 rounded-form-radius bg-add-quote-bg'
    >
      <AddQuoteIcon />
      <p
        className={`text-white ${
          router.locale === 'ka' ? 'text-lg' : 'text-xl'
        } mid:text-lg`}
      >
        {t('write_quote')}
      </p>
    </button>
  );
};

export default AddQuote;
