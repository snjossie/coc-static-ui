import './App.css';
import { Skill } from './skill';
import { SkillComponent } from './SkillComponent';
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';

// import appIcon from './img/eldersign.svg'
import { ReactComponent as AppIcon } from './img/eldersign.svg'

import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'

import SvgIcon from '@mui/material/SvgIcon';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import { rollDice } from './dice/DiceFuncs';

function App() {

  const [snackPack, setSnackPack] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);

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

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  const action = (
    <React.Fragment>
      { messageInfo?.message?.luckAmount > 0 &&
      <Button color="secondary" size="small" onClick={handleClose}>
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

  const arr = [
    new Skill("Accounting (5%)", 5),
    new Skill("Appraise (5%)", 5),
    new Skill("Archaeology (1%)", 1),
    new Skill("Art/Craft (5%)", 40),
    new Skill("Art/Craft", 30),
    new Skill("Charm (15%)", 45),
    new Skill("Climb (20%)", 20),
    new Skill("Computer Use (0%)", 0),
    new Skill("Credit Rating (0%)", 70),
    new Skill("Cthulhu Mythos (0%)", 0),
    new Skill("Demolitions (1%)", 1),
    new Skill("Disguise (5%)", 45),
    new Skill("Diving (1%)", 1),
    new Skill("Dodge (half DEX)", 45),
    new Skill("Drive Auto (20%)", 20),
    new Skill("Elec. Repair (10%)", 10),
    new Skill("Fast Talk (5%)", 5),
    new Skill("Fighting (Brawl) (25%)", 25),
    new Skill("Fighting", 0),
    new Skill("Fighting 2", 1),
    new Skill("Firearms (Handgun) (20%)", 20),
    new Skill("Firearms (Rifle/Shotgun) (25%)", 25),
    new Skill("Firearms (SMB) (15%)", 15),
    new Skill("Firearms", 1),
    new Skill("First Aid (30%)", 30),
    new Skill("History (5%)", 30),
    new Skill("Intimidate (15%)", 15),
    new Skill("Jump (20%)", 20),
    new Skill("Language (1%)", 25),
    new Skill("Language", 20),
    new Skill("Language (Own) (EDU)", 70),
    new Skill("Law (5%)", 0),
    new Skill("Library Use (20%)", 5),
    new Skill("Listen (20%)", 20),
    new Skill("Locksmith (1%)", 40),
    new Skill("Mech. Repair (10%)", 10),
    new Skill("Medicine (1%)", 1),
    new Skill("Natural World (10%)", 10),
    new Skill("Navigate (10%)", 10),
    new Skill("Occult (5%)", 40),
    new Skill("Op. Hv. Machine (1%)", 1),
    new Skill("Persuade (10%)", 45),
    new Skill("Pilot (1%)", 1),
    new Skill("Psychoanalysis (1%)", 40),
    new Skill("Psychology (10%)", 30),
    new Skill("Read Lips (1%)", 1),
    new Skill("Ride (5%)", 5),
    new Skill("Science (1%)", 1),
    new Skill("Science", 1),
    new Skill("Sleight of Hand (10%)", 50),
    new Skill("Spot Hidden (25%)", 35),
    new Skill("Stealth (20%)", 20),
    new Skill("Survival (10%)", 10),
    new Skill("Swim (20%)", 20),
    new Skill("Throw (20%)", 20),
    new Skill("Track (10%)", 10),
    new Skill("Telekinesis", 70),
    new Skill("(blank 2)", 0),
    new Skill("(blank 3)", 0),
    new Skill("(blank 4)", 0)
  ];

  const characteristics = [
    [
      new Skill("STR", 40),
      new Skill("CON", 40),
      new Skill("SIZ", 40)
    ],
    [
      new Skill("DEX", 40),
      new Skill("APP", 40),
      new Skill("EDU", 40)
    ],
    [
      new Skill("INT", 40),
      new Skill("POW", 40),
      new Skill("Movement", 7)
    ]
  ]

  const perChunk = 15;
  const skills = arr.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk)

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, []);

  return (
    <React.Fragment>
      <div className="App">
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters variant="dense">
              <SvgIcon component={AppIcon} inheritViewBox />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                Call of Cthulhu
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>

        <div className="container-basic-info section">
          <Stack>
            <TextField
              label="Name"
              size="small"
              margin="dense"
            />
            <TextField
              label="Occupation"
              size="small"
              margin="dense"
            />
            <TextField
              label="Age"
              size="small"
              margin="dense"
            />
            <TextField
              label="Sex"
              size="small"
              margin="dense"
            />
            <TextField
              label="Archetype"
              size="small"
              margin="dense"
            />
            <TextField
              label="Residence"
              size="small"
              margin="dense"
            />
            <TextField
              label="Birthplace"
              size="small"
              margin="dense"
            />
          </Stack>
          <div>

          <Grid container columnSpacing={0} justifyContent="space-evenly">
              {characteristics.map((x, i) =>
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

          </div>
        </div>

        <div className="section">
          <Stack direction="row" spacing={5} justifyContent="space-between">
            <Stack direction="row">
              <TextField
                label="HP"
                size="small"
                margin="dense"
                sx={{ width: "5em" }}
              />
              <Typography sx={{ alignSelf: "center" }}>/</Typography>
              <TextField
                label="Max HP"
                size="small"
                margin="dense"
                sx={{ width: "5em" }}
              />
            </Stack>
            <Stack direction="row">
              <TextField
                label="HP"
                size="small"
                margin="dense"
                sx={{ width: "5em" }}
              />
              <Typography sx={{ alignSelf: "center" }}>/</Typography>
              <TextField
                label="Max HP"
                size="small"
                margin="dense"
                sx={{ width: "5em" }}
              />
            </Stack><Stack direction="row">
              <TextField
                label="HP"
                size="small"
                margin="dense"
                sx={{ width: "5em" }}
              />
              <Typography sx={{ alignSelf: "center" }}>/</Typography>
              <TextField
                label="Max HP"
                size="small"
                margin="dense"
                sx={{ width: "5em" }}
              />
            </Stack><Stack direction="row">
              <TextField
                label="HP"
                size="small"
                margin="dense"
                sx={{ width: "5em" }}
              />
              <Typography sx={{ alignSelf: "center" }}>/</Typography>
              <TextField
                label="Max HP"
                size="small"
                margin="dense"
                sx={{ width: "5em" }}
              />
            </Stack>
          </Stack>


        </div>

        <div className="section">
          <h1>Hero Skills</h1>
          <div>
            <Grid container columnSpacing={2} justifyContent="space-evenly">
              {skills.map((x, i) =>
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
        <div className="section">
          <h1>Weapons go here</h1>
        </div>

        <div className="section">
          <h1>Credit/Pulp Skills go here</h1>
        </div>
        <div>
          <Snackbar
            open={open}
            TransitionProps={{ onExited: handleExited }}
            autoHideDuration={null}
            onClose={handleClose}
            message={messageInfo ? `${messageInfo.message.type} (${messageInfo.message.rollSummary})` : undefined}
            action={action}
          />
        </div>
      </div>
    </React.Fragment>

  );
}

export default App;
