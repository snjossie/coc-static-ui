export function chunk(input, itemsPerChunk) {
  if (!input) {
    return input;
  }

  return input.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / itemsPerChunk);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);
}
