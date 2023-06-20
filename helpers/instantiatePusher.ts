import { axios } from '@/services';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

export default function instantiatePusher() {
  window.Pusher = Pusher;

  window.Echo = new Echo({
    authEndpoint: `${process.env.NEXT_PUBLIC_API_BASE_URL}/broadcasting/auth`,
    broadcaster: 'pusher',
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    forceTLS: true,
    cluster: ['eu'],
    withCredentials: true,
    authorizer: (channel: { name: string }) => {
      return {
        authorize: (socketId: string, callback: Function) => {
          axios
            .post('/broadcasting/auth', {
              socket_id: socketId,
              channel_name: channel.name,
            })
            .then((response) => {
              callback(null, response.data);
            })
            .catch((error) => {
              callback(error);
            });
        },
      };
    },
  });

  return true;
}
