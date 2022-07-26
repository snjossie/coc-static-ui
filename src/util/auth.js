import { selectInvestigatorRoute } from '../Routes';
import { signupUser } from '../InvestigatorService';

function handleRedirectAuth(instance, accounts, navigate, queryParams) {
    
    instance.handleRedirectPromise().then((tokenResponse) => {
        const key = queryParams.get("key") || tokenResponse?.state;

        if (tokenResponse !== null) {
            // Successful auth

            if (key) {
                tryDoSignup(navigate, key);
            } else if (tokenResponse.state) {
                tryDoSignup(navigate, tokenResponse.state);
            } else {
                navigate(selectInvestigatorRoute);
            }
        } else {
            // Not returning from auth, have to check if already logged in

            const currentAccounts = accounts;
            if (!currentAccounts || currentAccounts.length < 1) {
                // do nothing?
            } else if (currentAccounts.length > 0) {
                if (key) {
                    tryDoSignup(navigate, key);
                } else {
                    navigate(selectInvestigatorRoute);
                }
            }
        }
    }).catch((error) => {
        console.error(error);
    });
    
}

function tryDoSignup(navigate, key) {
    if (key) {
        signupUser(key).then((response) => {;
        if (response.status === 200) {
            navigate(selectInvestigatorRoute);
        }
    });
}
}

export default handleRedirectAuth;
