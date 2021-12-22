// @ts-check

const Helpers = require("./helpers");

Helpers.setParseOptions({
  transformMatch: null,
  asInteger: false,
});

const Cuboid = require("./cuboid");

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
  const allCuboids = getCuboidsAfterRunningCommands(setup);
  return countTotalSizeOfCuboids(allCuboids, -50, 50);
}

function getSolutionPart2() {
  const lines = Helpers.parseInputData();
  const setup = parseLinesIntoSetup(lines);
  const allCuboids = getCuboidsAfterRunningCommands(setup);
  return countTotalSizeOfCuboids(allCuboids);
}

function parseLinesIntoSetup(lines) {
  const setup = { commands: [] };

  lines.forEach(text => {
    const match = /^(on|off) x=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)$/.exec(text);
    if (match) {
      setup.commands.push({
        type: match[1],
        rangeX: [parseInt(match[2], 10), parseInt(match[3], 10)],
        rangeY: [parseInt(match[4], 10), parseInt(match[5], 10)],
        rangeZ: [parseInt(match[6], 10), parseInt(match[7], 10)],
      });
    }
  });

  return setup;
}

function getCuboidsAfterRunningCommands(setup) {
  let currentCuboids = [];

  setup.commands.forEach(command => {
    const currCuboid = new Cuboid(
      command.rangeX[0],
      command.rangeX[1],
      command.rangeY[0],
      command.rangeY[1],
      command.rangeZ[0],
      command.rangeZ[1]
    );
    const nextCuboids = [];
    currentCuboids.forEach(oldCuboid => {
      const results = oldCuboid.getResultsAfterSubtraction(currCuboid);
      if (results == null) {
        nextCuboids.push(oldCuboid);
      } else {
        nextCuboids.push(...results);
      }
    });
    if (command.type === "on") {
      nextCuboids.push(currCuboid);
    }
    currentCuboids = nextCuboids;
  });

  return currentCuboids;
}

function countTotalSizeOfCuboids(allCuboids, min = null, max = null) {
  if (min == null && max == null) {
    let count = 0;
    allCuboids.forEach(item => {
      count += (item.endX - item.startX + 1) * (item.endY - item.startY + 1) * (item.endZ - item.startZ + 1);
    });
    return count;
  } else {
    let count = 0;
    const _getInsideRange = (start, end) => tuple => {
      const result = [Math.max(tuple[0], start), Math.min(tuple[1], end)];
      return result[0] <= result[1] ? result : null;
    };

    allCuboids.forEach(item => {
      const rangeX = _getInsideRange(min, max)([item.startX, item.endX]);
      const rangeY = _getInsideRange(min, max)([item.startY, item.endY]);
      const rangeZ = _getInsideRange(min, max)([item.startZ, item.endZ]);
      if (rangeX && rangeY && rangeZ) {
        count += (rangeX[1] - rangeX[0] + 1) * (rangeY[1] - rangeY[0] + 1) * (rangeZ[1] - rangeZ[0] + 1);
      }
    });
    return count;
  }
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2,

  parseLinesIntoSetup,
  getCuboidsAfterRunningCommands,
  countTotalSizeOfCuboids,
};
