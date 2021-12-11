const Import = require("./index");
const Helpers = require("./helpers");

const testData = [
  //
  "5483143223",
  "2745854711",
  "5264556173",
  "6141336146",
  "6357385478",
  "4167524645",
  "2176841721",
  "6882881134",
  "4846848554",
  "5283751526",
];

const parsedTestDataByStep = {
  0: [
    [5, 4, 8, 3, 1, 4, 3, 2, 2, 3],
    [2, 7, 4, 5, 8, 5, 4, 7, 1, 1],
    [5, 2, 6, 4, 5, 5, 6, 1, 7, 3],
    [6, 1, 4, 1, 3, 3, 6, 1, 4, 6],
    [6, 3, 5, 7, 3, 8, 5, 4, 7, 8],
    [4, 1, 6, 7, 5, 2, 4, 6, 4, 5],
    [2, 1, 7, 6, 8, 4, 1, 7, 2, 1],
    [6, 8, 8, 2, 8, 8, 1, 1, 3, 4],
    [4, 8, 4, 6, 8, 4, 8, 5, 5, 4],
    [5, 2, 8, 3, 7, 5, 1, 5, 2, 6],
  ],
  1: [
    [6, 5, 9, 4, 2, 5, 4, 3, 3, 4],
    [3, 8, 5, 6, 9, 6, 5, 8, 2, 2],
    [6, 3, 7, 5, 6, 6, 7, 2, 8, 4],
    [7, 2, 5, 2, 4, 4, 7, 2, 5, 7],
    [7, 4, 6, 8, 4, 9, 6, 5, 8, 9],
    [5, 2, 7, 8, 6, 3, 5, 7, 5, 6],
    [3, 2, 8, 7, 9, 5, 2, 8, 3, 2],
    [7, 9, 9, 3, 9, 9, 2, 2, 4, 5],
    [5, 9, 5, 7, 9, 5, 9, 6, 6, 5],
    [6, 3, 9, 4, 8, 6, 2, 6, 3, 7],
  ],
  2: [
    [8, 8, 0, 7, 4, 7, 6, 5, 5, 5],
    [5, 0, 8, 9, 0, 8, 7, 0, 5, 4],
    [8, 5, 9, 7, 8, 8, 9, 6, 0, 8],
    [8, 4, 8, 5, 7, 6, 9, 6, 0, 0],
    [8, 7, 0, 0, 9, 0, 8, 8, 0, 0],
    [6, 6, 0, 0, 0, 8, 8, 9, 8, 9],
    [6, 8, 0, 0, 0, 0, 5, 9, 4, 3],
    [0, 0, 0, 0, 0, 0, 7, 4, 5, 6],
    [9, 0, 0, 0, 0, 0, 0, 8, 7, 6],
    [8, 7, 0, 0, 0, 0, 6, 8, 4, 8],
  ],
  3: [
    [0, 0, 5, 0, 9, 0, 0, 8, 6, 6],
    [8, 5, 0, 0, 8, 0, 0, 5, 7, 5],
    [9, 9, 0, 0, 0, 0, 0, 0, 3, 9],
    [9, 7, 0, 0, 0, 0, 0, 0, 4, 1],
    [9, 9, 3, 5, 0, 8, 0, 0, 6, 3],
    [7, 7, 1, 2, 3, 0, 0, 0, 0, 0],
    [7, 9, 1, 1, 2, 5, 0, 0, 0, 9],
    [2, 2, 1, 1, 1, 3, 0, 0, 0, 0],
    [0, 4, 2, 1, 1, 2, 5, 0, 0, 0],
    [0, 0, 2, 1, 1, 1, 9, 0, 0, 0],
  ],
};

describe("parseLinesIntoOctopusGrid", () => {
  const { parseLinesIntoOctopusGrid } = Import;
  it("- when used with test-data - works as expected", () => {
    const lines = Helpers.parseInputData(testData);
    expect(parseLinesIntoOctopusGrid(lines)).toEqual(parsedTestDataByStep[0]);
  });
});

describe("getNumberOfOctopusFlashesAndNewSetupDuringNextStep", () => {
  const { getNumberOfOctopusFlashesAndNewSetupDuringNextStep } = Import;
  it("works as expected", () => {
    expect(getNumberOfOctopusFlashesAndNewSetupDuringNextStep(parsedTestDataByStep[0])).toEqual({
      flashCount: 0,
      newSetup: parsedTestDataByStep[1],
    });
    expect(getNumberOfOctopusFlashesAndNewSetupDuringNextStep(parsedTestDataByStep[1])).toEqual({
      flashCount: 35,
      newSetup: parsedTestDataByStep[2],
    });
    expect(getNumberOfOctopusFlashesAndNewSetupDuringNextStep(parsedTestDataByStep[2])).toEqual({
      flashCount: 45,
      newSetup: parsedTestDataByStep[3],
    });
  });
});

describe("getNumberOfFlahesAfterSeveralSteps", () => {
  const { getNumberOfFlahesAfterSeveralSteps } = Import;
  it("works as expected", () => {
    expect(getNumberOfFlahesAfterSeveralSteps(parsedTestDataByStep[0], 100)).toBe(1656);
  });
});

describe("getNumberOfStepsUntilFirstTotalFlash", () => {
  const { getNumberOfStepsUntilFirstTotalFlash } = Import;
  it("works as expected", () => {
    expect(getNumberOfStepsUntilFirstTotalFlash(parsedTestDataByStep[0])).toBe(195);
  });
});

describe("getSolutionPart1", () => {
  const { getSolutionPart1 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart1();
    expect(result).toBe(1773);
  });
});

describe("getSolutionPart2", () => {
  const { getSolutionPart2 } = Import;
  it("- when used with real data - works as expected", () => {
    expect(getSolutionPart2()).toBe(494);
  });
});
