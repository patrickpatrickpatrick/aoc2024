const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

let xmasCount = 0;
let crossMasCount = 0;
let lines = [];
let crossPoints = new Set();

lineReader.on('line', (line) => {
  lines.push(line.split(''));
})

lineReader.on('close', line => {
  const nextLetterMas = {
    M: 'A',
    A: 'S',
    S: '*',
  }

  const nextLetterXmas = {
    X: 'M',
    ...nextLetterMas
  }

  const searchFor = (letter, row, column, nextLetters, direction) => {
    if (letter === '*') {
      return 1;
    }

    if (row < 0 || row === lines.length || column < 0 || column === lines[0].length) {
      return 0;
    }

    if (lines[row][column] === letter) {
      return searchFor(nextLetters[letter], row + direction[0], column + direction[1], nextLetters, direction)
    }

    return 0
  }

  lines.forEach((line, lineIndex) => {
    line.map((letter, letterIndex) => {
      if (letter === 'X') {
        [
          [0, 1],
          [0, -1],
          [1, 0],
          [-1, 0],
          [-1, -1],
          [1, 1],
          [-1, 1],
          [1, -1],
        ].forEach(coord => {
          xmasCount += searchFor(letter, lineIndex, letterIndex, nextLetterXmas, coord)  
        })
      }

      if (letter === 'M') {
        if (searchFor(letter, lineIndex, letterIndex, nextLetterMas, [1, 1])) {
          crossMasCount += Number(crossPoints.has(`${lineIndex + 1},${letterIndex + 1}`))
          crossPoints.add(`${lineIndex + 1},${letterIndex + 1}`)
        }

        if (searchFor(letter, lineIndex, letterIndex, nextLetterMas, [-1, -1])) {
          crossMasCount += Number(crossPoints.has(`${lineIndex - 1},${letterIndex - 1}`))
          crossPoints.add(`${lineIndex - 1},${letterIndex - 1}`)
        }

        if (searchFor(letter, lineIndex, letterIndex, nextLetterMas, [1, -1])) {
          crossMasCount += Number(crossPoints.has(`${lineIndex + 1},${letterIndex - 1}`))
          crossPoints.add(`${lineIndex + 1},${letterIndex - 1}`)
        }

        if (searchFor(letter, lineIndex, letterIndex, nextLetterMas, [-1, 1])) {
          crossMasCount += Number(crossPoints.has(`${lineIndex - 1},${letterIndex + 1}`))
          crossPoints.add(`${lineIndex - 1},${letterIndex + 1}`)
        }
      }
    })
  })

  console.log(xmasCount, crossMasCount)
})