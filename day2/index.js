const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

const safeSequence = [];
const bugSequence = [];

const seqChecker = (numbers) => {
  const checkNumbers = [...numbers];

  let safe;
  let dir;
  let next;

  let curr = checkNumbers.shift();

  while (checkNumbers.length) {

    next = checkNumbers.shift();
    let diff = curr - next;

    safe = Math.abs(diff) >= 1 && Math.abs(diff) <= 3

    if (dir === undefined) {
      dir = diff / Math.abs(diff);
    }

    safe = safe && (dir === diff / Math.abs(diff));

    if (!safe) {
      break;
    }

    curr = next;
  }

  return safe;
}

lineReader.on('line', (line) => {
  const numbers = line.split(' ').map(n => +n)

  const safe = seqChecker(numbers);

  safeSequence.push(safe)

  if (!safe) {
    let bugSafe = false;

    for (var i = 0; i < numbers.length; i++) {
      const numbersToCheck = [...numbers];
      numbersToCheck.splice(i, 1);
      bugSafe = bugSafe || seqChecker(numbersToCheck);

      if (bugSafe) {
        break;
      }
    }
    
    bugSequence.push(bugSafe)
  }
})

lineReader.on('close', line => {
  console.log(safeSequence.filter(x => x).length)
  console.log(safeSequence.filter(x => x).length + bugSequence.filter(x => x).length)
})