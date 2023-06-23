import { toast } from 'react-toastify';

const errorToast = (lang: Function, message: string, err: any) => {
  return toast.error(`${message} (${lang('code')}: ${err?.response?.status})`, {
    position: 'top-center',
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

export default errorToast;
