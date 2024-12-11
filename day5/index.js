const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

const rules = {}
const pageSequences = []

lineReader.on('line', (line) => {
  if (line.split('|').length === 2) {
    const [ key, val ] = line.split('|');
    rules[key] = (rules[key] ?? []).push(val);
  }

  if (line.split(',').length) {
    pageSequences.push(line.split(','))
  }
})

const scanBehind = (arr, key, curr) => {
  if (!arr.length) {
    return true
  }

  if (rules[key].find(rule => rule === curr)) {
    return false
  }

  const newCurr = arr.pop();

  return scanBehind(arr, key, newCurr);
}

lineReader.on('close', line => {
  pageSequences.forEach(pageSeq => {
    pageSeq.split('').reverse().forEach(pageNumber => {

    })
  })
})