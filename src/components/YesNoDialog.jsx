import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export const YesNoDialog = props => {

    return <Dialog
        open={props.openDialog}
        keepMounted
        fullWidth={true}
      >
        <DialogTitle>Do you want to execute Skill Improvements?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Updating your skill improvements is an irreversible action. Do you want to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.yesAction}>Improve Skills</Button>
          <Button onClick={props.noAction}>Cancel</Button>
        </DialogActions>
      </Dialog>;
}
