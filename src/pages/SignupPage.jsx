import { useNavigate, useSearchParams } from "react-router-dom";

import handleRedirectAuth from "../util/auth";
import { loginRequest } from "../AuthConfig";
import { selectInvestigatorRoute } from '../Routes';
import { signupUser } from '../InvestigatorService';
import { useEffect } from 'react';
import { useMsal } from "@azure/msal-react";

export const SignupPage = props => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const key = searchParams.get("key");

    const { instance, accounts } = useMsal();

    handleRedirectAuth(instance, accounts, navigate, searchParams);

    useEffect(() => {
        const doGet = async () => {
            
            const handleLogin = (loginType) => {
                if (loginType === "popup") {
                    instance.loginPopup(loginRequest).catch(e => {
                        console.log(e);
                    });
                } else if (loginType === "redirect") {
                    
                    instance.loginRedirect({ 
                        ...loginRequest,
                        state: key
                    }).catch(e => {
                        console.log(e);
                    });
                }
            }

            handleLogin("redirect");

            const response = await signupUser(key);
            if(response.status === 200) {
                navigate(selectInvestigatorRoute);
            }
        }

        doGet().catch(console.error);
    }, [accounts, instance, key, navigate, searchParams]);

    return (<></>);
}
