const fs = require("fs");

function inputDataLinesIntegers(filename = "input.txt") {
  return fs
    .readFileSync(filename)
    .toString()
    .trim()
    .split("\n")
    .map((x) => parseInt(x));
}

// const Global = {
//   sortedPrimes: [2, 3, 5, 7],
//   max: 10,
// };

function _isPrime(x) {
  // if (x > Global.max) {
  //   for (let testNumber = Global.max; testNumber <= x; testNumber++) {
  //     if (Global.sortedPrimes.every((prime) => testNumber % prime)) {
  //       Global.sortedPrimes.push(testNumber);
  //     }
  //   }
  //   Global.max = x;
  // }
  // return Global.sortedPrimes.includes(x);

  if (x < 3) {
    return x === 2;
  }
  const testStop = Math.floor(Math.sqrt(x));
  for (let i = 2; i <= testStop; i++) {
    if (x % i === 0) {
      return false;
    }
  }
  return true;
}

function _sumOfProductsPrimesWithIndex(list) {
  return list
    .map((number, index) => ({ number, index }))
    .filter(({ number }) => _isPrime(number))
    .map(({ number, index }) => number * index)
    .reduce((acc, curr) => acc + curr, 0);
}

function _sumOfNonPrimesWithAlternatingSigns(list) {
  return list
    .map((number, index) => ({ number, index }))
    .filter(({ number }) => !_isPrime(number))
    .map(({ number, index }) => (index % 2 === 0 ? number : -number))
    .reduce((acc, curr) => acc + curr, 0);
}

function getSolutionPart1() {
  return _sumOfProductsPrimesWithIndex(inputDataLinesIntegers());
}

function getSolutionPart2() {
  return _sumOfNonPrimesWithAlternatingSigns(inputDataLinesIntegers());
}

console.log("Javascript");
const part = process.env.part || "part1";

if (part === "part1") {
  console.log(getSolutionPart1());
} else {
  console.log(getSolutionPart2());
}

module.exports = {
  _isPrime,
  _sumOfProductsPrimesWithIndex,
  _sumOfNonPrimesWithAlternatingSigns,
  getSolutionPart1,
  getSolutionPart2,
  inputDataLinesIntegers,
};
