import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_API_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: 'ap2',
  useTLS: true,
});

export const pusherClient = new PusherClient('50574fc34cd8022a204b', {
  cluster: 'ap2',
});
