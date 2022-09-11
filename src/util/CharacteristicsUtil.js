
export function getCharacteristicValue(characteristic, allCharacteristics) {
    if (!allCharacteristics) {
        return NaN;
    }

    for (let c of allCharacteristics) {
        if (c.name?.toLowerCase() === characteristic?.toLowerCase()) {
            return c.successValue;
        }
    }

    return NaN;
}
