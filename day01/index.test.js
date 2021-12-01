const Import = require("./index");

describe("getNumberOfIncreases", () => {
  const { getNumberOfIncreases } = Import;
  it("- when used with test-data - works as expected", () => {
    const testData = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
    expect(getNumberOfIncreases(testData)).toBe(7);
  });
});

describe("getSolutionPart1", () => {
  const { getSolutionPart1 } = Import;
  it("- when used with real data - works as expected", () => {
    expect(getSolutionPart1()).toBe(1316);
  });
});

describe("getNumberOfIncreasesWithSumOfThreeValues", () => {
  const { getNumberOfIncreasesWithSumOfThreeValues } = Import;
  it("- when used with test-data - works as expected", () => {
    const testData = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
    expect(getNumberOfIncreasesWithSumOfThreeValues(testData)).toBe(5);
  });
});

describe("getSolutionPart2", () => {
  const { getSolutionPart2 } = Import;
  it("- when used with real data - works as expected", () => {
    expect(getSolutionPart2()).toBe(1344);
  });
});
