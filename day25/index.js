// @ts-check

const Helpers = require("./helpers");

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
  const setup = parseLinesIntoSetup(lines);
  return countStepsUntilEverythingStopsMoving(setup);
}

function getSolutionPart2() {
  return 79;
}

function parseLinesIntoSetup(lines) {
  const setup = {
    map: [],
  };

  let sizeX = null;

  lines.forEach(text => {
    if (!text) {
      return;
    }

    if (/^[v.>]+$/.test(text)) {
      setup.map.push(text.split(""));
      if (sizeX == null) {
        sizeX = text.length;
      } else if (sizeX !== text.length) {
        throw new Error("Unexpected text-length");
      }
      return;
    }

    throw new Error(`Invalid input-line: ${text}`);
  });

  return setup;
}

function moveOneStepEastBoundInPlace(setup) {
  const moves = [];

  const sizeX = setup.map[0].length;
  const sizeY = setup.map.length;

  for (let y = 0; y < sizeY; y++) {
    for (let x = 0; x < sizeX; x++) {
      const x2 = (x + 1) % sizeX;
      if (setup.map[y][x] === ">" && setup.map[y][x2] === ".") {
        moves.push({ x, y, x2 });
      }
    }
  }

  moves.forEach(({ x, y, x2 }) => {
    setup.map[y][x] = ".";
    setup.map[y][x2] = ">";
  });

  return moves.length;
}

function moveOneStepSouthBoundInPlace(setup) {
  const moves = [];

  const sizeX = setup.map[0].length;
  const sizeY = setup.map.length;

  for (let y = 0; y < sizeY; y++) {
    const y2 = (y + 1) % sizeY;
    for (let x = 0; x < sizeX; x++) {
      if (setup.map[y][x] === "v" && setup.map[y2][x] === ".") {
        moves.push({ x, y, y2 });
      }
    }
  }

  moves.forEach(({ x, y, y2 }) => {
    setup.map[y][x] = ".";
    setup.map[y2][x] = "v";
  });

  return moves.length;
}

function countStepsUntilEverythingStopsMoving(setup) {
  for (let stepCount = 1; ; stepCount++) {
    let moves = moveOneStepEastBoundInPlace(setup);
    moves += moveOneStepSouthBoundInPlace(setup);
    if (stepCount % 1000 === 0) {
      console.log(stepCount, moves);
    }
    if (moves === 0) {
      return stepCount;
    }
  }
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2,

  parseLinesIntoSetup,
  moveOneStepEastBoundInPlace,
  moveOneStepSouthBoundInPlace,
  countStepsUntilEverythingStopsMoving,
};
