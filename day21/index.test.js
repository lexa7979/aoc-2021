// @ts-check

const Import = require("./index");

const testData1 = [
  //
  "Player 1 starting position: 4",
  "Player 2 starting position: 8",
];

const testSetup1 = {
  startPosition: {
    player1: 4,
    player2: 8,
  },
};

describe("parseLinesIntoSetup", () => {
  const { parseLinesIntoSetup } = Import;
  it("works as expected", () => {
    const setup = parseLinesIntoSetup(testData1);
    expect(setup).toEqual(testSetup1);
  });
});

describe("runGameWithDeterministicDice", () => {
  const { runGameWithDeterministicDice } = Import;
  it("works as expected", () => {
    expect(runGameWithDeterministicDice(testSetup1)).toEqual({
      losingScore: 745,
      rollCount: 993,
      scores: {
        player1: 1000,
        player2: 745,
      },
    });
  });
});

describe("runGameWithQuantumDie", () => {
  const { runGameWithQuantumDie } = Import;
  it("works as expected", () => {
    expect(runGameWithQuantumDie(testSetup1)).toEqual({
      player1: 444356092776315,
      player2: 341960390180808,
    });
  });
});

describe("getTrippleQuantumRollStats", () => {
  const { getTrippleQuantumRollStats } = Import;
  it("works as expected", () => {
    expect(getTrippleQuantumRollStats()).toEqual({
      frequencyBySum: [
        { frequency: 1, sum: 3 },
        { frequency: 3, sum: 4 },
        { frequency: 6, sum: 5 },
        { frequency: 7, sum: 6 },
        { frequency: 6, sum: 7 },
        { frequency: 3, sum: 8 },
        { frequency: 1, sum: 9 },
      ],
      trippleRolls: [
        [1, 1, 1],
        [1, 1, 2],
        [1, 1, 3],
        [1, 2, 1],
        [1, 2, 2],
        [1, 2, 3],
        [1, 3, 1],
        [1, 3, 2],
        [1, 3, 3],
        [2, 1, 1],
        [2, 1, 2],
        [2, 1, 3],
        [2, 2, 1],
        [2, 2, 2],
        [2, 2, 3],
        [2, 3, 1],
        [2, 3, 2],
        [2, 3, 3],
        [3, 1, 1],
        [3, 1, 2],
        [3, 1, 3],
        [3, 2, 1],
        [3, 2, 2],
        [3, 2, 3],
        [3, 3, 1],
        [3, 3, 2],
        [3, 3, 3],
      ],
    });
  });
});

describe("getSolutionPart1", () => {
  const { getSolutionPart1 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart1();
    expect(result).toBe(908091);
  });
});

describe("getSolutionPart2", () => {
  const { getSolutionPart2 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart2();
    expect(result).toBe(190897246590017);
  });
});
