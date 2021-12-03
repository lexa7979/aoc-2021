const fs = require("fs");

if (process.env.NODE_ENV !== "test") {
  console.log("Javascript");
  const part = process.env.part || "part1";
  if (part === "part1") {
    console.log(getSolutionPart1());
  } else {
    console.log(getSolutionPart2());
  }
}

function getSolutionPart1() {
  return getPowerConsumptionFromCommonBits(inputDataLines());
}

function getPowerConsumptionFromCommonBits(list) {
  const numberOfBits = list[0].length;
  return getGammaRate(list, numberOfBits) * getEpsilonRate(list, numberOfBits);
}

function getSolutionPart2() {
  return getLifeSupportRatingFromNumberMatchingMostCommonBits(inputDataLines());
}

function getLifeSupportRatingFromNumberMatchingMostCommonBits(list) {
  const numberOfBits = list[0].length;

  const oxygenGeneratorRating = getOxygenGeneratorRating(list, numberOfBits);
  const co2ScrubberRating = getCo2ScrubberRating(list, numberOfBits);

  return oxygenGeneratorRating * co2ScrubberRating;
}

function getGammaRate(list, numberOfBits) {
  let result = 0;
  const lastStringPos = numberOfBits - 1;
  for (let stringPos = 0; stringPos < numberOfBits; stringPos++) {
    const bitValue = 1 << (lastStringPos - stringPos);
    if (getMostCommonBitAtPosition(list, stringPos) === 1) {
      result += bitValue;
    }
  }
  return result;
}

function getEpsilonRate(list, numberOfBits) {
  let result = 0;
  const lastStringPos = numberOfBits - 1;
  for (let stringPos = 0; stringPos < numberOfBits; stringPos++) {
    const bitValue = 1 << (lastStringPos - stringPos);
    if (getLeastCommonBitAtPosition(list, stringPos) === 1) {
      result += bitValue;
    }
  }
  return result;
}

function getOxygenGeneratorRating(list, numberOfBits) {
  let firstCharactersMatch = "";
  let firstMatch = "";
  const _isMatch = (text) => text.startsWith(firstCharactersMatch);
  for (let i = 0; i <= numberOfBits; i++) {
    const linesMatchingWithFirstCharacters = list.filter(_isMatch);
    firstMatch = linesMatchingWithFirstCharacters[0];
    if (linesMatchingWithFirstCharacters.length === 1) {
      break;
    }
    if (i < numberOfBits) {
      firstCharactersMatch += String(
        getMostCommonBitAtPosition(linesMatchingWithFirstCharacters, i)
      );
    }
  }
  return parseInt(firstMatch, 2);
}

function getCo2ScrubberRating(list, numberOfBits) {
  let firstCharactersMatch = "";
  let firstMatch = "";
  const _isMatch = (text) => text.startsWith(firstCharactersMatch);
  for (let i = 0; i <= numberOfBits; i++) {
    const linesMatchingWithFirstCharacters = list.filter(_isMatch);
    firstMatch = linesMatchingWithFirstCharacters[0];
    if (linesMatchingWithFirstCharacters.length === 1) {
      break;
    }
    if (i < numberOfBits) {
      firstCharactersMatch += String(
        getLeastCommonBitAtPosition(linesMatchingWithFirstCharacters, i)
      );
    }
  }
  return parseInt(firstMatch, 2);
}

function getMostCommonBitAtPosition(list, stringPos) {
  let amountOfZeros = 0;
  let amountOfOnes = 0;
  for (let index = 0; index < list.length; index++) {
    if (list[index].charAt(stringPos) === "0") {
      amountOfZeros++;
    } else {
      amountOfOnes++;
    }
  }
  return amountOfOnes >= amountOfZeros ? 1 : 0;
}

function getLeastCommonBitAtPosition(list, stringPos) {
  let amountOfZeros = 0;
  let amountOfOnes = 0;
  for (let index = 0; index < list.length; index++) {
    if (list[index].charAt(stringPos) === "0") {
      amountOfZeros++;
    } else {
      amountOfOnes++;
    }
  }
  return amountOfOnes >= amountOfZeros ? 0 : 1;
}

function inputDataLines(filename = "input.txt", asInteger = false) {
  const lines = fs.readFileSync(filename).toString().trim().split("\n");
  return asInteger ? lines.map((x) => parseInt(x)) : lines;
}

module.exports = {
  getPowerConsumptionFromCommonBits,
  getLifeSupportRatingFromNumberMatchingMostCommonBits,
  getSolutionPart1,
  getSolutionPart2,
  inputDataLines,
};
