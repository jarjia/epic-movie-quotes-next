import { useAuthService } from '@/services';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { PostVerifyTypes } from './types';
import { useTranslation } from 'next-i18next';

const useMain = () => {
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const router = useRouter();
  const [shouldGetRedirect, setShouldRedirect] = useState(true);
  const { postVerify } = useAuthService();
  const { t } = useTranslation('landing');

  useEffect(() => {
    setFormStatus(JSON.parse(sessionStorage.getItem('form-status') || 'null'));
    if (localStorage.getItem('remember_me') === null) {
      setShouldRedirect(false);
    } else {
      setShouldRedirect(true);
      router.push('/newsfeed');
    }
  }, [router]);

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
    shouldGetRedirect,
    formStatus,
    t,
  };
};

export default useMain;
