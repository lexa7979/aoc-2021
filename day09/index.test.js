const Import = require("./index");
const Helpers = require("./helpers");

const testData = [
  //
  "2199943210",
  "3987894921",
  "9856789892",
  "8767896789",
  "9899965678",
];

describe("getLowestAdjacentDigit", () => {
  const { getLowestAdjacentDigit } = Import;
  it("- when used with test-data - works as expected", () => {
    const lines = Helpers.parseInputData(testData);
    expect(getLowestAdjacentDigit(lines, 0, 0)).toBe(1);
    expect(getLowestAdjacentDigit(lines, 4, 1)).toBe(7);
    expect(getLowestAdjacentDigit(lines, 7, 2)).toBe(7);
    expect(getLowestAdjacentDigit(lines, 2, 5)).toBe(9);
    expect(getLowestAdjacentDigit(lines, 2, 7)).toBe(null);
  });
});

describe("calculateRiskLevel", () => {
  const { calculateRiskLevel } = Import;
  it("works as expected", () => {
    const lines = Helpers.parseInputData(testData);
    const result = calculateRiskLevel(lines);
    expect(result).toBe(15);
  });
});

describe("getBasinSize", () => {
  const { getBasinSize } = Import;
  it("works as expected", () => {
    const lines = Helpers.parseInputData(testData);
    expect(getBasinSize(lines, 0, 0)).toBe(3);
    expect(getBasinSize(lines, 9, 0)).toBe(9);
    expect(getBasinSize(lines, 2, 2)).toBe(14);
    expect(getBasinSize(lines, 6, 4)).toBe(9);
  });
});

describe("getFactorOfThreeLargestBasinSizes", () => {
  const { getFactorOfThreeLargestBasinSizes } = Import;
  it("works as expected", () => {
    const lines = Helpers.parseInputData(testData);
    expect(getFactorOfThreeLargestBasinSizes(lines)).toBe(1134);
  });
});

describe("getSolutionPart1", () => {
  const { getSolutionPart1 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart1();
    expect(result).toBe(486);
  });
});

describe("getSolutionPart2", () => {
  const { getSolutionPart2 } = Import;
  it("- when used with real data - works as expected", () => {
    expect(getSolutionPart2()).toBe(1059300);
  });
});
