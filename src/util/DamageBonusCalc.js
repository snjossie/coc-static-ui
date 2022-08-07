
const table = [
    { value: 64, bonus: "-2", build: -2 },
    { value: 84, bonus: "-1", build: -1 },
    { value: 124, bonus: "0", build: 0 },
    { value: 164, bonus: "+1d4", build: 1 },
    { value: 204, bonus: "+1d6", build: 2 },
    { value: 284, bonus: "+2d6", build: 3 },
    { value: 364, bonus: "+3d6", build: 4 },
    { value: 444, bonus: "+4d6", build: 5 },
    { value: 524, bonus: "+5d6", build: 6 }    
]

export function determineDamageBonus(strength, size) {
    const combinedVal = strength + size;

    if (isNaN(strength) || isNaN(size)) {
        alert("STR or SIZ was NaN. Aborting and returning 0.");
        return 0;
    }

    for(let row of table) {
        if(combinedVal <= row.value) {
            return row.bonus;
        }
    }

    alert("Strength + Size exceeded max value from table. Consult rule book for rule to use. Returning the maximum build from the predefined table.");
    return table[table.length - 1];
}
