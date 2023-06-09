import { useRouter } from 'next/router';
import { useState } from 'react';

const useDropdown = () => {
  const [shouldDropDown, setShouldDropDown] = useState(false);
  const router = useRouter();

  const handleDropDown = () => {
    setShouldDropDown(!shouldDropDown);
  };

  return {
    shouldDropDown,
    handleDropDown,
    router,
  };
};

export default useDropdown;
