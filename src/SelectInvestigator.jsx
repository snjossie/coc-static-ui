import * as React from 'react';

import { Container, Typography } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { newInvestigatorRoute, viewInvestigatorRoute } from './Routes';

import { InteractionRequiredAuthError } from "@azure/msal-browser";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { apiRequest } from "./AuthConfig";
import axios from 'axios';
import { generatePath } from 'react-router-dom';
import { getInvestigatorList } from './InvestigatorService';
import { useEffect } from 'react';
import { useMsal } from "@azure/msal-react";

export default function SelectInvestigator() {
    const defaultInvestigators = []

    const [investigators, setInvestigators] = React.useState(defaultInvestigators);
    const navigate = useNavigate();

    const { instance, accounts } = useMsal();
    
    // instance.acquireTokenSilent({
    //     ...loginRequest,
    //     account: accounts[0]
    // }).then((response) => {
    //     axios.defaults.headers.common = {
    //         ...axios.defaults.headers.common,
    //          'Authorization': `Bearer ${response.accessToken}`
    //     }
    // });

    useEffect(() => {
        const doGet = async () => {
            
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
            
            const response = await getInvestigatorList();
            setInvestigators(response.data ?? []);
        }

        doGet().catch(console.error);
    }, [accounts, instance]);

    const doNavigation = (item, event) => {
        navigate(generatePath(viewInvestigatorRoute, { id: item.id }));
    };

    return (
        <Container>
            <Typography variant="h5" alignContent="Middle" sx={{marginTop: "1em"}}>
                Create a new investigator
            </Typography>
            <Link to={newInvestigatorRoute}>
                New Investigator
            </Link>            
            <Typography variant="h5" alignContent="Middle" sx={{marginTop: "1em"}}>
                Choose your investigator
            </Typography>
            <List>
                {investigators.map((item, index) =>
                    <ListItemButton
                        key={index}
                        onClick={doNavigation.bind(this, item)}
                    >
                        {item.name}
                    </ListItemButton>
                )}
            </List>
        </Container>
    );
}