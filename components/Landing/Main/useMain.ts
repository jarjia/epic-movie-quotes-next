import { useEffect, useState } from 'react';

const useMain = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleToggleRegister = (toggle: boolean) => {
    setShowRegister(toggle);
    setShowLogin(false);
  };

  const handleToggleLogin = (toggle: boolean) => {
    setShowLogin(toggle);
    setShowRegister(false);
  };

  const handleCloseAll = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  useEffect(() => {
    if (showLogin || showRegister) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [showLogin, showRegister]);

  return {
    handleCloseAll,
    handleToggleLogin,
    handleToggleRegister,
    showLogin,
    showRegister,
  };
};

export default useMain;
