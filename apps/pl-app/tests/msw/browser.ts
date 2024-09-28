// eslint-disable-next-line import/no-extraneous-dependencies
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const initMSW = async () => {
  if (globalThis.location.host.includes('localhost')) {
    const worker = setupWorker(...handlers);
    await worker.start({
      serviceWorker: {
        url: `/mockServiceWorker.js`,
      },
      onUnhandledRequest: 'bypass',
    });
  }
};
