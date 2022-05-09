import { Tooltip } from "@mui/material";
import React from "react";

// import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
// import AddCircleIcon from '@mui/icons-material/AddCircle';

function useEventListener(eventName, handler, element = window) {
    const savedHandler = React.useRef();

    React.useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    React.useEffect(() => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;

        const eventListener = (event) => savedHandler.current(event);

        element.addEventListener(eventName, eventListener);

        return () => {
            element.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element]);
}

export function RollTooltip(props) {
    const { ...rest } = props;
    const [shiftDown, setShiftDown] = React.useState(false);
    const [controlDown, setControlDown] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState("");

    const updateText = () => {
        if (shiftDown) {
            setText("Roll with Bonus Die");
        } else if (controlDown) {
            setText("Roll with Penalty Die")
        } else {
            setText("");
        }
        setOpen(true);
    }

    const onOpen = () => {
        updateText();
        setOpen(true);
    }
    const onClose = () => {
        setShiftDown(false);
        setControlDown(false);
        setOpen(false);
    }

    const handler = React.useCallback((e) => {
        if (e.getModifierState("Shift")) {
            setShiftDown(true);
            setText("Roll with Bonus Die");
        } else if (e.getModifierState("Control")) {
            setControlDown(true);
            setText("Roll with Penalty Die")
        } else {
            setShiftDown(false);
            setControlDown(false);
            setText("")
        }
    }, []);

    useEventListener("keydown", handler);
    useEventListener("keyup", handler);

    return (
        <Tooltip
            open={open}
            onOpen={onOpen}
            onClose={onClose}
            arrow
            title={text ?? ""}
            aria-label={text}
            {...rest}
        />
    );
};