// @ts-nocheck
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import { theme } from './theme.js';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './utils/store.js';
import { SnackbarProvider } from './common/snackbar/SnackbarContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SnackbarProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </SnackbarProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
