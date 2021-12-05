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
  const setup = parseLineSegments(getInputDataLines(), true);
  return countCoordinatesOfMeetingLines(setup);
}

function getSolutionPart2() {
  const setup = parseLineSegments(getInputDataLines(), false);
  return countCoordinatesOfMeetingLines(setup);
}

function parseLineSegments(input, skipDiagonals = true) {
  const lineSegments = [];
  input.forEach(line => {
    const match = /^(\d+),(\d+) -> (\d+),(\d+)$/.exec(line);
    if (!match) {
      throw new Error(`Failed to parse line "${line}".`);
    }
    const [_, x1, y1, x2, y2] = match.map(i => parseInt(i, 10));
    if (skipDiagonals && x1 != x2 && y1 != y2) {
      return;
    }
    const xSteps = x1 < x2 ? 1 : x1 > x2 ? -1 : 0;
    const ySteps = y1 < y2 ? 1 : y1 > y2 ? -1 : 0;
    const maxSteps = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
    lineSegments.push(
      Array(maxSteps + 1)
        .fill()
        .map((_, index) => [x1 + index * xSteps, y1 + index * ySteps])
    );
  });
  return lineSegments;
}

function countCoordinatesOfMeetingLines(lineSegments) {
  const linesAtCoordinate = {};
  lineSegments.forEach(line =>
    line.forEach(coordinate => {
      const key = coordinate.join(",");
      linesAtCoordinate[key] = 1 + (linesAtCoordinate[key] || 0);
    })
  );
  let meetingCoordinates = 0;
  Object.values(linesAtCoordinate).forEach(value => {
    if (value > 1) {
      meetingCoordinates++;
    }
  });
  return meetingCoordinates;
}

function getInputDataLines(inputBag) {
  const { asInteger = false } = inputBag || {};
  const lines = fs.readFileSync("input.txt").toString().trim().split("\n");
  return asInteger ? lines.map(x => parseInt(x, 10)) : lines;
}

module.exports = {
  parseLineSegments,
  countCoordinatesOfMeetingLines,
  getSolutionPart1,
  getSolutionPart2,
};
