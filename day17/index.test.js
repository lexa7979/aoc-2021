const Import = require("./index");
const Helpers = require("./helpers");

const testData = ["target area: x=20..30, y=-10..-5"];
const testSetup = { startX: 20, endX: 30, startY: -10, endY: -5 };

describe("parseLinesIntoSetup", () => {
  const { parseLinesIntoSetup } = Import;
  it("- when used with test-data - works as expected", () => {
    const lines = Helpers.parseInputData(testData);
    const setup = parseLinesIntoSetup(lines);
    expect(setup).toEqual(testSetup);
  });
});

describe("simulateProbeLauncher", () => {
  const { simulateProbeLauncher } = Import;
  it("works as expected", () => {
    const result = simulateProbeLauncher(testSetup, { x: 7, y: 2 });
    expect(result).toEqual({
      isHittingTarget: true,
      maxHeight: 3,
      steps: [
        [0, 0],
        [7, 2],
        [13, 3],
        [18, 3],
        [22, 2],
        [25, 0],
        [27, -3],
        [28, -7],
      ],
    });
  });
});

describe("checkAllHittingLauncherVelocities", () => {
  const { checkAllHittingLauncherVelocities } = Import;
  it("works as expected", () => {
    const results = checkAllHittingLauncherVelocities(testSetup);
    expect(results).toEqual({
      count: 112,
      maxHeight: 45,
    });
  });
});

describe("getSolutionPart1", () => {
  const { getSolutionPart1 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart1();
    expect(result).toBe(5253);
  });
});

describe("getSolutionPart2", () => {
  const { getSolutionPart2 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart2();
    expect(result).not.toBe(712);
    expect(result).toBe(1770);
  });
});
