import { useEffect, useState } from 'react';

const useMain = () => {
  const [formStatus, setFormStatus] = useState<string | null>(null);

  useEffect(() => {
    setFormStatus(JSON.parse(sessionStorage.getItem('form-status') || 'null'));
  }, []);

  const handleFormStatus = (status: string) => {
    sessionStorage.setItem('form-status', JSON.stringify(status));
    setFormStatus(status);
  };

  useEffect(() => {
    if (
      formStatus === 'null' ||
      formStatus === null ||
      formStatus === undefined
    ) {
      document.body.classList.remove('no-scroll');
    } else {
      document.body.classList.add('no-scroll');
    }
  }, [formStatus]);

  return {
    handleFormStatus,
    formStatus,
  };
};

export default useMain;
