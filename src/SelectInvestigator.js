import * as React from 'react';

import { Container, Typography } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { getInvestigatorList } from './InvestigatorService';
import { useEffect } from 'react';

export default function SelectInvestigator() {
    const defaultInvestigators = []

    const [investigators, setInvestigators] = React.useState(defaultInvestigators);
    const navigate = useNavigate();

    useEffect(() => {
        const doGet = async () => {
            const response = await getInvestigatorList();
            setInvestigators(response.data ?? []);
        }

        doGet().catch(console.error);
    }, []);

    const doNavigation = (item, event) => {
        navigate(`/investigator/${item.id}`);
    };

    return (
        <Container>
            <Typography variant="h5" alignContent="Middle" sx={{marginTop: "1em"}}>
                Create a new investigator
            </Typography>
            <Link to="new">
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