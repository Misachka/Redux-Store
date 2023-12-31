import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If user wants your app to work offline and load faster, user can change unregister() to register() below
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
