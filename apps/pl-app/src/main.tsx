import React from 'react';
import ReactDOM from 'react-dom/client';
import { RoutesApp } from './router/RoutesApp.tsx';
import { APIClientProvider } from './shared/api/APIClinetContext.tsx';
import './index.css';
// eslint-disable-next-line import/order
import { initMSW } from '../tests/msw/browser.ts';

// eslint-disable-next-line turbo/no-undeclared-env-vars
if (import.meta.env.DEV) {
  console.log('MSW使用開始');
  await initMSW();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <APIClientProvider>
      <RoutesApp />
    </APIClientProvider>
  </React.StrictMode>,
);
