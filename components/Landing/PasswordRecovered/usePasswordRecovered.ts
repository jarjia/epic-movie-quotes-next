import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const usePasswordRecovered = () => {
  const { t } = useTranslation('landingForms');
  const router = useRouter();

  return {
    router,
    t,
  };
};

export default usePasswordRecovered;
