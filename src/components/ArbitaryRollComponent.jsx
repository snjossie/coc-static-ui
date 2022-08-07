import { Box, IconButton, InputAdornment, Link, Stack, TextField } from "@mui/material";

import CasinoIcon from '@mui/icons-material/Casino';
import React from "react";

function ArbitraryRollComponent(props) {

    const [rollDefinition, setRollDefinition] = React.useState("1d100");

    return (<Stack>
        <TextField
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton edge="end" onClick={() => props.handleDoArbitraryRoll(rollDefinition)}>
                            <CasinoIcon />
                        </IconButton>
                    </InputAdornment>
                ),
                sx: { fontFamily: "Fira Code, monospace" }
            }}
            value={rollDefinition}
            onChange={e => setRollDefinition(e.target.value)}
            onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                    props.handleDoArbitraryRoll(rollDefinition);
                    ev.preventDefault();
                }
            }}
            fullWidth={true}
            label="Arbitrary Roll"
            size="small"
            margin="dense"
            sx={{ width: "15em" }}
        />
        <Box sx={{ width: "15em" }}>
            <Link
                href="https://dice-roller.github.io/documentation/guide/notation/dice.html"
                target="_blank"
                sx={{ width: "15em" }}
            >
                Dice Notation
            </Link>
        </Box>
    </Stack>);

}

export default ArbitraryRollComponent;
