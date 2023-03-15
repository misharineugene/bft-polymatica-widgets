import React from 'react';
import ReactDOM from 'react-dom/client';
//
import App from './components/App';
//
import './assets/scss/index.scss';
//
import './locale';

const root = ReactDOM.createRoot(
  document.querySelector('[data-target="editor"]') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
