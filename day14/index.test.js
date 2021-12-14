const Import = require("./index");
const Helpers = require("./helpers");

const testData = [
  //
  "NNCB",
  "",
  "CH -> B",
  "HH -> N",
  "CB -> H",
  "NH -> C",
  "HB -> C",
  "HC -> B",
  "HN -> C",
  "NN -> C",
  "BH -> H",
  "NC -> B",
  "NB -> B",
  "BN -> B",
  "BB -> N",
  "BC -> B",
  "CC -> N",
  "CN -> C",
];

const testSetup = {
  polymerTemplate: "NNCB",
  elements: ["B", "C", "H", "N"],
  pairInsertionRules: {
    CH: "B",
    HH: "N",
    CB: "H",
    NH: "C",
    HB: "C",
    HC: "B",
    HN: "C",
    NN: "C",
    BH: "H",
    NC: "B",
    NB: "B",
    BN: "B",
    BB: "N",
    BC: "B",
    CC: "N",
    CN: "C",
  },
};

describe("parseLinesIntoSetup", () => {
  const { parseLinesIntoSetup } = Import;
  it("- when used with test-data - works as expected", () => {
    const lines = Helpers.parseInputData(testData);
    const setup = parseLinesIntoSetup(lines);
    expect(setup).toEqual(testSetup);
  });
});

describe("getElementQuantityDifferenceAfterSeveralSteps", () => {
  const { getElementQuantityDifferenceAfterSeveralSteps } = Import;
  it("works as expected", () => {
    expect(getElementQuantityDifferenceAfterSeveralSteps(testSetup, 10)).toBe(1588);
    expect(getElementQuantityDifferenceAfterSeveralSteps(testSetup, 40)).toBe(2188189693529);
  });
});

describe("getSolutionPart1", () => {
  const { getSolutionPart1 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart1();
    expect(result).toBe(2797);
  });
});

describe("getSolutionPart2", () => {
  const { getSolutionPart2 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart2();
    expect(result).toBe(2926813379532);
  });
});
