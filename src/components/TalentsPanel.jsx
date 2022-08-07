import { Box, Chip, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import React from "react";
import { Talents } from "../util/Talents";
import { Typography } from "@mui/material";
import _ from "lodash";

function TalentsPanel(props) {



    return (
        <React.Fragment>
            <Typography variant="h5">Talents</Typography>            
                <FormControl margin="dense" fullWidth={true}>
                    <InputLabel>Talents</InputLabel>
                    <Select
                        label="Talents"
                        size="small"
                        fullWidth={true}
                        multiple={true}
                        value={props.talents ?? []}
                        onChange={props.onTalentsChanged}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} size="small" />
                                ))}
                            </Box>
                        )}
                    >
                        {_.sortBy(Talents, ['name']).map((x, i) => 
                            <MenuItem 
                                value={x.name}
                                key={i}
                            >
                                {x.name}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
        </React.Fragment>);

}

export default TalentsPanel;
