const Import = require("./index");

const testData = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010",
];

describe("getPowerConsumptionFromCommonBits", () => {
  const { getPowerConsumptionFromCommonBits } = Import;
  it("- when used with test-data - works as expected", () => {
    expect(getPowerConsumptionFromCommonBits(testData)).toBe(198);
  });
});

describe("getSolutionPart1", () => {
  const { getSolutionPart1 } = Import;
  it("- when used with real data - works as expected", () => {
    expect(getSolutionPart1()).toBe(4006064);
  });
});

describe("getLifeSupportRatingFromNumberMatchingMostCommonBits", () => {
  const { getLifeSupportRatingFromNumberMatchingMostCommonBits } = Import;
  it("- when used with test-data - works as expected", () => {
    expect(getLifeSupportRatingFromNumberMatchingMostCommonBits(testData)).toBe(
      230
    );
  });
});

describe("getSolutionPart2", () => {
  const { getSolutionPart2 } = Import;
  it("- when used with real data - works as expected", () => {
    expect(getSolutionPart2()).toBe(5941884);
  });
});
