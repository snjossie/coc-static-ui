import { Box } from "@mui/material";
import Button from '@mui/material/Button';
import { Component } from "react";
import { RollTooltip } from "./RollTooltip";
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";

export class CocButtonGroup extends Component {

    render() {
        const buttonSize = "48px";

        return (
            <Box>
                <Stack direction="row" spacing={3}>
                    <RollTooltip>
                        <Button
                            variant="outlined"
                            onClick={this.props.onClick}
                            sx={{
                                minHeight: buttonSize,
                                maxHeight: buttonSize,
                                minWidth: buttonSize,
                                maxWidth: buttonSize
                            }}
                        >
                            {this.props.successValue}
                        </Button>
                    </RollTooltip>
                    <Stack direction="column">
                        <Typography>
                            {Math.floor(this.props.successValue * 0.5)}
                        </Typography>
                        <Typography>
                            {Math.floor(this.props.successValue * 0.2)}
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
        );
    }
}
