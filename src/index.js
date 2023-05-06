import React from 'react';
import ReactDOM from 'react-dom/client';
//Style
import './index.css';
//Component
import App from './App';
//Test
import reportWebVitals from './reportWebVitals';
//Router
import { BrowserRouter } from 'react-router-dom';
//Context
import { NewsProvider } from './context/NewsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NewsProvider>
        <App />
      </NewsProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
