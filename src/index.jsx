import './index.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import AppContainer from './AppContainer';
import CssBaseline from '@mui/material/CssBaseline';
import {PublicClientApplication} from "@azure/msal-browser";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { msalConfig } from './AuthConfig';
import reportWebVitals from './reportWebVitals';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline enableColorScheme />
        <AppContainer publicClientApp={msalInstance} />
      </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
