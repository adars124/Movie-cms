import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './satoshi.css';
import { Provider } from 'react-redux';
import store from './state';
import { Toaster } from 'react-hot-toast';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <App />
    </Provider>
  </React.StrictMode>
);
