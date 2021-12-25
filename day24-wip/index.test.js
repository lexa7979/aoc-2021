// @ts-check

const Import = require("./index");

const testData1 = [
  //
  "inp w",
  "add z w",
  "mod z 2",
  "div w 2",
  "add y w",
  "mod y 2",
  "div w 2",
  "add x w",
  "mod x 2",
  "div w 2",
  "mod w 2",
];

const testSetup1 = {
  // program: [
  //   { command: "inp", arg1: "w" },
  //   { command: "add", arg1: "z", arg2: "w" },
  //   { command: "mod", arg1: "z", arg2: 2 },
  //   { command: "div", arg1: "w", arg2: 2 },
  //   { command: "add", arg1: "y", arg2: "w" },
  //   { command: "mod", arg1: "y", arg2: 2 },
  //   { command: "div", arg1: "w", arg2: 2 },
  //   { command: "add", arg1: "x", arg2: "w" },
  //   { command: "mod", arg1: "x", arg2: 2 },
  //   { command: "div", arg1: "w", arg2: 2 },
  //   { command: "mod", arg1: "w", arg2: 2 },
  // ],
  programBlocksByInput: [
    {
      id: 1,
      inputArg: "w",
      subRoutine: [
        { command: "add", arg1: "z", arg2: "w" },
        { command: "mod", arg1: "z", arg2: 2 },
        { command: "div", arg1: "w", arg2: 2 },
        { command: "add", arg1: "y", arg2: "w" },
        { command: "mod", arg1: "y", arg2: 2 },
        { command: "div", arg1: "w", arg2: 2 },
        { command: "add", arg1: "x", arg2: "w" },
        { command: "mod", arg1: "x", arg2: 2 },
        { command: "div", arg1: "w", arg2: 2 },
        { command: "mod", arg1: "w", arg2: 2 },
      ],
    },
  ],
};

describe("parseLinesIntoSetup", () => {
  const { parseLinesIntoSetup } = Import;
  it("works as expected", () => {
    const setup = parseLinesIntoSetup(testData1);
    expect(setup).toEqual(testSetup1);
  });
});

describe("runProgramOnInputWorkingWithCacheInPlace", () => {
  const { runProgramOnInputWorkingWithCacheInPlace } = Import;
  it("works as expected", () => {
    const cache = [];
    const _turnStateIntoBits = state => `${state.w}${state.x}${state.y}${state.z}`;
    expect(
      _turnStateIntoBits(runProgramOnInputWorkingWithCacheInPlace({ setup: testSetup1, inputs: [4], cache }))
    ).toBe("0100");
    expect(cache).toEqual([
      {
        firstStateString: "4,0,0,0",
        id: 1,
        lastState: { w: 0, x: 1, y: 0, z: 0 },
      },
    ]);
  });
});

describe("runMainProgramOnInput", () => {
  const { runMainProgramOnInput } = Import;
  it("works as expected", () => {
    expect(runMainProgramOnInput("13579246899999".split(""))).toEqual({
      w: "9",
      x: 1,
      y: 99,
      z: 35079023169,
    });
  });
});

describe.only("getSolutionPart1", () => {
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
