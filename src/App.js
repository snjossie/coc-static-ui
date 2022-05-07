import './App.css';
import { Skill } from './skill';
import { DiceRoll } from '@dice-roller/rpg-dice-roller';
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
import Container, { containerClasses } from '@mui/material/Container';

function rollDice(successValue, openFunc) {

  const result = new DiceRoll("1d100");
  console.log(result.output);

  const extremeSuccess = Math.floor(successValue * 0.2);
  const hardSuccess = Math.floor(successValue * 0.5);

  let severity = "Unknown!";

  if ((successValue < 50 && result.total >= 96) || result.total === 100) {
    severity = "Fumble";
    console.log("Fumble");
  } else if (result.total <= extremeSuccess) {
    severity = "Extreme Success";
    console.log("Extreme Success!");
  } else if (result.total <= hardSuccess) {
    severity = "Hard Success";
    console.log("Hard Success!");
  } else if (result.total <= successValue) {
    severity = "Success";
    console.log("Success!");
  } else {
    severity = "Failure";
    console.log("Failure :(");
  }

  openFunc(`${severity} (${result.output})`);
}

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
      <Button color="secondary" size="small" onClick={handleClose}>
        SPEND LUCK
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        {/* <CloseIcon fontSize="small" /> */}
        <span>X</span>
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
          <div className="characteristics">
            <div className="characteristic">
              <div className="chr-nme">STR</div>
              <div className="chr-success"><input type="button" value="40" /></div>
              <div className="chr-bigsuccess">20</div>
              <div className="chr-extremesuccess">8</div>
            </div>
            <div className="characteristic">
              <div className="chr-nme">CON</div>
              <div className="chr-success"><input type="button" value="40" /></div>
              <div className="chr-bigsuccess">20</div>
              <div className="chr-extremesuccess">8</div>
            </div>
            <div className="characteristic">
              <div className="chr-nme">SIZ</div>
              <div className="chr-success"><input type="button" value="40" /></div>
              <div className="chr-bigsuccess">20</div>
              <div className="chr-extremesuccess">8</div>
            </div>
            <div className="characteristic">
              <div className="chr-nme">DEX</div>
              <div className="chr-success"><input type="button" value="40" /></div>
              <div className="chr-bigsuccess">20</div>
              <div className="chr-extremesuccess">8</div>
            </div>
            <div className="characteristic">
              <div className="chr-nme">APP</div>
              <div className="chr-success"><input type="button" value="40" /></div>
              <div className="chr-bigsuccess">20</div>
              <div className="chr-extremesuccess">8</div>
            </div>
            <div className="characteristic">
              <div className="chr-nme">EDU</div>
              <div className="chr-success"><input type="button" value="40" /></div>
              <div className="chr-bigsuccess">20</div>
              <div className="chr-extremesuccess">8</div>
            </div>
            <div className="characteristic">
              <div className="chr-nme">INT</div>
              <div className="chr-success"><input type="button" value="40" /></div>
              <div className="chr-bigsuccess">20</div>
              <div className="chr-extremesuccess">8</div>
            </div>
            <div className="characteristic">
              <div className="chr-nme">POW</div>
              <div className="chr-success"><input type="button" value="40" /></div>
              <div className="chr-bigsuccess">20</div>
              <div className="chr-extremesuccess">8</div>
            </div>
            <div className="characteristic">
              <div className="chr-nme" style={{ fontSize: "x-large" }}>Move Rate</div>
              <div className="chr-success">7</div>
            </div>
          </div>
        </div>

        <div className="section">
          <Stack direction="row" spacing={5} justifyContent="space-between">
            <div>
              <TextField
                label="HP"
                size="small"
                margin="dense"
                sx={{ width: "5em" }}
              />
              <span>/</span>
              <TextField
                label="Max HP"
                size="small"
                margin="dense"
                sx={{ width: "5em" }}
              />
            </div>
            <div>
              <TextField
                label="Sanity"
                size="small"
                margin="dense"
                sx={{ width: "5em" }}
              />
              <span>/</span>
              <TextField
                label="Max Sanity"
                size="small"
                margin="dense"
                sx={{ width: "5em" }}
              />
            </div>
            <div>
              <TextField
                label="MP"
                size="small"
                margin="dense"
                sx={{ width: "5em" }}
              />
              <span>/</span>
              <TextField
                label="Max MP"
                size="small"
                margin="dense"
                sx={{ width: "5em" }}
              />
            </div>
            <div>
              <TextField
                label="Luck"
                size="small"
                margin="dense"
                sx={{ width: "5em" }}
              />
            </div>
          </Stack>


        </div>

        <div className="section">
          <h1>Hero Skills</h1>
          <div className="skills-container">
            {arr.map((x, i) =>
              <SkillComponent
                key={x.name}
                name={x.name}
                successValue={x.successValue}
                rollDice={rollDice}
                openFunc={message => handleClick(message)()} />
            )}
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
            message={messageInfo ? messageInfo.message : undefined}
            action={action}
          />
        </div>
      </div>
    </React.Fragment>

  );
}

export default App;
