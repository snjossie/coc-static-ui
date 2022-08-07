
export function getCharacteristicValue(characteristic, allCharacteristics) {
    for (let c of allCharacteristics) {
        if (c.name?.toLowerCase() === characteristic?.toLowerCase()){
            return c.successValue;
        }
    }

    return NaN;
}
