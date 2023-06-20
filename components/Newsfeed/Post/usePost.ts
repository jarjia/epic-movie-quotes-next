import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const usePost = () => {
  const { t } = useTranslation('newsFeed');
  const router = useRouter();
  let locale = router.locale as string;

  return {
    locale,
    t,
  };
};

export default usePost;
