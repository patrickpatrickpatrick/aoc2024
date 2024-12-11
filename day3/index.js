const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

let total = 0;
let total2 = 0;

let doIt = true;

lineReader.on('line', (line) => {
  const muls = line.match(/mul\(\d+.\d+\)/g);
  const mulsDos = line.match(/mul\(\d+.\d+\)|don't\(\)|do\(\)/g);

  while (mulsDos.length) {
    const currIns = mulsDos.shift();

    doIt = currIns.match(/don't\(\)|do\(\)/g) ? !!currIns.match(/do\(\)/g) : doIt

    if (currIns.match(/mul\(\d+.\d+\)/g) && doIt) {
      total2 += currIns.match(/\d+/g).map(x => Number(x)).reduce((x, y) => x * y, 1)
    }
  }

  total += muls.map(mul => mul.match(/\d+/g).map(x => Number(x)).reduce((x, y) => x * y, 1)).reduce((a, b) => a + b, 0)
})

lineReader.on('close', line => {
  console.log(total)
  console.log(total2)
})