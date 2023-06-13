import { useAuthService } from '@/services';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { PostVerifyTypes } from './types';

const useMain = () => {
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const router = useRouter();
  const { postVerify } = useAuthService();

  useEffect(() => {
    setFormStatus(JSON.parse(sessionStorage.getItem('form-status') || 'null'));
  }, []);

  const handleFormStatus = useCallback(
    (status: string) => {
      sessionStorage.setItem('form-status', JSON.stringify(status));
      setFormStatus(status);
      (status === 'null' ||
        status === 'verified' ||
        status === 'recovered-password') &&
        router.push('/');
    },
    [router]
  );

  const handleLocale = useCallback(() => {
    let savedLocale = localStorage.getItem('locale') as string;
    if (savedLocale === 'ka') {
      const { pathname, asPath, query } = router;
      router.push({ pathname, query }, asPath, { locale: savedLocale });
    }
  }, [router]);

  const { mutate: registerUser } = useMutation(postVerify, {
    onSuccess: () => {
      handleFormStatus('verified');
    },
  });

  useEffect(() => {
    if (
      router.query.email !== undefined &&
      router.query.expires !== undefined
    ) {
      const expires = router.query.expires as string;
      const targetDate = new Date(expires);

      const interval = setInterval(() => {
        const currentTime = new Date();

        const elapsedMinutes = Math.floor(
          (currentTime.getTime() - targetDate.getTime()) / (1000 * 60)
        );

        if (elapsedMinutes >= 30) {
          clearInterval(interval);
          handleFormStatus('link-expired');
        } else {
          if (router.query.token !== undefined) {
            let email = router.query.email as string;
            let token = router.query.token as string;
            const data: PostVerifyTypes = {
              email,
              token,
            };
            registerUser(data);
            handleLocale();
          } else if (router.query.recover_token !== undefined) {
            handleFormStatus('recover-password');
            handleLocale();
          }
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [registerUser, router, handleFormStatus, handleLocale]);

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
