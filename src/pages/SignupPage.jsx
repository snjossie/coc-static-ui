import handleRedirectAuth from "../util/auth";
import { loginRequest } from "../AuthConfig";
import { selectInvestigatorRoute } from '../Routes';
import { signupUser } from '../InvestigatorService';
import { useEffect } from 'react';
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

export const SignupPage = props => {

    const { key } = useParams();
    const navigate = useNavigate();

    const { instance, accounts } = useMsal();

    handleRedirectAuth(instance, accounts, navigate);

    useEffect(() => {
        const doGet = async () => {
            
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

            handleLogin("redirect");

            const response = await signupUser(key);
            if(response.status === 200) {
                navigate(selectInvestigatorRoute);
            }
        }

        doGet().catch(console.error);
    }, [accounts, instance, key, navigate]);

    return (<></>);
}