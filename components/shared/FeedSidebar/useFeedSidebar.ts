import { AppContext } from '@/context';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';

const useFeedSidebar = () => {
  const router = useRouter();
  const [dropDown, setDropdown] = useState(false);
  const { userData, handleIsNotBurger, handleShouldLogout, isBurger } =
    useContext(AppContext);
  const { t } = useTranslation('common');

  return {
    userData,
    handleShouldLogout,
    handleIsNotBurger,
    isBurger,
    t,
    dropDown,
    router,
    setDropdown,
  };
};

export default useFeedSidebar;
