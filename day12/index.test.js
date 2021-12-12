const Import = require("./index");
const Helpers = require("./helpers");

const testData = [
  //
  "start-A",
  "start-b",
  "A-c",
  "A-b",
  "b-d",
  "A-end",
  "b-end",
];

const testSetup = {
  A: {
    isBigCave: true,
    paths: ["b", "c", "end", "start"],
  },
  b: {
    isBigCave: false,
    paths: ["A", "d", "end", "start"],
  },
  c: {
    isBigCave: false,
    paths: ["A"],
  },
  d: {
    isBigCave: false,
    paths: ["b"],
  },
  end: {
    isBigCave: false,
    paths: ["A", "b"],
  },
  start: {
    isBigCave: false,
    paths: ["A", "b"],
  },
};

describe("parseLinesIntoCaveSetup", () => {
  const { parseLinesIntoCaveSetup } = Import;
  it("- when used with test-data - works as expected", () => {
    const lines = Helpers.parseInputData(testData);
    const setup = parseLinesIntoCaveSetup(lines);
    expect(setup).toEqual(testSetup);
  });
});

describe("getNumberOfValidPathsThroughCaveSystem", () => {
  const { getNumberOfValidPathsThroughCaveSystem } = Import;
  it("works as expected", () => {
    expect(getNumberOfValidPathsThroughCaveSystem(testSetup, false)).toBe(10);
    expect(getNumberOfValidPathsThroughCaveSystem(testSetup, true)).toBe(36);
  });
});

describe("getSolutionPart1", () => {
  const { getSolutionPart1 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart1();
    expect(result).toBe(4970);
  });
});

describe("getSolutionPart2", () => {
  const { getSolutionPart2 } = Import;
  it("- when used with real data - works as expected", () => {
    expect(getSolutionPart2()).toBe(137948);
  });
});
