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
      sessionStorage.setItem('form-status', JSON.stringify(status));
      setFormStatus(status);
      JSON.parse(sessionStorage.getItem('form-status') || 'null') === 'null' &&
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
    if (router.query.email !== undefined && router.query.token !== undefined) {
      const data: PostVerifyTypes = {
        email: router.query.email,
        token: router.query.token,
      };
      registerUser(data);
    }
  }, [registerUser, router]);

  useEffect(() => {
    if (
      router.query.email !== undefined &&
      router.query.recover_token !== undefined
    ) {
      handleFormStatus('recover-password');
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
