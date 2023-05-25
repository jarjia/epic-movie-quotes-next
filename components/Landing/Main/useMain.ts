import { postVerify } from '@/services';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { PostVerifyTypes } from './types';

const useMain = () => {
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setFormStatus(JSON.parse(sessionStorage.getItem('form-status') || 'null'));
  }, []);

  const handleFormStatus = useCallback(
    (status: string) => {
      console.log(status);
      sessionStorage.setItem('form-status', JSON.stringify(status));
      setFormStatus(status);
      (status === 'null' ||
        status === 'verified' ||
        status === 'recovered-password') &&
        router.push('/');
    },
    [router]
  );

  const { mutate: registerUser } = useMutation(postVerify, {
    onSuccess: () => {
      handleFormStatus('verified');
    },
  });

  useEffect(() => {
    if (
      router.query.email !== undefined &&
      router.query.token !== undefined &&
      router.query.expires !== undefined
    ) {
      const expires = router.query.expires as string;
      const targetDate = new Date(expires);
      const data: PostVerifyTypes = {
        email: router.query.email,
        token: router.query.token,
      };

      const interval = setInterval(() => {
        const currentTime = new Date();
        const elapsedMinutes = Math.floor(
          (currentTime.getTime() - targetDate.getTime()) / (1000 * 60)
        );

        if (elapsedMinutes >= 30) {
          clearInterval(interval);
          handleFormStatus('link-expired');
        } else {
          registerUser(data);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [registerUser, router, handleFormStatus]);

  useEffect(() => {
    if (
      router.query.email !== undefined &&
      router.query.recover_token !== undefined &&
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
          handleFormStatus('recover-password');
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [handleFormStatus, router]);

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
