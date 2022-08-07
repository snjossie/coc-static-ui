import { InputAdornment, TextField, Typography } from "@mui/material";

import React from "react";
import Stack from "@mui/material/Stack";

function CreditPanel(props) {
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
                    value={props.cash}
                />
                <TextField 
                    label="Cash"
                    size="small"
                    margin="dense"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    value={props.spendingLevel}
                />
                <TextField 
                    label="Assets (enter to add new lines)"
                    size="small"
                    margin="dense"
                    multiline={true}
                    value={props.assets}
                />
            </Stack>
        </React.Fragment>);

}

export default CreditPanel;
