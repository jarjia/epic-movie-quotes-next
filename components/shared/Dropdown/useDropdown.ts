import { useRouter } from 'next/router';
import { useState } from 'react';

const useDropdown = () => {
  const [shouldDropDown, setShouldDropDown] = useState(false);
  const router = useRouter();

  return {
    shouldDropDown,
    setShouldDropDown,
    router,
  };
};

export default useDropdown;
