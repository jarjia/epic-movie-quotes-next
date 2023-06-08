import { useState } from 'react';

const useDropdown = () => {
  const [shouldDropDown, setShouldDropDown] = useState(false);

  const handleDropDown = () => {
    setShouldDropDown(!shouldDropDown);
  };

  return {
    shouldDropDown,
    handleDropDown,
  };
};

export default useDropdown;
