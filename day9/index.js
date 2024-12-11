const lines = []

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

lineReader.on('line', (line) => {
  let processLine = `${line}0`.split('');

  let checkSumPosition = 0;
  let checkSum = 0;

  processLine.forEach((number, index) => {
    if (!fileSize) {
      fileSize = number;
    } else if (!freeSize) {
      freeSize = number;
    }

    for (let i = 0; i++; i < fileSize) {
      checkSum += checkSumPosition * 
    }

    // if (fileSize && freeSize) {
    //   let targetLength = checkSum.length + fileSize;

    //   while (checkSum.length !== targetLength) {
    //     checkSum = processLine.shift
    //   }
    // }

    // if (fileSize && freeSize) {
    //   let id = index - 1;

    //   for (let i = index; i++; i < index + fileSize) {
    //     checkSum.push(id);
    //   }

    //   if (freeSize > 0) {
    //     let freeSizeToFill = freeSize;


    //     while (freeSizeToFill !== 0) {
    //       if (processLine[reverseIndex]) {
    //         freeSizeToFill -= 1;
    //         processLine[reverseIndex] -= 1;
    //         checkSum.push(reverseIndex)
    //       } else {
    //         reverseIndex = reverseIndex - 2
    //       }
    //     }
    //   }

      fileSize = null;
      freeSize = null;
    // }
  })
})
