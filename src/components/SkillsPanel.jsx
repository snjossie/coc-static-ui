import { Grid } from "@mui/material";
import React from "react";
import { SkillComponent } from "./SkillComponent";
import Stack from "@mui/material/Stack";
import { chunk } from "../util/ArrayFuncs";
import { rollDice } from "../dice/DiceFuncs";

export class SkillsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.skills;
    this.handleClick = props.handleClick;
    this.handleSkillSuccess = props.handleSkillSuccess;
    this.skillsPerColumn = 15;
  }

  render() {
    return (
      <Grid container columnSpacing={2} justifyContent="space-evenly">
        {chunk(this.state, this.skillsPerColumn)?.map((x, i) => (
          <Grid item xs={3} key={`column_${i + 1}`}>
            <Stack spacing={1}>
              {x.map((item, j) => (
                <SkillComponent
                  key={item.name}
                  name={item.name}
                  className={j % 2 === 1 ? "banding" : null}
                  successValue={item.successValue}
                  skill={item}
                  rollDice={rollDice}
                  openFunc={(message) => this.handleClick(message)()}
                  handleSkillSuccess={handleSkillSuccess}
                />
              ))}
            </Stack>
          </Grid>
        ))}
      </Grid>
    );
  }
}
