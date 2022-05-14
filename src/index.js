import './index.css';

import { Box, CircularProgress } from '@mui/material';
import React, { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import { ReactComponent as AppIcon } from './img/eldersign.svg'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import ErrorBoundary from './ErrorBoundary';
import ReactDOM from 'react-dom/client';
import SvgIcon from '@mui/material/SvgIcon';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import reportWebVitals from './reportWebVitals';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

const GameApp = lazy(() => import('./App'));
const ChooseInvestigator = lazy(() => import('./SelectInvestigator'));
const NewInvestigatorForm = lazy(() => import('./EntryForm'));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />

      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters variant="dense">
            <SvgIcon component={AppIcon} inheritViewBox />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                flexGrow: 1,
                display: { xs: 'none', sm: 'block' },
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              Call of Cthulhu
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Router>
        <ErrorBoundary>
          <Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh"><CircularProgress /></Box>}>
            <Routes>
              <Route exact path="/" element={<ChooseInvestigator />} />
              <Route exact path="/investigator/:id" element={<GameApp />} />
              <Route exact path="/new" element={<NewInvestigatorForm />} />
              {/* <Route exact path="/investigator/:id/edit" element={<EditInvesigatorForm />} /> */}
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>

    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
