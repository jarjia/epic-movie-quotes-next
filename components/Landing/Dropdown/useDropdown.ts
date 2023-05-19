import { useState } from 'react';

const useNavbar = () => {
  const [shouldDropDown, setShouldDropDown] = useState<boolean>(false);

  const handleDropDown = () => {
    setShouldDropDown(!shouldDropDown);
  };

  return {
    shouldDropDown,
    handleDropDown,
  };
};

export default useNavbar;
