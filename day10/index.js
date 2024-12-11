const lines = []

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

lineReader.on('line', (line) => {
  lines.push(line.split('').map(x => +x));
})

lineReader.on('close', line => {
  let total = []
  let trailHeadScore = 0
  let totalScore = 0

  const searchFor = (number, row, column, ends) => {
    if (!(row < 0 || row === lines.length || column < 0 || column === lines[0].length)) {
      if (lines[row][column] === number) {
        if (number === 9) {
          totalScore += 1;
          ends.add(`${row},${column}`);
        } else {
          searchFor(number + 1, row + 1, column, ends)
          searchFor(number + 1, row - 1, column, ends)
          searchFor(number + 1, row, column + 1, ends)
          searchFor(number + 1, row, column - 1, ends)
        }
      }
    }
  }

  lines.forEach((line, row) => {
    line.forEach((number, column) => {
      let ends = new Set();
      searchFor(0, row, column, ends);
      trailHeadScore += ends.size
    })
  })

  console.log(trailHeadScore, totalScore)
})
