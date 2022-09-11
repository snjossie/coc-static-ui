import { Box, Chip, FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, Select, Stack } from "@mui/material";
import { Talents, getTalentDescription } from "../util/Talents";

import React from "react";
import { Typography } from "@mui/material";
import _ from "lodash";

function TalentsPanel(props) {



    return (
        <React.Fragment>
            <Typography variant="h5">Talents</Typography>
            <Stack>
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
                <Stack>
                    <List>
                    {(props.talents ?? []).map(x => 
                        <ListItem key={x}>
                            <ListItemText
                                primary={x}
                                secondary={getTalentDescription(x)}
                                />
                            </ListItem>
                    )}
                    </List>
                </Stack>
            </Stack>
        </React.Fragment>);

}

export default TalentsPanel;
