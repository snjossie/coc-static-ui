import * as React from 'react';

import { Backdrop, CircularProgress, Container, Typography } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { newInvestigatorRoute, viewInvestigatorRoute } from './Routes';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { generatePath } from 'react-router-dom';
import { getInvestigatorList } from './InvestigatorService';
import { useEffect } from 'react';
import { useMsal } from "@azure/msal-react";

export default function SelectInvestigator() {
    const defaultInvestigators = []

    const [loading, setLoading] = React.useState(false);
    const [investigators, setInvestigators] = React.useState(defaultInvestigators);
    const navigate = useNavigate();

    const { instance, accounts } = useMsal();

    useEffect(() => {
        const doGet = async () => {

            setLoading(true);
            const response = await getInvestigatorList();
            setInvestigators(response.data ?? []);
            setLoading(false);
        }

        doGet().catch(console.error);
    }, [accounts, instance]);

    const doNavigation = (item, event) => {
        navigate(generatePath(viewInvestigatorRoute, { id: item.id }));
    };

    return (
        <Container>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress />
            </Backdrop>

            <Typography variant="h5" alignContent="Middle" sx={{ marginTop: "1em" }}>
                Create a new investigator
            </Typography>
            <Link to={newInvestigatorRoute}>
                New Investigator
            </Link>
            <Typography variant="h5" alignContent="Middle" sx={{ marginTop: "1em" }}>
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