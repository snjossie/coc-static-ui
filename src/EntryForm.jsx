import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import React, { useEffect } from "react";
import { getBlankInvestigator, createInvestigator } from "./InvestigatorService";
import Button from "@mui/material/Button";

function EntryForm() {
    const [investigator, setInvestigator] = React.useState({
        characteristics: [{}, {}, {}, {}, {}, {}, {}],
    });

    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInvestigator({ ...investigator, [name]: value });
    };

    const onChangeSubObject = (field, x, event) => {
        const value = event.target.value;

        const replacement = { ...investigator };
        replacement[field][x] = value;

        setInvestigator(replacement);
    };

    const onChangeIndexed = (field, i, event) => {
        const value = event.target.value;

        const replacement = { ...investigator };
        replacement[field][i].successValue = value;

        setInvestigator(replacement);
    };

    const doGet = async () => {
        const response = await getBlankInvestigator();

        setInvestigator(response.data);
    };

    const doPost = async () => {
        const response = await createInvestigator(investigator);

        console.log(response);
    };

    const doDump = () => console.log(investigator);

    useEffect( () => {
         doGet();
    }, []);

    return (
        <>
            <Stack>
                <Button onClick={doGet}>Create New</Button>
                <Button onClick={doDump}>Dump Data</Button>
                <Button onClick={doPost}>Save Data</Button>
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
                    label="occupation"
                    size="small"
                    margin="dense"
                    onChange={onChange}
                />
                <TextField
                    value={investigator?.age ?? ""}
                    name="age"
                    label="age"
                    size="small"
                    margin="dense"
                    onChange={onChange}
                />
                <TextField
                    value={investigator?.sex ?? ""}
                    name="sex"
                    label="sex"
                    size="small"
                    margin="dense"
                    onChange={onChange}
                />
                <TextField
                    value={investigator?.archetype ?? ""}
                    name="archetype"
                    label="archetype"
                    size="small"
                    margin="dense"
                    onChange={onChange}
                />
                <TextField
                    value={investigator?.residence ?? ""}
                    name="residence"
                    label="residence"
                    size="small"
                    margin="dense"
                    onChange={onChange}
                />
                <TextField
                    value={investigator?.birthplace ?? ""}
                    name="birthplace"
                    label="birthplace"
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
                    onChange={onChangeSubObject.bind(this, "healthPoints", "nax")}
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
