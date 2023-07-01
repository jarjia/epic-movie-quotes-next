import { AppContext } from '@/context';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';

const useFeedSidebar = () => {
  const router = useRouter();
  const [dropDown, setDropdown] = useState(false);
  const dropDownRef = useRef<null | HTMLDivElement>(null);
  const btnRef = useRef<null | HTMLButtonElement>(null);
  const { userData, handleIsNotBurger, handleShouldLogout, isBurger } =
    useContext(AppContext);
  const { t } = useTranslation('common');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        btnRef.current &&
        !dropDownRef.current.contains(event.target as Node) &&
        !btnRef.current.contains(event.target as Node)
      ) {
        setDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return {
    btnRef,
    userData,
    handleShouldLogout,
    handleIsNotBurger,
    isBurger,
    t,
    dropDown,
    dropDownRef,
    router,
    setDropdown,
  };
};

export default useFeedSidebar;
