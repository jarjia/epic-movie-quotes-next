import { useAuthService } from '@/services';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { PostVerifyTypes } from './types';
import { useTranslation } from 'next-i18next';

const useMain = () => {
  const { getUserData } = useAuthService();
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const router = useRouter();
  const [shouldGetUser, setShouldGetUser] = useState(true);
  const { postVerify } = useAuthService();
  useQuery('user', getUserData, {
    onSuccess(res) {
      if (res?.data?.remember_token !== null) {
        router.push('/newsfeed');
      }
    },
    onSettled() {
      setShouldGetUser(false);
    },
    enabled: shouldGetUser,
  });
  const { t } = useTranslation('landing');

  useEffect(() => {
    setFormStatus(JSON.parse(sessionStorage.getItem('form-status') || 'null'));
  }, []);

  useEffect(() => {
    localStorage.setItem('locale', router.locale as string);
  }, [router.locale]);

  const handleFormStatus = useCallback(
    (status: string) => {
      sessionStorage.setItem('form-status', JSON.stringify(status));
      setFormStatus(status);
      (status === 'null' ||
        status === 'verified' ||
        status === 'recovered-password') &&
        router.push('/', undefined, { scroll: false });
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

  const handleClearRoute = () => {
    const { query } = router;
    router.push('/', undefined, {
      locale: query.locale as string,
    });
  };

  const {
    mutate: registerUser,
    isError,
    isSuccess,
  } = useMutation(postVerify, {
    onSuccess: () => {
      handleFormStatus('verified');
    },
    onError(err: any) {
      if (err.response.status === 401) {
        handleClearRoute();
        handleFormStatus('link-expired');
      }
    },
  });

  useEffect(() => {
    if (
      router.query.email !== undefined &&
      router.query.expires !== undefined
    ) {
      const expires = router.query.expires as string;
      if (router.query.token !== undefined) {
        let email = router.query.email as string;
        let token = router.query.token as string;
        const data: PostVerifyTypes = {
          email,
          token,
          expires,
        };

        handleClearRoute();
        registerUser(data);
      } else if (router.query.recover_token !== undefined) {
        const expiresAt = new Date(expires);
        const cur = new Date();
        if (cur > expiresAt) {
          handleClearRoute();
          handleFormStatus('link-expired');
        } else {
          handleFormStatus('recover-password');
        }
      }
    }
  }, [
    registerUser,
    router,
    handleFormStatus,
    isSuccess,
    isError,
    handleLocale,
  ]);

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
    t,
  };
};

export default useMain;
