const Helpers = require("./helpers");

Helpers.setParseOptions({
  transformMatch: null,
  asInteger: false,
});

const ADJACENT_OFFSETS = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];

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
  const lines = Helpers.parseInputData();
  return calculateRiskLevel(lines);
}

function getSolutionPart2() {
  const lines = Helpers.parseInputData();
  return getFactorOfThreeLargestBasinSizes(lines);
}

function calculateRiskLevel(lines) {
  let riskLevel = 0;
  for (let x = 0; x < lines[0].length; x++) {
    for (let y = 0; y < lines.length; y++) {
      const currDigit = parseInt(lines[y][x], 10);
      const lowestNeighbor = getLowestAdjacentDigit(lines, x, y);
      if (currDigit < lowestNeighbor) {
        riskLevel += 1 + currDigit;
      }
    }
  }
  return riskLevel;
}

function getFactorOfThreeLargestBasinSizes(lines) {
  const basinSizes = [];
  for (let x = 0; x < lines[0].length; x++) {
    for (let y = 0; y < lines.length; y++) {
      const currDigit = parseInt(lines[y][x], 10);
      const lowestNeighbor = getLowestAdjacentDigit(lines, x, y);
      if (currDigit < lowestNeighbor) {
        basinSizes.push(getBasinSize(lines, x, y));
      }
    }
  }
  const largestBasinSizes = basinSizes.sort((a, b) => a - b).slice(-3);
  return largestBasinSizes[0] * largestBasinSizes[1] * largestBasinSizes[2];
}

function getLowestAdjacentDigit(lines, x, y) {
  let minimumAdjacentDigit = null;
  ADJACENT_OFFSETS.forEach(([diffX, diffY]) => {
    const digit = parseInt(lines[y + diffY]?.[x + diffX], 10);
    if (!isNaN(digit) && (minimumAdjacentDigit == null || digit < minimumAdjacentDigit)) {
      minimumAdjacentDigit = digit;
    }
  });
  return minimumAdjacentDigit;
}

function getBasinSize(lines, startX, startY) {
  const locationsInsideBasin = [];
  const _checkRecursive = (x, y) => {
    if (lines[y]?.[x] == null || lines[y]?.[x] === "9" || locationsInsideBasin.includes(`${x}-${y}`)) {
      return;
    }
    locationsInsideBasin.push(`${x}-${y}`);
    _checkRecursive(x - 1, y);
    _checkRecursive(x, y - 1);
    _checkRecursive(x + 1, y);
    _checkRecursive(x, y + 1);
  };
  _checkRecursive(startX, startY);
  return locationsInsideBasin.length;
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2,

  calculateRiskLevel,
  getLowestAdjacentDigit,
  getBasinSize,
  getFactorOfThreeLargestBasinSizes,
};
