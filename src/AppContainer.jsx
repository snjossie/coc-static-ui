import './index.css';

import { Box, CircularProgress } from '@mui/material';
import React, { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import { homeRoute, newInvestigatorRoute, selectInvestigatorRoute, signupRoute, viewInvestigatorRoute } from './Routes';

import ErrorBoundary from './ErrorBoundary';
import { LandingPage } from './LandingPage';
import { MsalProvider } from '@azure/msal-react';
import { NavClient } from './util/NavClient';
import { PageLayout } from './PageLayout';
import { SignupPage } from './SignupPage';

function App({ publicClientApp }) {

    return (
        <MsalProvider instance={publicClientApp}>
            <PageLayout>
                <Router>
                    <ErrorBoundary>
                        <Pages publicClientApp={publicClientApp} />
                    </ErrorBoundary>
                </Router>
            </PageLayout>
        </MsalProvider>
    );
}

function Pages({ publicClientApp }) {

    const navigate = useNavigate();
    const navClient = new NavClient(navigate);
    publicClientApp.setNavigationClient(navClient);

    const GameApp = lazy(() => import('./InvestigatorPage'));
    const ChooseInvestigator = lazy(() => import('./SelectInvestigator'));
    const NewInvestigatorForm = lazy(() => import('./EntryForm'));
    const Landing = <LandingPage />;
    const Signup = <SignupPage />;

    return (
        <Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh"><CircularProgress /></Box>}>
            <Routes>
                <Route exact path={signupRoute} element={Signup} />
                <Route exact path={homeRoute} element={Landing} />
                <Route exact path={selectInvestigatorRoute} element={<ChooseInvestigator />} />
                <Route exact path={viewInvestigatorRoute} element={<GameApp />} />
                <Route exact path={newInvestigatorRoute} element={<NewInvestigatorForm />} />
                {/* <Route exact path="/investigator/:id/edit" element={<EditInvesigatorForm />} /> */}
            </Routes>
        </Suspense>
    );
}

export default App;