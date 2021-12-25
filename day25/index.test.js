// @ts-check

const Import = require("./index");

const testData1 = [
  //
  "v...>>.vv>",
  ".vv>>.vv..",
  ">>.>v>...v",
  ">>v>>.>.v.",
  "v>v.vv.v..",
  ">.>>..v...",
  ".vv..>.>v.",
  "v.v..>>v.v",
  "....v..v.>",
];

const testSetup1 = {
  map: [
    ["v", ".", ".", ".", ">", ">", ".", "v", "v", ">"],
    [".", "v", "v", ">", ">", ".", "v", "v", ".", "."],
    [">", ">", ".", ">", "v", ">", ".", ".", ".", "v"],
    [">", ">", "v", ">", ">", ".", ">", ".", "v", "."],
    ["v", ">", "v", ".", "v", "v", ".", "v", ".", "."],
    [">", ".", ">", ">", ".", ".", "v", ".", ".", "."],
    [".", "v", "v", ".", ".", ">", ".", ">", "v", "."],
    ["v", ".", "v", ".", ".", ">", ">", "v", ".", "v"],
    [".", ".", ".", ".", "v", ".", ".", "v", ".", ">"],
  ],
};

describe("parseLinesIntoSetup", () => {
  const { parseLinesIntoSetup } = Import;
  it("works as expected", () => {
    const setup = parseLinesIntoSetup(testData1);
    expect(setup).toEqual(testSetup1);
  });
});

describe("moveOneStepEastBoundInPlace", () => {
  const { moveOneStepEastBoundInPlace } = Import;
  it("works as expected", () => {
    const setup = { map: [...testSetup1.map] };
    const result = moveOneStepEastBoundInPlace(setup);
    expect(setup.map.map(item => item.join(""))).toEqual([
      "v...>.>vv>",
      ".vv>.>vv..",
      ">.>>v.>..v",
      ">>v>.>.>v.",
      "v>v.vv.v..",
      ".>>.>.v...",
      ".vv...>>v.",
      "v.v..>>v.v",
      ">...v..v..",
    ]);
    expect(result).toBe(10);
  });
});

describe("moveOneStepSouthBoundInPlace", () => {
  const { moveOneStepSouthBoundInPlace } = Import;
  it("works as expected", () => {
    const setup = Import.parseLinesIntoSetup(testData1);
    const result = moveOneStepSouthBoundInPlace(setup);
    expect(result).toEqual(15);
    expect(setup.map.map(item => item.join(""))).toEqual([
      "....>>.v.>",
      "vv.>>...v.",
      ">>v>v>vv..",
      ">>v>>.>..v",
      "v>v.....v.",
      ">.>>vv.v..",
      "..v..>v>..",
      ".v...>>vvv",
      "v.v.v..v.>",
    ]);
  });
  it("- when used together with moveOneStepEastBoundInPlace() - works as expected", () => {
    const setup = Import.parseLinesIntoSetup(testData1);
    Import.moveOneStepEastBoundInPlace(setup);
    moveOneStepSouthBoundInPlace(setup);
    expect(setup.map.map(item => item.join(""))).toEqual([
      "....>.>v.>",
      "v.v>.>v.v.",
      ">v>>..>v..",
      ">>v>v>.>.v",
      ".>v.v...v.",
      "v>>.>vvv..",
      "..v...>>..",
      "vv...>>vv.",
      ">.v.v..v.v",
    ]);
  });
});

describe("countStepsUntilEverythingStopsMoving", () => {
  const { countStepsUntilEverythingStopsMoving } = Import;
  it("works as expected", () => {
    const setup = Import.parseLinesIntoSetup(testData1);
    const result = countStepsUntilEverythingStopsMoving(setup);
    expect(result).toBe(58);
    expect(setup.map.map(item => item.join(""))).toMatchInlineSnapshot(`
Array [
  "..>>v>vv..",
  "..v.>>vv..",
  "..>>v>>vv.",
  "..>>>>>vv.",
  "v......>vv",
  "v>v....>>v",
  "vvv.....>>",
  ">vv......>",
  ".>v.vv.v..",
]
`);
  });
});

describe("getSolutionPart1", () => {
  const { getSolutionPart1 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart1();
    expect(result).toBe(612714);
  });
});

describe.skip("getSolutionPart2", () => {
  const { getSolutionPart2 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart2();
    expect(result).toBe(1311612259117092);
  });
});
