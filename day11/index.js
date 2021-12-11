const Helpers = require("./helpers");

const ADJACENT_POSITIONS_OFFSET = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

Helpers.setParseOptions({
  transformMatch: null,
  asInteger: false,
});

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
  const setup = parseLinesIntoOctopusGrid(lines);
  return getNumberOfFlahesAfterSeveralSteps(setup, 100);
}

function getSolutionPart2() {
  const lines = Helpers.parseInputData();
  const setup = parseLinesIntoOctopusGrid(lines);
  return getNumberOfStepsUntilFirstTotalFlash(setup);
}

function parseLinesIntoOctopusGrid(lines) {
  return lines.map(text => text.split("").map(char => parseInt(char, 10)));
}

function getNumberOfFlahesAfterSeveralSteps(setup, steps) {
  let totalFlashCount = 0;
  let oldSetup = setup;
  for (let i = 0; i < steps; i++) {
    const { flashCount, newSetup } = getNumberOfOctopusFlashesAndNewSetupDuringNextStep(oldSetup);
    totalFlashCount += flashCount;
    oldSetup = newSetup;
  }
  return totalFlashCount;
}

function getNumberOfStepsUntilFirstTotalFlash(setup) {
  let oldSetup = setup;
  for (let step = 1; step < 3000; step++) {
    const { newSetup } = getNumberOfOctopusFlashesAndNewSetupDuringNextStep(oldSetup);
    if (newSetup.every(line => line.every(level => level === 0))) {
      return step;
    }
    oldSetup = newSetup;
  }
  return null;
}

function getNumberOfOctopusFlashesAndNewSetupDuringNextStep(setup) {
  const newSetup = setup.map(line => line.map(level => level));

  const _increaseLevel = (x, y) => {
    if (newSetup[y]?.[x] == null) {
      return;
    }
    newSetup[y][x]++;
    if (newSetup[y][x] === 10) {
      ADJACENT_POSITIONS_OFFSET.forEach(([diffX, diffY]) => {
        _increaseLevel(x + diffX, y + diffY);
      });
    }
  };

  newSetup.forEach((line, y) =>
    line.forEach((level, x) => {
      _increaseLevel(x, y);
    })
  );

  let flashCount = 0;
  newSetup.forEach((line, y) => {
    line.forEach((level, x) => {
      if (level > 9) {
        flashCount++;
        newSetup[y][x] = 0;
      }
    });
  });

  return { flashCount, newSetup };
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2,

  parseLinesIntoOctopusGrid,
  getNumberOfOctopusFlashesAndNewSetupDuringNextStep,
  getNumberOfFlahesAfterSeveralSteps,
  getNumberOfStepsUntilFirstTotalFlash,
};
