const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

lineReader.on('line', (line) => {
  const stoneCalc = (blinks, stones) => {
    let registry = Object.fromEntries(stones.map(x => [x, 1]))
    
    let scratch = {}

    while (blinks !== 0) {
      scratch = { ...registry }
      Object.keys(registry).forEach((stone) => {
        scratch[stone] = scratch[stone] - registry[stone]

        if (stone === '0') {
          scratch['1'] = (scratch['1'] ?? 0) + registry[stone]
        } else if (!(stone.length % 2)) {
          scratch[`${+(stone.split('').slice(0, stone.length / 2).join(''))}`] = (scratch[`${+(stone.split('').slice(0, stone.length / 2).join(''))}`] ?? 0) + registry[stone]
          scratch[`${+(stone.split('').slice(stone.length / 2).join(''))}`] = (scratch[`${+(stone.split('').slice(stone.length / 2).join(''))}`] ?? 0) + registry[stone]
        } else {
          scratch[`${(+stone) * 2024}`] = (scratch[`${(+stone) * 2024}`] ?? 0) + registry[stone]
        }
      })

      registry = {
        ...registry,
        ...scratch,
      }
    
      blinks -= 1;
    }

    return Object.values(registry).reduce((x, y) => x + y, 0)
  }

  console.log(stoneCalc(25, line.split(' ')), stoneCalc(75, line.split(' ')));
})
