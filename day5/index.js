const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

const rules = {}
const pageSequences = []

lineReader.on('line', (line) => {
  if (line.match(/\|/g)) {
    const [ key, val ] = line.split('|');
    rules[key] = (rules[key] ?? [])
    rules[key].push(val)
  }

  if (line.match(/\,/g)) {
    pageSequences.push(line.split(','))
  }
})

lineReader.on('close', line => {
  let medium = 0

  pageSequences.forEach(pageSeq => {
    let validSeq = true;

    for (const [index, page] of pageSeq.entries()) {
      if (rules[page]) {
        const currSeq = pageSeq.slice(0, index).join(',');
        validSeq = validSeq && !currSeq.match(new RegExp(rules[page].join('|'), 'g'))
      }

      if (!validSeq) {
        break; 
      }
    }

    if (validSeq) {
      medium += +pageSeq[Math.floor(pageSeq.length / 2)]
      // medium.push(pageSeq[Math.floor(pageSeq.length / 2)])
    } 
  })


  console.log(medium)
})