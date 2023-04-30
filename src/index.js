import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import "./i18n";
import * as serviceWorker from './serviceWorker';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastProvider } from 'react-toast-notifications';


ReactDOM.render(
  <ToastProvider placement='bottom-center'>
    <GoogleOAuthProvider clientId="84382277177-tk0ct3n22t6pcshpjjadnbohq97rv2hv.apps.googleusercontent.com">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </ToastProvider>
  , document.getElementById('root'));

serviceWorker.unregister();