// @ts-check

const Helpers = require("./helpers");
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

let realTestSetup;
beforeAll(() => {
  realTestSetup = Import.parseLinesIntoSetup(Helpers.parseInputData());
});

describe("parseLinesIntoSetup", () => {
  const { parseLinesIntoSetup } = Import;
  it("works as expected", () => {
    const setup = parseLinesIntoSetup(testData1);
    expect(setup).toEqual(testSetup1);
  });
});

describe("runSubroutineChangingStateInPlace", () => {
  const { runSubroutineChangingStateInPlace } = Import;
  it("works as expected (1)", () => {
    expect(realTestSetup.programBlocksByInput[0]).toEqual({
      id: 1,
      inputArg: "w",
      subRoutine: [
        { command: "mul", arg1: "x", arg2: 0 },
        { command: "add", arg1: "x", arg2: "z" },
        { command: "mod", arg1: "x", arg2: 26 },
        { command: "div", arg1: "z", arg2: 1 },
        { command: "add", arg1: "x", arg2: 14 },
        { command: "eql", arg1: "x", arg2: "w" },
        { command: "eql", arg1: "x", arg2: 0 },
        { command: "mul", arg1: "y", arg2: 0 },
        { command: "add", arg1: "y", arg2: 25 },
        { command: "mul", arg1: "y", arg2: "x" },
        { command: "add", arg1: "y", arg2: 1 },
        { command: "mul", arg1: "z", arg2: "y" },
        { command: "mul", arg1: "y", arg2: 0 },
        { command: "add", arg1: "y", arg2: "w" },
        { command: "add", arg1: "y", arg2: 12 },
        { command: "mul", arg1: "y", arg2: "x" },
        { command: "add", arg1: "z", arg2: "y" },
      ],
    });

    const subRoutines = realTestSetup.programBlocksByInput.map(item => item.subRoutine);
    const resultingStates = [];
    const shortTrackFromInputToStateBySubRoutine = {};

    const _testRun = index => {
      resultingStates[index] = Helpers.getArrayRange(1, 9).map(input => {
        const state = shortTrackFromInputToStateBySubRoutine[index](input);
        const result = runSubroutineChangingStateInPlace({ program: subRoutines[index], state });
        expect(result).toEqual({ error: null });
        return { input, state };
      });
      if (shortTrackFromInputToStateBySubRoutine[index + 1]) {
        expect(resultingStates[index]).toEqual(
          Helpers.getArrayRange(1, 9).map(input => ({
            input,
            state: shortTrackFromInputToStateBySubRoutine[index + 1](input),
          }))
        );
      } else {
        console.log(`No shorttrack for index ${index + 1} found.`);
      }
    };

    shortTrackFromInputToStateBySubRoutine[0] = input => ({ w: input, x: 0, y: 0, z: 0 });
    shortTrackFromInputToStateBySubRoutine[1] = input => ({ w: input, x: 1, y: input + 12, z: input + 12 });
    shortTrackFromInputToStateBySubRoutine[2] = input => ({ w: input, x: 1, y: input + 8, z: 27 * input + 320 });
    shortTrackFromInputToStateBySubRoutine[3] = input => ({ w: input, x: 1, y: input + 7, z: 703 * input + 8327 });
    shortTrackFromInputToStateBySubRoutine[4] = input => ({ w: input, x: 1, y: input + 4, z: 18279 * input + 216506 });
    shortTrackFromInputToStateBySubRoutine[5] = input => ({ w: input, x: 1, y: input + 4, z: 18279 * input + 216506 });

    Helpers.getArrayRange(0, 4).forEach(_testRun);

    // expect(resultingStates[5]).toMatchInlineSnapshot();
  });
  it("works as expected (2)", () => {
    const subRoutines = realTestSetup.programBlocksByInput.map(item => item.subRoutine);

    const _testRunWithGivenInputs = (...inputs) => {
      const state = { w: 0, x: 0, y: 0, z: 0 };
      inputs.forEach((value, index) => {
        state.w = value;
        const result = runSubroutineChangingStateInPlace({ program: subRoutines[index], state });
        expect(result).toEqual({ error: null });
      });
      return state;
    };

    const letters = "   A  B  C  D  E  F  G  H  I  J  K  L  M  N";
    const testInput1 = [5, 9, 6, 9, 2, 9, 9, 4, 9, 9, 4, 9, 9, 8];
    const testInput2 = [1, 6, 1, 8, 1, 1, 1, 1, 6, 4, 1, 5, 2, 1];
    expect(_testRunWithGivenInputs(...testInput1)).toEqual({ w: 8, x: 0, y: 0, z: 0 });
    expect(_testRunWithGivenInputs(...testInput2)).toEqual({ w: 1, x: 0, y: 0, z: 0 });
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
    expect(runMainProgramOnInput("13579246899999")).toEqual({
      w: 9,
      x: 1,
      y: 18,
      z: 4152322244,
    });
  });
});

describe("getSolutionPart1", () => {
  const { getSolutionPart1 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart1();
    expect(result).toBe("59692994994998");
  });
});

describe("getSolutionPart2", () => {
  const { getSolutionPart2 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart2();
    expect(result).toBe("16181111641521");
  });
});
