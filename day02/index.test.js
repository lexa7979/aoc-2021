const Import = require("./index");

const testData = [
  "forward 5",
  "down 5",
  "forward 8",
  "up 3",
  "down 8",
  "forward 2",
];

describe("getProductOfUnderwaterPositions", () => {
  const { getProductOfUnderwaterPositions } = Import;
  it("- when used with test-data - works as expected", () => {
    expect(getProductOfUnderwaterPositions(testData)).toBe(150);
  });
});

describe("getSolutionPart1", () => {
  const { getSolutionPart1 } = Import;
  it("- when used with real data - works as expected", () => {
    expect(getSolutionPart1()).toBe(2150351);
  });
});

describe("getProductOfUnderwaterPositionsWithAiming", () => {
  const { getProductOfUnderwaterPositionsWithAiming } = Import;
  it("- when used with test-data - works as expected", () => {
    expect(getProductOfUnderwaterPositionsWithAiming(testData)).toBe(900);
  });
});

describe("getSolutionPart2", () => {
  const { getSolutionPart2 } = Import;
  it("- when used with real data - works as expected", () => {
    expect(getSolutionPart2()).toBe(1842742223);
  });
});
