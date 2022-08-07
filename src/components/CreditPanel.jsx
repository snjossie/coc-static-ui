import { InputAdornment, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";

import Stack from "@mui/material/Stack";

function CreditPanel(props) {

    const [cash, setCash] = React.useState(0);
    const [spendingLevel, setSpendingLevel] = React.useState(0);
    const [assets, setAssets] = React.useState("");

    useEffect(() => {
        setCash(props.cash);
        setSpendingLevel(props.spendingLevel);
        setAssets(props.assets);
    }, [props]);

    const onBlur = event => {
        if (cash !== props.cash || spendingLevel !== props.spendingLevel || assets !== props.assets) {
            props.onCashAssetsChanged(event);
            props.handleCreditBlur(event);
        }
    };

    return (
        <React.Fragment>
            <Typography variant="h5">Cash/Assets</Typography>
            <Stack direction="column">
                <TextField 
                    label="Spending Level"
                    size="small"
                    margin="dense"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    value={cash}
                    name="cash"
                    onChange={e => setCash(e.target.value)}
                    onBlur={onBlur}
                />
                <TextField 
                    label="Cash"
                    size="small"
                    margin="dense"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    value={spendingLevel}
                    name="spendingLevel"
                    onChange={e => setSpendingLevel(e.target.value)}
                    onBlur={onBlur}
                />
                <TextField 
                    label="Assets (enter to add new lines)"
                    size="small"
                    margin="dense"
                    multiline={true}
                    rows="5"
                    value={assets}
                    name="assets"
                    onChange={e => setAssets(e.target.value)}
                    onBlur={onBlur}
                />
            </Stack>
        </React.Fragment>);

}

export default CreditPanel;
