const Import = require("./index");
const Helpers = require("./helpers");

const testData = [
  "0,9 -> 5,9",
  "8,0 -> 0,8",
  "9,4 -> 3,4",
  "2,2 -> 2,1",
  "7,0 -> 7,4",
  "6,4 -> 2,0",
  "0,9 -> 2,9",
  "3,4 -> 1,4",
  "0,0 -> 8,8",
  "5,5 -> 8,2",
];

const lineSegment1 = [0, 1, 2, 3, 4, 5].map(i => [i, 9]);
const lineSegment2 = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => [8 - i, i]);
const lineSegment3 = [9, 8, 7, 6, 5, 4, 3].map(i => [i, 4]);
const lineSegment4 = [2, 1].map(i => [2, i]);

describe("parseLineSegments", () => {
  const { parseLineSegments } = Import;
  it("- when used with test-data - works as expected", () => {
    const lines = Helpers.parseInputData(testData);
    expect(parseLineSegments(lines.slice(0, 4), true)).toEqual([lineSegment1, lineSegment3, lineSegment4]);
    expect(parseLineSegments(lines.slice(0, 4), false)).toEqual([
      lineSegment1,
      lineSegment2,
      lineSegment3,
      lineSegment4,
    ]);
  });
});

describe("countCoordinatesOfMeetingLines", () => {
  const { countCoordinatesOfMeetingLines, parseLineSegments } = Import;
  it("- when used with test-data and ignoring diagonals - works as expected", () => {
    const lines = Helpers.parseInputData(testData);
    const setup = parseLineSegments(lines, true);
    expect(countCoordinatesOfMeetingLines(setup)).toBe(5);
  });
  it("- when used with test-data and including diagonals - works as expected", () => {
    const lines = Helpers.parseInputData(testData);
    const setup = parseLineSegments(lines, false);
    expect(countCoordinatesOfMeetingLines(setup)).toBe(12);
  });
});

describe("getSolutionPart1", () => {
  const { getSolutionPart1 } = Import;
  it("- when used with real data - works as expected", () => {
    expect(getSolutionPart1()).toBe(7644);
  });
});

describe("getSolutionPart2", () => {
  const { getSolutionPart2 } = Import;
  it("- when used with real data - works as expected", () => {
    expect(getSolutionPart2()).toBe(18627);
  });
});
