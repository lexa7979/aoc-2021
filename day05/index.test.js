const Import = require("./index");

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

describe("parseLineSegments", () => {
  const { parseLineSegments } = Import;
  it("- when used with test-data - works as expected", () => {
    const lineSegment1 = [
      [0, 9],
      [1, 9],
      [2, 9],
      [3, 9],
      [4, 9],
      [5, 9],
    ];
    const lineSegment2 = [
      [8, 0],
      [7, 1],
      [6, 2],
      [5, 3],
      [4, 4],
      [3, 5],
      [2, 6],
      [1, 7],
      [0, 8],
    ];
    const lineSegment3 = [
      [9, 4],
      [8, 4],
      [7, 4],
      [6, 4],
      [5, 4],
      [4, 4],
      [3, 4],
    ];
    const lineSegment4 = [
      [2, 2],
      [2, 1],
    ];

    expect(parseLineSegments(testData.slice(0, 4), true)).toEqual([lineSegment1, lineSegment3, lineSegment4]);
    expect(parseLineSegments(testData.slice(0, 4), false)).toEqual([
      lineSegment1,
      lineSegment2,
      lineSegment3,
      lineSegment4,
    ]);
  });
});

describe("countCoordinatesOfMeetingLines", () => {
  const { countCoordinatesOfMeetingLines, parseLineSegments } = Import;
  it("- when used with test-data - works as expected", () => {
    const setup = parseLineSegments(testData);
    expect(countCoordinatesOfMeetingLines(setup)).toBe(5);
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
