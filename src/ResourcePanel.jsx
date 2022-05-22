import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import React from "react";

export class ResourcePanel extends React.Component {
  render() {
    return (
        <Stack>
          <TextField
            value={this.props.investigator?.name ?? ""}
            name="name"
            label="Name"
            size="small"
            margin="dense"
            onChange={this.props.onChange}
          />
          <TextField
            value={this.props.investigator?.occupation ?? ""}
            name="occupation"
            label="Occupation"
            size="small"
            margin="dense"
            onChange={this.props.onChange}
          />
          <TextField
            value={this.props.investigator?.age ?? ""}
            name="age"
            label="Age"
            size="small"
            margin="dense"
            onChange={this.props.onChange}
          />
          <TextField
            value={this.props.investigator?.sex ?? ""}
            name="sex"
            label="Sex"
            size="small"
            margin="dense"
            onChange={this.props.onChange}
          />
          <TextField
            value={this.props.investigator?.archetype ?? ""}
            name="archetype"
            label="Archetype"
            size="small"
            margin="dense"
            onChange={this.props.onChange}
          />
          <TextField
            value={this.props.investigator?.residence ?? ""}
            name="residence"
            label="Residence"
            size="small"
            margin="dense"
            onChange={this.props.onChange}
          />
          <TextField
            value={this.props.investigator?.birthplace ?? ""}
            name="birthplace"
            label="Birthplace"
            size="small"
            margin="dense"
            onChange={this.props.onChange}
          />
        </Stack>
    );
  }
}
