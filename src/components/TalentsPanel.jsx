import { Box, Chip, MenuItem, Select } from "@mui/material";

import React from "react";
import { Talents } from "../util/Talents";
import { Typography } from "@mui/material";
import _ from "lodash";

function TalentsPanel(props) {



    return (
        <React.Fragment>
            <Typography variant="h5">Talents</Typography>            
                <Select
                    size="small"
                    fullWidth={true}
                    margin="dense"
                    placeholder="Talent"
                    displayEmpty={true}
                    multiple={true}
                    value={props.talents ?? []}
                    onChange={props.onTalentsChanged}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
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
        </React.Fragment>);

}

export default TalentsPanel;
