import React from "react";
import {Stack} from "@mui/material";
import WeaponComponent from "./WeaponComponent";

function WeaponsPanel(props) {

    return (
        <React.Fragment>
            <Stack spacing={1}>
            {props?.weapons?.map((x, i) => 
                <WeaponComponent 
                    key={i}
                    weaponIndex={i}
                    {...props}
                    {...x}   
                />
            )}
            </Stack>
        </React.Fragment>);

}

export default WeaponsPanel;
