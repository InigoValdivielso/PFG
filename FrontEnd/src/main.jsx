// index.js o App.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <GoogleOAuthProvider clientId="148984854097-755k3hrbn4ui4tfge52h964qgne1s8oa.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  //</React.StrictMode>
);