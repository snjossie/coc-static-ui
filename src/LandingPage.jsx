import { Button } from "@mui/material";
import { loginRequest } from "./AuthConfig";
import { selectInvestigatorRoute } from "./Routes";
import { useIsAuthenticated } from "@azure/msal-react";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";

export const LandingPage = props => {
    const isAuthenticated = useIsAuthenticated();

    const { instance } = useMsal();
    const navigate = useNavigate();

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

    if (isAuthenticated) {
        navigate(selectInvestigatorRoute);
       
       return (<h1>You're already signed in...redirecting...</h1>);
    }

    return (
        <Button onClick={() => handleLogin("popup")}>
            Sign In
        </Button>
    )
}