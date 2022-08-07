import '../App.css';

import * as React from 'react';

import { ArbitraryRollSummary, LuckRollSummary } from '../SkillRollSummary';
import { Backdrop, Box, CircularProgress, Divider, Grid, Link, SvgIcon } from '@mui/material';
import { getInvestigator, updateInvestigator } from '../InvestigatorService';
import { rollArbitrarily, rollDamage, rollDice, rollLuckRecovery } from '../dice/DiceFuncs';

import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Button from '@mui/material/Button';
import CasinoIcon from '@mui/icons-material/Casino';
import CloseIcon from '@mui/icons-material/Close';
import { ReactComponent as CloverIcon } from '../img/clover.svg'
import CreditPanel from '../components/CreditPanel';
import { DiceRoll } from '@dice-roller/rpg-dice-roller';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { InputAdornment } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ResourcePanel from '../components/ResourcePanel';
import SkillComponent  from '../components/SkillComponent';
import {SkillImprovementDialog} from '../components/SkillImprovementDialog';
import { SkillImprovementRollSummary } from '../dice/SkillImprovementRollSummary';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack'
import TalentsPanel from '../components/TalentsPanel';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';
import WeaponsPanel from '../components/WeaponsPanel';
import _ from 'lodash';
import { checkIfValidUUID } from '../util/UuidFuncs';
import { chunk } from '../util/ArrayFuncs';
import { determineDamageBonus } from '../util/DamageBonusCalc';
import { getCharacteristicValue } from '../util/CharacteristicsUtil';
import { useParams } from 'react-router-dom';

function InvestigatorPage() {

  const { id } = useParams();

  const [arbitraryRoll, setArbitraryRoll] = React.useState("1d6");

  const [snackPack, setSnackPack] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);

  const [openDialog, setOpenDialog] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [improvements, setImprovements] = React.useState([]);

  const [investigator, setInvestigator] = React.useState({ name: "", age: "", sex: "", archetype: "", birthplace: "", occupation: "" });
  const [skills, setSkills] = React.useState({});

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    setInvestigator({ ...investigator, [name]: value });
  };

  const handleAddWeapon = () => { 
    let replacement = {...skills};
    replacement.weapons.push({ ammo: "",
      damageRoll: "1d3 + db",
      extremeSuccessValue: 0,
      hardSuccessValue: 0,
      malfunction: "",
      name: "Example Weapon",
      numberOfAttacks: 1,
      range: "",
      successValue: 0
    });
    
    setSkills(replacement);
  }

  const handleDeleteWeapon = (i, e) => {
    let replacement = {...skills};
    replacement.weapons.splice(i, 1);

    setSkills(replacement);
    handleSave();
  }

  const handleWeaponChange = (index, event) => {
    const name = event.target.name;
    const value = event.target.value;
  
    let replacement = {...skills};
    replacement.weapons[index][name] = value;

    if (name === "successValue") {
      replacement.weapons[index]["hardSuccessValue"] = Math.floor(value * 0.5);
      replacement.weapons[index]["extremeSuccessValue"] = Math.floor(value * 0.2);
    }

    setSkills(replacement);
    debouncedSave();
  }

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

  const handleSkillSuccess = (skill, event) => {

    console.log(`${skill.name} successfully-used value toggled`);

    const replacement = { ...skills };
    const s = replacement.skills.find(s => s.name === skill.name);
    s.usedSuccessfully = !s.usedSuccessfully;

    setInvestigator(replacement);
    handleSave();
  }

  const handleSkillImprovements = () => { 

    const results = [];
    const replacement = { ...skills };

    for(let s of skills.skills) {
      if(s.usedSuccessfully) {
        const si = replacement.skills.find(sk => sk.name === s.name);
        const currentSkillValue = s.successValue;
        si.usedSuccessfully = false;

        const roll = new DiceRoll("1d100");
        if (roll.total > s.successValue || s.successValue > 95) {
          const improvementRoll = new DiceRoll("1d10");
          console.log(`skill ${s.name} improves from ${s.successValue} to ${s.successValue + improvementRoll.total}`);

          si.successValue += improvementRoll.total;

          if(s.successValue < 90 && s.successValue + improvementRoll.total >= 90) {
            const sanityRoll = new DiceRoll("2d6");

            replacement.sanityPoints.current = 
              _.clamp(replacement.sanityPoints.current + sanityRoll.total, 0, replacement.sanityPoints.max);

            console.log(`attaining 90% skill recovers ${sanityRoll.total} sanity`);
            results.push(new SkillImprovementRollSummary(roll, s, currentSkillValue, improvementRoll, sanityRoll, true));
          } else {
            results.push(new SkillImprovementRollSummary(roll, s, currentSkillValue, improvementRoll, 0, true));
          }
        } else {
          console.log(`skill ${s.name} does not improve`);
          results.push(new SkillImprovementRollSummary(roll, s, currentSkillValue, 0, 0, false));
        }
      }
    }

    setInvestigator(replacement);
    handleSave();

    setImprovements(results);
    setOpenDialog(true);
  }

  const onTalentsChanged = (event) => {
    const replacement = { ...skills };
    replacement.talents = event.target.value;
    setSkills(replacement);
    handleSave();
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleCloseDialog = (value) => {
    setOpenDialog(false);
  };

  const handleDamageRoll = (rollDefinition, successValue) => {
    let dmgRollDef = rollDefinition;
    if(rollDefinition?.toLowerCase()?.includes('db'))
    {
      const str = getCharacteristicValue("STR", skills?.characteristics);
      const siz = getCharacteristicValue("SIZ", skills?.characteristics);
      const db = determineDamageBonus(str, siz);
      console.log(`damage bonus determined to be: ${db}`);

      dmgRollDef = rollDefinition.toLowerCase().replace("db", " " + db);
    }

    const message = rollDamage(dmgRollDef, successValue);

    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  } 

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
    handleSave();
  }
  
  const handleUpdateLuck = (luckRoll, recoveryRoll) => {
    if (!luckRoll || !recoveryRoll) {
      alert("Luck recovery failed :(");      
    }

    const newSkills = { ...skills };
    newSkills.luck.current = _.clamp(skills.luck.current + recoveryRoll.total, 0, 99);
    setSkills(newSkills);

    const message = new LuckRollSummary(`Recovery roll: ${luckRoll}`, `Recovered: ${recoveryRoll} luck`);

    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  const handleSave = async () => {
    try {
      await updateInvestigator(skills);
    } catch (ex){
      alert("Failed to save" + ex);
    }
  };
  
  const debouncedSave = React.useMemo(() => _.debounce(handleSave, 300), [skills]);

  const onChangeSubObject = (field, x, event) => {
    const value = event.target.value;

    const replacement = { ...skills };
    replacement[field][x] = value;

    setSkills(replacement);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  const handleLuckChange = event => {
    const replacement = { ...skills };
    replacement.luck.current = event.target.value;

    setSkills(replacement);
  }

  const handleArbitraryRollChanged = event => {
    setArbitraryRoll(event.target.value);
  }

  const handleDoArbitraryRoll = () => {
    const rollResult = rollArbitrarily(arbitraryRoll);
    const message = new ArbitraryRollSummary("Arbitrary Roll", rollResult);
    
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  }

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

      <div className="App invesigatorPage">
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
            // onFieldBlur={handleSave}
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

            <Grid container columnSpacing={0} justifyContent="space-evenly" alignItems="stretch">
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
                  disabled={true}
                  onChange={handleChange}
                />
                <Grid item xs={3}>
                  <TextField 
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" onClick={handleDoArbitraryRoll}>
                            <CasinoIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    value={arbitraryRoll}
                    onChange={handleArbitraryRollChanged}
                    onKeyPress={(ev) => {
                      if (ev.key === 'Enter') {
                        handleDoArbitraryRoll(ev);
                        ev.preventDefault();
                      }
                    }}
                    fullWidth={true}
                    label="Arbitrary Roll"
                    size="small"
                    margin="dense"
                    sx={{ width: "15em" }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Box sx={{ width: "15em" }}>
                  <Link 
                    href="https://dice-roller.github.io/documentation/guide/notation/dice.html"
                    target="_blank"
                    sx={{ width: "15em" }}
                  >
                    Dice Notation
                  </Link>
                  </Box>
                </Grid>

              </Grid>

              <Grid item xs={3}>
                <Stack direction="column">
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {/* <CasinoIcon color="success" /> */}
                          <SvgIcon component={CloverIcon} color="success" inheritViewBox />
                        </InputAdornment>
                      )
                    }}
                    label="Luck"
                    value={skills?.luck?.current ?? ""}
                    size="small"
                    margin="dense"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    sx={{ width: "5em" }}
                    onChange={handleLuckChange}
                    onBlur={handleSave}
                  />
                  <Button
                    variant='outlined'
                    onClick={e => rollLuckRecovery(skills?.luck?.current ?? 0, handleUpdateLuck)}
                  >
                    Luck Recovery
                  </Button>
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
                      onChange={onChangeSubObject.bind(this, "healthPoints", "current")}
                      onBlur={handleSave}
                    />
                    <Typography sx={{ alignSelf: "center" }}>/</Typography>
                    <TextField
                      label="Max HP"
                      value={skills?.healthPoints?.max ?? ""}
                      size="small"
                      margin="dense"
                      sx={{ minWidth: "5em" }}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      onChange={onChangeSubObject.bind(this, "healthPoints", "max")}
                      onBlur={handleSave}
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
                      onChange={onChangeSubObject.bind(this, "sanityPoints", "current")}
                      onBlur={handleSave}
                    />
                    <Typography sx={{ alignSelf: "center" }}>/</Typography>
                    <TextField
                      label="Max Sanity"
                      value={skills?.sanityPoints?.max ?? ""}
                      size="small"
                      margin="dense"
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      sx={{ minWidth: "5em" }}
                      onChange={onChangeSubObject.bind(this, "sanityPoints", "max")}
                      onBlur={handleSave}
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
                      onChange={onChangeSubObject.bind(this, "magicPoints", "current")}
                      onBlur={handleSave}
                    />
                    <Typography sx={{ alignSelf: "center" }}>/</Typography>
                    <TextField
                      label="Max MP"
                      value={skills?.magicPoints?.max ?? ""}
                      size="small"
                      margin="dense"
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      sx={{ minWidth: "5em" }}
                      onChange={onChangeSubObject.bind(this, "magicPoints", "max")}
                      onBlur={handleSave}
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
                        hasCheckbox={true}
                        className={j % 2 === 1 ? "banding" : null}
                        successValue={item.successValue}
                        skill={item}
                        rollDice={rollDice}
                        openFunc={message => handleClick(message)()}
                        handleSkillSuccess={handleSkillSuccess} />
                    )}

                  </Stack>
                </Grid>
              )}
            </Grid>
          </div>
        </div>

        <Divider />

        <div className="section">
          <Stack direction="row" spacing={2}>
            <Typography variant="h5">Weapons</Typography>
            <Button onClick={handleAddWeapon}>Add Weapon</Button>
          </Stack>
          <WeaponsPanel
            weapons={skills?.weapons}
            handleDamageRoll={handleDamageRoll}
            handleWeaponChange={handleWeaponChange}
            handleDeleteWeapon={handleDeleteWeapon}
          />
        </div>

        <Divider />

        <div className="section">
          <Grid container columnSpacing={2}>
            <Grid item xs={6}>
              <CreditPanel 
                cash={skills.cash ?? 0}
                assets={skills.assets ?? 0}
                spendingLevel={skills.spendingLevel ?? 0}
              />
            </Grid>
            <Grid item xs={6}>
              <TalentsPanel
                talents={skills.talents ?? []}
                onTalentsChanged={onTalentsChanged}
              />
            </Grid>
          </Grid>
        </div>
      </div>

      <Divider />
      <div className="section" style={{display: "flex", justifyContent: "flex-end"}}>
        <Button
          variant="contained"
          color="warning"
          size="small"
          onClick={handleSkillImprovements}
        >
          Execute Skill Improvement
        </Button>
      </div>

      <SkillImprovementDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        improvements={improvements}
      />
    </React.Fragment>

  );
}

export default InvestigatorPage;
