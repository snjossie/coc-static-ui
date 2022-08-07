import { Grid, IconButton, InputAdornment, Stack, SvgIcon, TextField } from "@mui/material";

import { ReactComponent as AttackIcon } from "../img/sword-fight-svgrepo-com.svg"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React from "react";

function WeaponsPanel(props) {

    return (
        <React.Fragment>
            <Stack spacing={1}>
            {props?.weapons?.map((x, i) => 
            <Grid container columnSpacing={0} justifyContent="space-evenly" key={i}>
                <Grid item xs={2}>
                    <TextField
                        fullWidth={true}
                        label="Weapon"
                        size="small"
                        value={x.name}
                        name="name"
                        onChange={event => props.handleWeaponChange(i, event)}
                    />
                </Grid>
                <Grid item xs={1}>
                    <TextField
                        label="Regular"
                        size="small"
                        value={x.successValue}
                        name="successValue"
                        onChange={event => props.handleWeaponChange(i, event)}
                    />
                </Grid>
                <Grid item xs={1}>
                    <TextField
                        label="Hard"
                        size="small"
                        InputProps={{ readOnly: true }}
                        value={x.hardSuccessValue}
                    />
                </Grid>
                <Grid item xs={1}>
                    <TextField
                        label="Extreme"
                        size="small"
                        InputProps={{ readOnly: true }}
                        value={x.extremeSuccessValue}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        fullWidth={true}
                        label="Damage"
                        size="small"
                        value={x.damageRoll}
                        name="damageRoll"
                        onChange={event => props.handleWeaponChange(i, event)}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton                                
                                    onClick={() => props.handleDamageRoll(x.damageRoll, x.extremeSuccessValue)}
                                    edge="end"
                                >
                                    <SvgIcon component={AttackIcon} color="white" inheritViewBox />
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                    />
                </Grid>
                <Grid item xs={1}>
                    <TextField
                        label="Range"
                        size="small"
                        value={x.range}
                        name="range"
                        onChange={event => props.handleWeaponChange(i, event)}
                    />
                </Grid>
                <Grid item xs={1}>
                    <TextField
                        label="Attacks"
                        size="small"
                        value={x.numberOfAttacks}
                        name="numberOfAttacks"
                        onChange={event => props.handleWeaponChange(i, event)}
                    />
                </Grid>
                <Grid item xs={1}>
                    <TextField
                        label="Ammo"
                        size="small"
                        value={x.ammo}
                        name="ammo"
                        onChange={event => props.handleWeaponChange(i, event)}
                    />
                </Grid>
                <Grid item xs={1}>
                    <TextField
                        label="Malfunction"
                        size="small"
                        value={x.malfunction}
                        name="malfunction"
                        onChange={event => props.handleWeaponChange(i, event)}
                    />
                </Grid>
                <Grid item xs={0}>
                    <IconButton 
                        aria-label="Delete weapon permanently"
                        onClick={event => props.handleDeleteWeapon(i, event)}
                    >
                        <DeleteForeverIcon />
                    </IconButton>
                </Grid>
            </Grid>)}
            </Stack>
        </React.Fragment>);

}

export default WeaponsPanel;
