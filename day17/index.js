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
  return checkAllHittingLauncherVelocities(setup).maxHeight;
}

function getSolutionPart2() {
  const lines = Helpers.parseInputData();
  const setup = parseLinesIntoSetup(lines);
  return checkAllHittingLauncherVelocities(setup).count;
}

function parseLinesIntoSetup(lines) {
  const match = /^target area: x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)$/.exec(lines[0]);
  if (match) {
    const [startX, endX, startY, endY] = match.slice(1, 5).map(text => parseInt(text, 10));
    if (startX < endX && startY < endY) {
      if (endX < 0 || endY >= 0) {
        throw new Error("Unsupported setup");
      }
      return { startX, endX, startY, endY };
    }
  }
  throw new Error("Invalid input");
}

function checkAllHittingLauncherVelocities(setup) {
  const rangeX = [0, setup.endX];
  const rangeY = [setup.startY, -setup.startY];
  const result = { maxHeight: 0, count: 0 };
  for (let x = rangeX[0]; x <= rangeX[1]; x++) {
    for (let y = rangeY[0]; y <= rangeY[1]; y++) {
      const simulation = simulateProbeLauncher(setup, { x, y });
      if (simulation.isHittingTarget) {
        result.maxHeight = Math.max(simulation.maxHeight, result.maxHeight);
        result.count++;
      }
    }
  }
  return result;
}

function simulateProbeLauncher(setup, initialVelocity) {
  const { startX, endX, startY, endY } = setup;
  const velocity = { ...initialVelocity };
  const result = { isHittingTarget: false, steps: [[0, 0]], maxHeight: 0 };

  const pos = { x: 0, y: 0 };
  while (pos.x <= endX && pos.y >= startY && !result.isHittingTarget) {
    pos.x += velocity.x;
    pos.y += velocity.y;
    if (velocity.x > 0) {
      velocity.x -= 1;
    }
    velocity.y -= 1;
    result.steps.push([pos.x, pos.y]);
    result.maxHeight = Math.max(result.maxHeight, pos.y);
    result.isHittingTarget = pos.x >= startX && pos.x <= endX && pos.y >= startY && pos.y <= endY;
  }

  return result;
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2,

  parseLinesIntoSetup,
  checkAllHittingLauncherVelocities,
  simulateProbeLauncher,
};
