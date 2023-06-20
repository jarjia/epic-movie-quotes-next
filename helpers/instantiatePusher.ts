import { useNotificationService } from '@/services';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { useEffect } from 'react';
import { useMutation } from 'react-query';

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo;
  }
}

function useInstantiatePusher() {
  const { postBroadcasting } = useNotificationService();
  const broadcastingMutation = useMutation(postBroadcasting);

  useEffect(() => {
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
            let data = {
              socketId,
              channelName: channel.name,
            };
            broadcastingMutation
              .mutateAsync(data)
              .then((response: any) => {
                callback(null, response.data);
              })
              .catch((error: any) => {
                callback(error);
              });
          },
        };
      },
    });
  }, []);

  return true;
}

export default useInstantiatePusher;
