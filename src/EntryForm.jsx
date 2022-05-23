import React, { useEffect } from "react";
import { createInvestigator, getBlankInvestigator } from "./InvestigatorService";

import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { green } from '@mui/material/colors';

function EntryForm() {

    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const [investigator, setInvestigator] = React.useState({
        characteristics: [{}, {}, {}, {}, {}, {}, {}],
    });

    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        
        setSuccess(false);
        setInvestigator({ ...investigator, [name]: value });
    };

    const onChangeSubObject = (field, x, event) => {
        const value = event.target.value;

        const replacement = { ...investigator };
        replacement[field][x] = value;

        setSuccess(false);
        setInvestigator(replacement);
    };

    const onChangeIndexed = (field, i, event) => {
        const value = event.target.value;

        const replacement = { ...investigator };
        replacement[field][i].successValue = value;

        setSuccess(false);
        setInvestigator(replacement);
    };

    const doGet = async () => {
        const response = await getBlankInvestigator();

        setSuccess(false);
        setInvestigator(response.data);
    };

    const doPost = async () => {
        setSuccess(false);
        setLoading(true);

        try {
            const response = await createInvestigator(investigator);
            setSuccess(true);
            console.log(response);

        } catch (ex) {
            alert("Saving new investigator failed; check to ensure all fields have a value and that the type (text vs number) makes sense for the field.");
        }

        setLoading(false);
    };

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    const doDump = () => console.log(investigator);

    useEffect(() => {
        doGet();
    }, []);

    return (
        <>
            <Stack>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ m: 1, position: 'relative' }}>
                        <Button
                            variant="contained"
                            onClick={doPost}
                            sx={buttonSx}
                            disabled={loading}
                        >
                            Save Data
                        </Button>
                        {loading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: green[500],
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                    </Box>
                    <Box sx={{ m: 1, position: 'relative' }}>
                        <Button variant="outlined" onClick={doGet}>Create New</Button>
                    </Box>
                    <Box sx={{ m: 1, position: 'relative' }}>
                        <Button variant="outlined" onClick={doDump}>Dump Data</Button>
                    </Box>
                </Box>


                <TextField
                    value={investigator?.name ?? ""}
                    name="name"
                    label="Name"
                    size="small"
                    margin="dense"
                    onChange={onChange}
                />
                <TextField
                    value={investigator?.occupation ?? ""}
                    name="occupation"
                    label="Occupation"
                    size="small"
                    margin="dense"
                    onChange={onChange}
                />
                <TextField
                    value={investigator?.age ?? ""}
                    name="age"
                    label="Age"
                    size="small"
                    margin="dense"
                    onChange={onChange}
                />
                <TextField
                    value={investigator?.sex ?? ""}
                    name="sex"
                    label="Sex"
                    size="small"
                    margin="dense"
                    onChange={onChange}
                />
                <TextField
                    value={investigator?.archetype ?? ""}
                    name="archetype"
                    label="Archetype"
                    size="small"
                    margin="dense"
                    onChange={onChange}
                />
                <TextField
                    value={investigator?.residence ?? ""}
                    name="residence"
                    label="Residence"
                    size="small"
                    margin="dense"
                    onChange={onChange}
                />
                <TextField
                    value={investigator?.birthplace ?? ""}
                    name="birthplace"
                    label="Birthplace"
                    size="small"
                    margin="dense"
                    onChange={onChange}
                />

                <TextField
                    value={investigator?.healthPoints?.current ?? ""}
                    name="healthPoints.current"
                    label="Current HP"
                    size="small"
                    margin="dense"
                    onChange={onChangeSubObject.bind(this, "healthPoints", "current")}
                />
                <TextField
                    value={investigator?.healthPoints?.max ?? ""}
                    name="healthPoints.max"
                    label="HP Max"
                    size="small"
                    margin="dense"
                    onChange={onChangeSubObject.bind(this, "healthPoints", "max")}
                />
                <TextField
                    value={investigator?.sanityPoints?.current ?? ""}
                    name="sanityPoints.current"
                    label="Sanity Current"
                    size="small"
                    margin="dense"
                    onChange={onChangeSubObject.bind(this, "sanityPoints", "current")}
                />
                <TextField
                    value={investigator?.sanityPoints?.max ?? ""}
                    name="sanityPoints.max"
                    label="Sanity Max"
                    size="small"
                    margin="dense"
                    onChange={onChangeSubObject.bind(this, "sanityPoints", "max")}
                />
                <TextField
                    value={investigator?.magicPoints?.current ?? ""}
                    name="magicPoints.current"
                    label="MP Current"
                    size="small"
                    margin="dense"
                    onChange={onChangeSubObject.bind(this, "magicPoints", "current")}
                />
                <TextField
                    value={investigator?.magicPoints?.max ?? ""}
                    name="magicPoints.max"
                    label="MP Max"
                    size="small"
                    margin="dense"
                    onChange={onChangeSubObject.bind(this, "magicPoints", "max")}
                />
                <TextField
                    value={investigator?.luck?.current ?? ""}
                    name="luck.current"
                    label="luck"
                    size="small"
                    margin="dense"
                    onChange={onChangeSubObject.bind(this, "luck", "current")}
                />

                <TextField
                    value={investigator?.characteristics[0]?.successValue ?? ""}
                    name="characteristics[0]"
                    label="APP"
                    size="small"
                    margin="dense"
                    onChange={onChangeIndexed.bind(this, "characteristics", 0)}
                />

                <TextField
                    value={investigator?.characteristics[1]?.successValue ?? ""}
                    name="characteristics[1]"
                    label="CON"
                    size="small"
                    margin="dense"
                    onChange={onChangeIndexed.bind(this, "characteristics", 1)}
                />
                <TextField
                    value={investigator?.characteristics[2]?.successValue ?? ""}
                    name="characteristics[2]"
                    label="DEX"
                    size="small"
                    margin="dense"
                    onChange={onChangeIndexed.bind(this, "characteristics", 2)}
                />
                <TextField
                    value={investigator?.characteristics[3]?.successValue ?? ""}
                    name="characteristics[3]"
                    label="EDU"
                    size="small"
                    margin="dense"
                    onChange={onChangeIndexed.bind(this, "characteristics", 3)}
                />
                <TextField
                    value={investigator?.characteristics[4]?.successValue ?? ""}
                    name="characteristics[4]"
                    label="INT"
                    size="small"
                    margin="dense"
                    onChange={onChangeIndexed.bind(this, "characteristics", 4)}
                />
                <TextField
                    value={investigator?.characteristics[5]?.successValue ?? ""}
                    name="characteristics[5]"
                    label="POW"
                    size="small"
                    margin="dense"
                    onChange={onChangeIndexed.bind(this, "characteristics", 5)}
                />
                <TextField
                    value={investigator?.characteristics[6]?.successValue ?? ""}
                    name="characteristics[6]"
                    label="SIZ"
                    size="small"
                    margin="dense"
                    onChange={onChangeIndexed.bind(this, "characteristics", 6)}
                />
                <TextField
                    value={investigator?.characteristics[7]?.successValue ?? ""}
                    name="characteristics[7]"
                    label="STR"
                    size="small"
                    margin="dense"
                    onChange={onChangeIndexed.bind(this, "characteristics", 7)}
                />

                <TextField
                    value={investigator?.moveRate ?? ""}
                    name="moveRate"
                    label="Move Rate"
                    size="small"
                    margin="dense"
                    onChange={onChange}
                />
                {investigator?.skills?.map((item, i) => (
                    <TextField
                        key={i}
                        value={item.successValue ?? ""}
                        name={`skill[${i}]`}
                        label={item.name}
                        size="small"
                        margin="dense"
                        onChange={onChangeIndexed.bind(this, "skills", i)}
                    />
                ))}
            </Stack>
        </>
    );
}

export default EntryForm;
