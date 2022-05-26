import './index.css';

import { Box, CircularProgress } from '@mui/material';
import React, { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import { homeRoute, newInvestigatorRoute, selectInvestigatorRoute, signupRoute, viewInvestigatorRoute } from './Routes';

import ErrorBoundary from './ErrorBoundary';
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { LandingPage } from './LandingPage';
import { MsalProvider } from '@azure/msal-react';
import { NavClient } from './util/NavClient';
import { PageLayout } from './PageLayout';
import { SignupPage } from './SignupPage';
import { apiRequest } from "./AuthConfig";
import axios from 'axios';
import {msalInstance} from './index'

function App({ publicClientApp }) {

    configureAxiosAuthInterception();    

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

function configureAxiosAuthInterception() {
    axios.interceptors.request.use(config => new Promise((resolve, reject) => {

        try {
            msalInstance.acquireTokenSilent({
                ...apiRequest,
                account: msalInstance.getAllAccounts()[0]
            }).then(result => {
                console.log("Token acquired silently...");
                // axios.defaults.headers.common['Authorization'] = `Bearer ${result.accessToken}`;
                config.headers.common['Authorization'] = `Bearer ${result.accessToken}`;
                resolve(config);
            });
        } catch (ex) {
            if (ex instanceof InteractionRequiredAuthError) {
                console.log("Interaction required for token...");
                msalInstance.acquireTokenPopup(apiRequest).then(result => {
                    config.headers.common['Authorization'] = `Bearer ${result.accessToken}`;
                })
            } else {
                console.log(ex);
            }

            reject();
        }
      }));
}

export default App;

// axios.interceptors.request.use(async function (config) {

//     try {
//         const tokenResponse = await msalInstance.acquireTokenSilent({
//             ...apiRequest,
//             account: msalInstance.getAllAccounts()[0]
//         });

//         console.log("Token acquired silently...");
//         axios.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.accessToken}`;

//         // axios.defaults.headers.common = {
//         //     ...axios.defaults.headers.common,
//         //      'Authorization': `Bearer ${tokenResponse.accessToken}`
//         // }

//     } catch (ex) {
//         if (ex instanceof InteractionRequiredAuthError) {
//             console.log("Interaction required for token...");
//             const tokenResponse = await msalInstance.acquireTokenPopup(apiRequest)
            
//             axios.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.accessToken}`;
            
//             // Call your API with token
//             // axios.defaults.headers.common = {
//             //     ...axios.defaults.headers.common,
//             //     'Authorization': `Bearer ${accessToken}`
//             // }
//         }
//     }

//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });