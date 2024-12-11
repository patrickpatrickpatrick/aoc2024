const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

let lefts = []
let rights = []

lineReader.on('line', (line) => {
  const [ left, right ] = line.match(/(\d+)/g)
  lefts.push(Number(left));
  rights.push(Number(right));
});

lineReader.on('close', () => {
  lefts = lefts.sort((b, a) => b - a)
  rights = rights.sort((b, a) => b - a)

  const diffFind = (lefts, rights, sum = 0) => {
    const left = lefts.pop()
    const right = rights.pop()
    sum += Math.abs(left - right)

    if (lefts.length + rights.length) {
      return diffFind(lefts, rights, sum)
    } else {
      return sum;
    }
  }

  const simFind = (lefts, rights) => lefts.map(
    left => rights.filter(right => right === left).length * left
  ).reduce((acc, sum) => acc + sum, 0)

  console.log(diffFind([...lefts], [...rights]))
  console.log(simFind([...lefts], [...rights]))
})
