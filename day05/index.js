const Helpers = require("./helpers");

Helpers.setParseOptions({
  transformMatch: /^(\d+),(\d+) -> (\d+),(\d+)$/,
  asInteger: [1, 2, 3, 4],
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
  const setup = parseLineSegments(Helpers.parseInputData(), true);
  return countCoordinatesOfMeetingLines(setup);
}

function getSolutionPart2() {
  const setup = parseLineSegments(Helpers.parseInputData(), false);
  return countCoordinatesOfMeetingLines(setup);
}

function parseLineSegments(lines, skipDiagonals = true) {
  const lineSegments = [];
  for (let i = 0; i < lines.length; i++) {
    const [x1, y1, x2, y2] = lines[i];
    if (!skipDiagonals || x1 == x2 || y1 == y2) {
      const xRange = Helpers.getArrayRange(x1, x2);
      const yRange = Helpers.getArrayRange(y1, y2);
      if (xRange.length >= yRange.length) {
        lineSegments.push(xRange.map((x, index) => [x, yRange[index % yRange.length]]));
      } else {
        lineSegments.push(yRange.map((y, index) => [xRange[index % xRange.length], y]));
      }
    }
  }
  return lineSegments;
}

function countCoordinatesOfMeetingLines(lineSegments) {
  const linesAtCoordinate = {};
  for (let i = 0; i < lineSegments.length; i++) {
    const line = lineSegments[i];
    for (let k = 0; k < line.length; k++) {
      const coordinate = line[k];
      const key = coordinate.join(",");
      linesAtCoordinate[key] = 1 + (linesAtCoordinate[key] || 0);
    }
  }
  return Object.values(linesAtCoordinate).filter(value => value > 1).length;
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2,
  parseLineSegments,
  countCoordinatesOfMeetingLines,
};
