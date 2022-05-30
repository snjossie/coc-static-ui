import Checkbox from '@mui/material/Checkbox';
import { CocButtonGroup } from "./CocButtonGroup";
import { Component } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import { Grid } from "@mui/material";
import { Typography } from '@mui/material';

export default class SkillComponent extends Component {

    render() {
        let component = <Typography>{this.props.name}</Typography>

        if (this.props.hasCheckbox) {
            component = <FormControlLabel
                control={<Checkbox
                    checked={this.props.skill?.usedSuccessfully ?? false}
                    onChange={e => this.props.handleSkillSuccess(this.props.skill, e)} />}
                label={this.props.name}
            />;
        }

        return (
            <div className={this.props.className}>
                <Grid container wrap="nowrap">
                    <Grid item xs={9} sx={{ display: "inline-grid", alignContent: "center" }}>
                        {component}
                    </Grid>
                    <Grid item xs="auto">
                        <CocButtonGroup
                            onClick={e => this.props.rollDice(this.props.skill, this.props.openFunc, e)}
                            successValue={this.props.skill?.successValue}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}
