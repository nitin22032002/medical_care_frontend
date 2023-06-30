import React from 'react';
import ReactDOM from 'react-dom/client';
import UrlShortend from './component/Main/UrlShortend';
import reportWebVitals from './reportWebVitals';
import ContextRouter from './context/ContextRouter';
import { RouterProvider } from 'react-router-dom';
import router from './component/Main/routers';
import './component/css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ContextRouter>
        <UrlShortend />
    <RouterProvider router={router}/>
      </ContextRouter>
  </React.StrictMode>
);

reportWebVitals();
