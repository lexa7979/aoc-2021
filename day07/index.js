const Helpers = require("./helpers");

Helpers.setParseOptions({
  transformMatch: null,
  asInteger: false,
});

const Global = {
  costsByMove: {},
};

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
  const setup = parseInitialHorizontalPositions(Helpers.parseInputData());
  return getLeastFuelNeededToReachSamePosition(setup, 1);
}

function getSolutionPart2() {
  const setup = parseInitialHorizontalPositions(Helpers.parseInputData());
  return getLeastFuelNeededToReachSamePosition(setup, 2);
}

function parseInitialHorizontalPositions(lines) {
  return lines[0].split(",").map(text => parseInt(text, 10));
}

function getLeastFuelNeededToReachSamePosition(setup, variant) {
  let minPosition = setup[0];
  let maxPosition = setup[0];
  for (let i = 1; i < setup.length; i++) {
    minPosition = Math.min(minPosition, setup[i]);
    maxPosition = Math.max(maxPosition, setup[i]);
  }

  while (minPosition < maxPosition) {
    const position = Math.floor((maxPosition + minPosition) / 2);
    const prev = getNeededFuelForAllToReachPosition(setup, position - 1, variant);
    const curr = getNeededFuelForAllToReachPosition(setup, position, variant);
    const next = getNeededFuelForAllToReachPosition(setup, position + 1, variant);
    const min = Math.min(prev, curr, next);
    if (min === curr) {
      return curr;
    }
    if (min === prev) {
      maxPosition = position;
    } else {
      minPosition = position;
    }
  }

  return getNeededFuelForAllToReachPosition(setup, minPosition, variant);
}

function getNeededFuelForAllToReachPosition(setup, position, variant = 1) {
  let sum = 0;
  if (variant === 1) {
    for (let i = 0; i < setup.length; i++) {
      if (setup[i] !== position) {
        sum += Math.abs(setup[i] - position);
      }
    }
  } else {
    for (let i = 0; i < setup.length; i++) {
      if (setup[i] !== position) {
        sum += getCostOfMove(Math.abs(setup[i] - position));
      }
    }
  }
  return sum;
}

function getCostOfMove(diff) {
  if (!Global.costsByMove[diff]) {
    Global.costsByMove[diff] = (diff * (diff + 1)) / 2;
  }
  return Global.costsByMove[diff];
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2,
  parseInitialHorizontalPositions,
  getNeededFuelForAllToReachPosition,
  getLeastFuelNeededToReachSamePosition,
  getCostOfMove,
};
