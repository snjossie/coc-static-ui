import { Button } from "@mui/material";
import handleRedirectAuth from "../util/auth";
import { loginRequest } from "../AuthConfig";
import { selectInvestigatorRoute } from "../Routes";
import { useEffect } from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";

export const LandingPage = props => {

    const { instance, accounts } = useMsal();
    const navigate = useNavigate();

    const isAuthenticated = useIsAuthenticated();

    handleRedirectAuth(instance, accounts, navigate);

    useEffect(() => {
        if (isAuthenticated) {
            navigate(selectInvestigatorRoute);
        }
    }, [isAuthenticated, navigate])

    const handleLogin = (loginType) => {
        if (loginType === "popup") {
            instance.loginPopup(loginRequest).then(() => {
                navigate(selectInvestigatorRoute);
            }).catch(e => {
                console.log(e);
            });
        } else if (loginType === "redirect") {
            instance.loginRedirect(loginRequest).then(() => {
                navigate(selectInvestigatorRoute);
            }).catch(e => {
                console.log(e);
            });
        }
    }

    return (
        <Button onClick={() => handleLogin("redirect")}>
            Sign In
        </Button>
    )
}