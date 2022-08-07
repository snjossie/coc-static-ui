import { Grid, IconButton, InputAdornment, SvgIcon, TextField } from "@mui/material";
import React, { useEffect } from "react";

import { ReactComponent as AttackIcon } from "../img/sword-fight-svgrepo-com.svg"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function WeaponComponent(props) {

    const [name, setName] = React.useState("");
    const [successValue, setSuccessValue] = React.useState("");
    const [hardSuccessValue, setHardSuccessValue] = React.useState("");
    const [extremeSuccessValue, setExtremeSuccessValue] = React.useState("");
    const [damageRoll, setDamageRoll] = React.useState("");
    const [range, setRange] = React.useState("");
    const [numberOfAttacks, setNumberOfAttacks] = React.useState("");
    const [ammo, setAmmo] = React.useState("");
    const [malfunction, setMalfunction] = React.useState("");

    useEffect(() => {
        setName(props.name);
        setSuccessValue(props.successValue);
        setHardSuccessValue(props.hardSuccessValue);
        setExtremeSuccessValue(props.extremeSuccessValue);
        setDamageRoll(props.damageRoll);
        setRange(props.range);
        setNumberOfAttacks(props.numberOfAttacks);
        setAmmo(props.ammo);
        setMalfunction(props.malfunction);
    }, [props])

    const setRollValues = value => {
        setSuccessValue(value);
        setHardSuccessValue(Math.floor(value * 0.5));
        setExtremeSuccessValue(Math.floor(value * 0.2));
    }

    const onBlur = event => {
        const anyChange = 
            name !== props.name ||
            successValue !== props.successValue || 
            damageRoll !== props.damageRoll || 
            range !== props.range || 
            numberOfAttacks !== props.numberOfAttacks || 
            ammo !== props.ammo || 
            malfunction !== props.malfunction;

        if (anyChange) {
            props.handleWeaponChange(props.weaponIndex, event);
            props.handleWeaponFieldBlur(event);
        }
    };

    return (
        <React.Fragment>
            <Grid container columnSpacing={0} justifyContent="space-evenly">
                <Grid item xs={2}>
                    <TextField
                        fullWidth={true}
                        label="Weapon"
                        size="small"
                        value={name}
                        name="name"
                        onChange={event => setName(event.target.value)}
                        onBlur={onBlur}
                    />
                </Grid>
                <Grid item xs={1}>
                    <TextField
                        label="Regular"
                        size="small"
                        value={successValue}
                        name="successValue"
                        onChange={event => setRollValues(event.target.value)}
                        onBlur={onBlur}
                    />
                </Grid>
                <Grid item xs={1}>
                    <TextField
                        label="Hard"
                        size="small"
                        InputProps={{ readOnly: true }}
                        value={hardSuccessValue}
                    />
                </Grid>
                <Grid item xs={1}>
                    <TextField
                        label="Extreme"
                        size="small"
                        InputProps={{ readOnly: true }}
                        value={extremeSuccessValue}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        fullWidth={true}
                        label="Damage"
                        size="small"
                        value={damageRoll}
                        name="damageRoll"
                        onChange={event => setDamageRoll(event.target.value)}
                        onBlur={onBlur}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton                                
                                    onClick={() => props.handleDamageRoll(damageRoll, successValue)}
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
                        value={range}
                        name="range"
                        onChange={event => setRange(event.target.value)}
                        onBlur={onBlur}
                    />
                </Grid>
                <Grid item xs={1}>
                    <TextField
                        label="Attacks"
                        size="small"
                        value={numberOfAttacks}
                        name="numberOfAttacks"
                        onChange={event => setNumberOfAttacks(event.target.value)}
                        onBlur={onBlur}
                    />
                </Grid>
                <Grid item xs={1}>
                    <TextField
                        label="Ammo"
                        size="small"
                        value={ammo}
                        name="ammo"
                        onChange={event => setAmmo(event.target.value)}
                        onBlur={onBlur}
                    />
                </Grid>
                <Grid item xs={1}>
                    <TextField
                        label="Malfunction"
                        size="small"
                        value={malfunction}
                        name="malfunction"
                        onChange={event => setMalfunction(event.target.value)}
                        onBlur={onBlur}
                    />
                </Grid>
                <Grid item xs={0}>
                    <IconButton 
                        aria-label="Delete weapon permanently"
                        onClick={event => props.handleDeleteWeapon(props.weaponIndex, event)}
                    >
                        <DeleteForeverIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </React.Fragment>);

}

export default WeaponComponent;
