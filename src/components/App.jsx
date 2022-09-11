import '../index.css';

import { Box, CircularProgress } from '@mui/material';
import React, { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import { editInvestigatorRoute, homeRoute, logoutRoute, newInvestigatorRoute, selectInvestigatorRoute, signupRoute, viewInvestigatorRoute } from '../Routes';

import ErrorBoundary from './ErrorBoundary';
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { LandingPage } from '../pages/LandingPage';
import Logout from '../pages/Logout';
import { MsalProvider } from '@azure/msal-react';
import { NavClient } from '../util/NavClient';
import { PageLayout } from './PageLayout';
import { SignupPage } from '../pages/SignupPage';
import { apiRequest } from "../AuthConfig";
import axios from 'axios';
import { msalInstance } from '../index'

function App({ publicClientApp }) {

    configureAxiosAuthInterception();

    return (
        <MsalProvider instance={publicClientApp}>
            <Router>
                <PageLayout>
                    <ErrorBoundary>
                        <Pages publicClientApp={publicClientApp} />
                    </ErrorBoundary>
                </PageLayout>
            </Router>
        </MsalProvider>
    );
}

function Pages({ publicClientApp }) {

    const navigate = useNavigate();
    const navClient = new NavClient(navigate);
    publicClientApp.setNavigationClient(navClient);

    const GameApp = lazy(() => import('../pages/InvestigatorPage'));
    const ChooseInvestigator = lazy(() => import('../pages/SelectInvestigator'));
    const NewInvestigatorForm = lazy(() => import('../pages/EntryForm'));
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
                <Route exact path={logoutRoute} element={<Logout />} />
                <Route exact path={editInvestigatorRoute} element={<NewInvestigatorForm />} />
            </Routes>
        </Suspense>
    );
}

function configureAxiosAuthInterception() {
    axios.interceptors.request.use(config => new Promise((resolve, reject) => {

        msalInstance.acquireTokenSilent({
            ...apiRequest,
            account: msalInstance.getAllAccounts()[0]
        }).then(result => {
            console.log("Token acquired silently...");
            // axios.defaults.headers.common['Authorization'] = `Bearer ${result.accessToken}`;
            config.headers.common['Authorization'] = `Bearer ${result.accessToken}`;
            resolve(config);
        }).catch(ex => {
            if (ex instanceof InteractionRequiredAuthError) {
                console.log("Interaction required for token...");
                msalInstance.acquireTokenPopup(apiRequest).then(result => {
                    config.headers.common['Authorization'] = `Bearer ${result.accessToken}`;
                    resolve(config);
                }).catch(ex => {
                    console.error(ex);
                    reject();
                });
            } else {
                console.error(ex);
                reject();
            }
        });
    }));
}

export default App;
