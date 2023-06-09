import axios from 'axios';

let locale;
if (typeof window !== 'undefined') {
  locale =
    localStorage.getItem('locale') === null
      ? 'en'
      : localStorage.getItem('locale');
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  params: { locale },
});

instance.defaults.withCredentials = true;

export default instance;
