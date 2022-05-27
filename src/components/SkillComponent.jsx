import Checkbox from '@mui/material/Checkbox';
import { CocButtonGroup } from "./CocButtonGroup";
import { Component } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import { Grid } from "@mui/material";

export default class SkillComponent extends Component {

    render() {
        return (
            <div className={this.props.className}>
                <Grid container  wrap="nowrap">
                    <Grid item xs={9}>
                        <FormControlLabel
                            control={<Checkbox />}
                            label={this.props.name}
                        />
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