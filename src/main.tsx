import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

declare global {
  interface Window {
    reactRoot?: ReactDOM.Root;
  }
}

const rootElement = document.getElementById('root')!;
if (!window.reactRoot) {
  window.reactRoot = ReactDOM.createRoot(rootElement);
}
window.reactRoot.render(<App />);
