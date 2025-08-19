import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import store from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( // strict mode Helps identify potential problems in your app during development.
  <React.StrictMode>                   
    <Provider store={store}>     
    <App />
    </Provider>
  </React.StrictMode>
);
  //    <Provider store={store}>     It provides the store to all components inside it, enabling them to access the state and dispatch actions.



