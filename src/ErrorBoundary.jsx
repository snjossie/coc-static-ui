import { Box } from "@mui/system";
import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props){
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) { 
        console.error(error, errorInfo);
    }

    render() {
        if(this.state.hasError) {
            return (
                <Box 
                    display="flex" 
                    justifyContent="center"
                    alignItems="center"
                    minHeight="90vh">
                    <div>
                        <h1 style={{textAlign: "center"}}>Oh, noes! A wild error appeared!</h1>
                        <h6 style={{textAlign: "center"}}>It's super effective</h6>
                    </div>
                </Box>
            );
        }

        return this.props.children; 
    }
}