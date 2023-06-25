import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Session from './Session';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Session>
      <App />
    </Session>
  </React.StrictMode>
);