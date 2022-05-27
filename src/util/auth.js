import { selectInvestigatorRoute } from '../Routes';

function handleRedirectAuth(instance, accounts, navigate) {
    
    instance.handleRedirectPromise().then((tokenResponse) => {
        if (tokenResponse !== null) {
            // Successful auth
            navigate(selectInvestigatorRoute);
        } else {
            // Not returning from auth, have to check if already logged in

            const currentAccounts = accounts;
            if (!currentAccounts || currentAccounts.length < 1) {
                // do nothing?
            } else if (currentAccounts.length > 0) {
                navigate(selectInvestigatorRoute);
            }
        }
    }).catch((error) => {
        console.error(error);
    });
    
}

export default handleRedirectAuth;
