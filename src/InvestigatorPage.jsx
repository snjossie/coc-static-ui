import './App.css';

import * as React from 'react';

import { Backdrop, CircularProgress, Divider, Grid } from '@mui/material';

import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Button from '@mui/material/Button';
import CasinoIcon from '@mui/icons-material/Casino';
import CloseIcon from '@mui/icons-material/Close';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { InputAdornment } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { ResourcePanel } from './ResourcePanel';
import { SkillComponent } from './SkillComponent';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';
import { checkIfValidUUID } from './util/UuidFuncs';
import { chunk } from './util/ArrayFuncs';
import { getInvestigator } from './InvestigatorService';
import { rollDice } from './dice/DiceFuncs';
import { useParams } from 'react-router-dom'

function InvestigatorPage() {

  const { id } = useParams();

  const [snackPack, setSnackPack] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);

  const [loading, setLoading] = React.useState(false);

  const [investigator, setInvestigator] = React.useState({ name: "", age: "", sex: "", archetype: "", birthplace: "", occupation: "" });
  const [skills, setSkills] = React.useState({});

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    setInvestigator({ ...investigator, [name]: value });
  };

  React.useEffect(() => {
    const doGet = async () => {

      if (!checkIfValidUUID(id)) {
        console.log(`${id} is not a valid UUID`);
        return;
      }

      try {
        setLoading(true);
        const response = await getInvestigator(id);

        let unwrap = ({ name, occupation, age, sex, archetype, residence, birthplace }) =>
          ({ name, occupation, age, sex, archetype, residence, birthplace });

        const data = unwrap(response.data);

        setInvestigator(data);
        setSkills(response.data);

      } catch (ex) {
        console.error(ex);
      }

      setLoading(false);
    };

    doGet().catch(console.error);
  }, [id]);

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const handleClick = (message) => () => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSpendLuck = (event, luckAmount) => {
    if (!luckAmount) {
      alert("luckAmount was not a number");
      return;
    }

    if (luckAmount > skills.luck.current) {
      alert("Not enough luck");
    } else {
      const newSkills = { ...skills }
      newSkills.luck.current = skills.luck.current - luckAmount;
      setSkills(newSkills);
    }

    handleClose(event, "spentLuck");
  }

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  const action = (
    <React.Fragment>
      {messageInfo?.message?.luckAmount > 0 &&
        <Button color="secondary" size="small" onClick={e => handleSpendLuck(e, messageInfo?.message.luckAmount)}>
          SPEND {messageInfo?.message?.luckAmount} LUCK
        </Button>
      }
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const characteristicsPerColumn = 3;
  const skillsPerColumn = 15;

  return (
    <React.Fragment>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress />
      </Backdrop>

      <div className="App">
        <Snackbar
          open={open}
          TransitionProps={{ onExited: handleExited }}
          autoHideDuration={null}
          onClose={handleClose}
          message={messageInfo ? `${messageInfo.message.type} (${messageInfo.message.rollSummary})` : undefined}
          action={action}
        />
        <div className="container-basic-info section">
          <ResourcePanel
            investigator={investigator ?? {}}
            onChange={handleChange}
          />

          <div>
            <Grid container columnSpacing={0} justifyContent="space-evenly">
              {chunk(skills?.characteristics, characteristicsPerColumn)?.map((x, i) =>
                <Grid item xs={3} key={`characteristic_column_${i + 1}`}>
                  <Stack spacing={1}>
                    {x.map((item, j) =>
                      <SkillComponent
                        key={item.name}
                        name={item.name}
                        className={j % 2 === 1 ? "banding" : null}
                        successValue={item.successValue}
                        skill={item}
                        rollDice={rollDice}
                        openFunc={message => handleClick(message)()} />
                    )}

                  </Stack>
                </Grid>
              )}
            </Grid>

            <Grid container columnSpacing={0} justifyContent="space-evenly">
              <Grid item xs={3}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DirectionsRunIcon />
                      </InputAdornment>
                    )
                  }}
                  label="Move Rate"
                  value={skills?.moveRate ?? ""}
                  size="small"
                  margin="dense"
                  sx={{ width: "5em" }}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={3}>
                <Stack direction="row">
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CasinoIcon color="success" />
                        </InputAdornment>
                      )
                    }}
                    label="Luck"
                    value={skills?.luck?.current ?? ""}
                    size="small"
                    margin="dense"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    sx={{ width: "5em" }}
                  />
                </Stack>
              </Grid>

              <Grid item xs={3}>
                <Stack>
                  <Stack direction="row">

                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FavoriteIcon color='error' />
                          </InputAdornment>
                        )
                      }}
                      label="HP"
                      value={skills?.healthPoints?.current ?? ""}
                      size="small"
                      margin="dense"
                      sx={{ minWidth: "5em" }}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      onChange={handleChange}
                    />
                    <Typography sx={{ alignSelf: "center" }}>/</Typography>
                    <TextField
                      label="Max HP"
                      value={skills?.healthPoints?.max ?? ""}
                      size="small"
                      margin="dense"
                      sx={{ minWidth: "5em" }}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      onChange={handleChange}
                    />
                  </Stack>
                  <Stack direction="row">
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PsychologyIcon color="info" />
                          </InputAdornment>
                        )
                      }}
                      label="Sanity"
                      value={skills?.sanityPoints?.current ?? ""}
                      size="small"
                      margin="dense"
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      sx={{ minWidth: "5em" }}
                    />
                    <Typography sx={{ alignSelf: "center" }}>/</Typography>
                    <TextField
                      label="Max Sanity"
                      value={skills?.sanityPoints?.current ?? ""}
                      size="small"
                      margin="dense"
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      sx={{ minWidth: "5em" }}
                    />
                  </Stack>
                  <Stack direction="row">

                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AutoFixHighIcon color="secondary" />
                          </InputAdornment>
                        )
                      }}
                      label="MP"
                      value={skills?.magicPoints?.current ?? ""}
                      size="small"
                      margin="dense"
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      sx={{ minWidth: "5em" }}
                    />
                    <Typography sx={{ alignSelf: "center" }}>/</Typography>
                    <TextField
                      label="Max MP"
                      value={skills?.magicPoints?.current ?? ""}
                      size="small"
                      margin="dense"
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      sx={{ minWidth: "5em" }}
                    />
                  </Stack>
                </Stack>
              </Grid>
            </Grid>

          </div>
        </div>

        <Divider />

        <div className="section">
          <Stack direction="row" spacing={3} alignItems="center">
            <Typography variant="h5">Hero Skills</Typography>
            <Typography variant="body2">
              <kbd>shift</kbd> + click for Bonus roll or <kbd>ctrl</kbd> + click for Penalty roll
            </Typography>
          </Stack>
          <div>
            <Grid container columnSpacing={2} justifyContent="space-evenly">
              {chunk(skills?.skills, skillsPerColumn)?.map((x, i) =>
                <Grid item xs={3} key={`column_${i + 1}`}>
                  <Stack spacing={1}>
                    {x.map((item, j) =>
                      <SkillComponent
                        key={item.name}
                        name={item.name}
                        className={j % 2 === 1 ? "banding" : null}
                        successValue={item.successValue}
                        skill={item}
                        rollDice={rollDice}
                        openFunc={message => handleClick(message)()} />
                    )}

                  </Stack>
                </Grid>
              )}
            </Grid>
          </div>
        </div>

        <Divider />

        <div className="section">
          <Typography variant="h5">Weapons go here</Typography>
        </div>

        <Divider />

        <div className="section">
          <Typography variant="h5">Credit/Pulp Skills go here</Typography>
        </div>
      </div>
    </React.Fragment>

  );
}

export default InvestigatorPage;
