import React from 'react';
import ReactDOM from 'react-dom/client';
import { RoutesApp } from './router/RoutesApp.tsx';
import { APIClientProvider } from './shared/api/APIClinetContext.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <APIClientProvider>
      <RoutesApp />
    </APIClientProvider>
  </React.StrictMode>,
);
