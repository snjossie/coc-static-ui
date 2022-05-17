import { apiRequest, loginRequest } from "./AuthConfig";

import { InteractionRequiredAuthError } from "@azure/msal-browser";
import axios from 'axios';
import { selectInvestigatorRoute } from './Routes';
import { signupUser } from './InvestigatorService';
import { useEffect } from 'react';
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

export const SignupPage = props => {

    const { key } = useParams();
    const navigate = useNavigate();

    const { instance, accounts } = useMsal();

    useEffect(() => {
        const doGet = async () => {
            
            handleLogin("popup");

            try {
                const tokenResponse = await instance.acquireTokenSilent({
                    ...apiRequest,
                    account: accounts[0]
                });

                axios.defaults.headers.common = {
                    ...axios.defaults.headers.common,
                     'Authorization': `Bearer ${tokenResponse.accessToken}`
                }

            } catch (ex) {
                if (ex instanceof InteractionRequiredAuthError) {
                    const accessTokenResponse = await instance.acquireTokenPopup(apiRequest)

                    // Acquire token interactive success
                    const accessToken = accessTokenResponse.accessToken;
                    
                    // Call your API with token
                    axios.defaults.headers.common = {
                        ...axios.defaults.headers.common,
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            }
            
            const response = await signupUser(key);
            if(response.status === 200) {
                navigate(selectInvestigatorRoute);
            }
        }

        doGet().catch(console.error);
    }, [accounts, instance]);

    const handleLogin = (loginType) => {
        if (loginType === "popup") {
            instance.loginPopup(loginRequest).catch(e => {
                console.log(e);
            });
        } else if (loginType === "redirect") {
            instance.loginRedirect(loginRequest).catch(e => {
                console.log(e);
            });
        }
    }

    return (<></>);
}