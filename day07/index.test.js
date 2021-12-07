const Import = require("./index");
const Helpers = require("./helpers");

const testData = ["16,1,2,0,4,2,7,1,2,14"];

describe("parseInitialHorizontalPositions", () => {
  const { parseInitialHorizontalPositions } = Import;
  it("- when used with test-data - works as expected", () => {
    const lines = Helpers.parseInputData(testData);
    expect(parseInitialHorizontalPositions(lines)).toEqual([16, 1, 2, 0, 4, 2, 7, 1, 2, 14]);
  });
});

describe("getNeededFuelForAllToReachPosition", () => {
  const { getNeededFuelForAllToReachPosition, parseInitialHorizontalPositions } = Import;
  it("- when used with test-data - works as expected", () => {
    const lines = Helpers.parseInputData(testData);
    const setup = parseInitialHorizontalPositions(lines);
    expect(getNeededFuelForAllToReachPosition(setup, 2)).toBe(37);
    expect(getNeededFuelForAllToReachPosition(setup, 1)).toBe(41);
    expect(getNeededFuelForAllToReachPosition(setup, 3)).toBe(39);
  });
});

describe("getLeastFuelNeededToReachSamePosition", () => {
  const { getLeastFuelNeededToReachSamePosition, parseInitialHorizontalPositions } = Import;
  it("- when used with test-data - works as expected", () => {
    const lines = Helpers.parseInputData(testData);
    const setup = parseInitialHorizontalPositions(lines);
    expect(getLeastFuelNeededToReachSamePosition(setup)).toBe(37);
  });
});

describe("getCostOfMove", () => {
  const { getCostOfMove } = Import;
  it("works as expected", () => {
    expect(getCostOfMove(2)).toBe(3);
    expect(getCostOfMove(10)).toBe(55);
  });
});

describe("getSolutionPart1", () => {
  const { getSolutionPart1 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart1();
    expect(result).not.toBe(376);
    expect(result).toBe(352707);
  });
});

describe("getSolutionPart2", () => {
  const { getSolutionPart2 } = Import;
  it("- when used with real data - works as expected", () => {
    expect(getSolutionPart2()).toBe(95519693);
  });
});
