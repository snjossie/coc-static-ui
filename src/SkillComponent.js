import { Component } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

export class SkillComponent extends Component {

    render() {
        const buttonSize = "48px";
        return (
            <div>
                <div className="name">
                    <FormControlLabel 
                        control={<Checkbox />} 
                        label={this.props.name}
                    />
                </div>
                <div className="skill-values">
                    <Button
                        variant="outlined"
                        className="success"
                        onClick={() => this.props.rollDice(this.props.successValue, this.props.openFunc)}
                        sx={{
                            minHeight: buttonSize,
                            maxHeight: buttonSize,
                            minWidth: buttonSize,
                            maxWidth: buttonSize
                        }}
                    >
                        {this.props.successValue}
                    </Button>
                    <span
                        className="bigsuccess"
                    >
                        {Math.floor(this.props.successValue * 0.5)}
                    </span>
                    <span
                        className="extremesuccess"
                    >
                        {Math.floor(this.props.successValue * 0.2)}
                    </span>
                </div>
            </div>
        );
    }
}