import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import App from './App';

// ルート要素の取得
const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

// Reactアプリケーションのマウント
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);