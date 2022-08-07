import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

import DoneIcon from '@mui/icons-material/Done';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export const SkillImprovementDialog = props => {

    function noImprovements() {
        return <Typography>
            You haven't used any skills successfully yet...womp womp
        </Typography>;
    }

    function improvementsTable(improvements) {
        return <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Skill</TableCell>
                  <TableCell align="right">Old Skill</TableCell>
                  <TableCell align="right">Improvment Roll (1d100)</TableCell>
                  <TableCell align="right">Roll &gt;skill val or &gt;95?</TableCell>
                  <TableCell align="right">Improvement Amount (1d10)</TableCell>
                  <TableCell align="right">Sanity Increase (2d6)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {improvements.map((row) => (
                  <TableRow
                    key={row.skill.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.skill.name}
                    </TableCell>
                    <TableCell align="right">{row.oldSkillVal}</TableCell>
                    <TableCell align="right">{row.roll.total}</TableCell>
                    <TableCell align="right">
                      {row.passes ? 
                        <DoneIcon fontSize="medium" color="success" /> : 
                        <HighlightOffIcon fontSize="medium" color="error" />}
                    </TableCell>
                    <TableCell align="right">{row.improvement.total}</TableCell>
                    <TableCell align="right">{row.sanity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
    }

    if (!props.improvements){
        return <></>
    }

    return <Dialog
        open={props.openDialog}
        keepMounted
        maxWidth="lg"
        fullWidth={true}
      >
        <DialogTitle>Skill Improvement Summary</DialogTitle>
        <DialogContent>
          {
            props.improvements.length === 0 ?
                noImprovements() :
                improvementsTable(props.improvements)
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>;
}
