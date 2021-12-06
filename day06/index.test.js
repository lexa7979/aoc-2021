const Import = require("./index");
const Helpers = require("./helpers");

const testData = ["3,4,3,1,2"];

describe("parseInitialStateOfFishs", () => {
  const { parseInitialStateOfFishs } = Import;
  it("- when used with test-data - works as expected", () => {
    const lines = Helpers.parseInputData(testData);
    expect(parseInitialStateOfFishs(lines)).toEqual([3, 4, 3, 1, 2]);
  });
});

describe("countFishsAfterGivenDays", () => {
  const { countFishsAfterGivenDays, parseInitialStateOfFishs } = Import;
  it("- when used with test-data - works as expected", () => {
    const lines = Helpers.parseInputData(testData);
    const setup = parseInitialStateOfFishs(lines);
    expect(countFishsAfterGivenDays(setup, 18)).toBe(26);
    expect(countFishsAfterGivenDays(setup, 80)).toBe(5934);
    expect(countFishsAfterGivenDays(setup, 256)).toBe(26984457539);
  });
});

describe("getSolutionPart1", () => {
  const { getSolutionPart1 } = Import;
  it("- when used with real data - works as expected", () => {
    expect(getSolutionPart1()).toBe(350605);
  });
});

describe("getSolutionPart2", () => {
  const { getSolutionPart2 } = Import;
  it("- when used with real data - works as expected", () => {
    expect(getSolutionPart2()).toBe(1592778185024);
  });
});
