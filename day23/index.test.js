// @ts-check

const Import = require("./index");

const { Positions, AdditionalPositions } = require("./constants");

const testData1 = [
  //
  "#############",
  "#...........#",
  "###B#C#B#D###",
  "  #A#D#C#A#",
  "  #########",
];

const testSolutionExtended = [
  ["#############", "#...........#", "###B#C#B#D###", "  #D#C#B#A#", "  #D#B#A#C#", "  #A#D#C#A#", "  #########"],
  ["#############", "#..........D#", "###B#C#B#.###", "  #D#C#B#A#", "  #D#B#A#C#", "  #A#D#C#A#", "  #########"],
  ["#############", "#A.........D#", "###B#C#B#.###", "  #D#C#B#.#", "  #D#B#A#C#", "  #A#D#C#A#", "  #########"],
  ["#############", "#A........BD#", "###B#C#.#.###", "  #D#C#B#.#", "  #D#B#A#C#", "  #A#D#C#A#", "  #########"],
  ["#############", "#A......B.BD#", "###B#C#.#.###", "  #D#C#.#.#", "  #D#B#A#C#", "  #A#D#C#A#", "  #########"],
  ["#############", "#AA.....B.BD#", "###B#C#.#.###", "  #D#C#.#.#", "  #D#B#.#C#", "  #A#D#C#A#", "  #########"],
  ["#############", "#AA.....B.BD#", "###B#.#.#.###", "  #D#C#.#.#", "  #D#B#C#C#", "  #A#D#C#A#", "  #########"],
  ["#############", "#AA.....B.BD#", "###B#.#.#.###", "  #D#.#C#.#", "  #D#B#C#C#", "  #A#D#C#A#", "  #########"],
  ["#############", "#AA...B.B.BD#", "###B#.#.#.###", "  #D#.#C#.#", "  #D#.#C#C#", "  #A#D#C#A#", "  #########"],
  ["#############", "#AA.D.B.B.BD#", "###B#.#.#.###", "  #D#.#C#.#", "  #D#.#C#C#", "  #A#.#C#A#", "  #########"],
  ["#############", "#AA.D...B.BD#", "###B#.#.#.###", "  #D#.#C#.#", "  #D#.#C#C#", "  #A#B#C#A#", "  #########"],
  ["#############", "#AA.D.....BD#", "###B#.#.#.###", "  #D#.#C#.#", "  #D#B#C#C#", "  #A#B#C#A#", "  #########"],
  ["#############", "#AA.D......D#", "###B#.#.#.###", "  #D#B#C#.#", "  #D#B#C#C#", "  #A#B#C#A#", "  #########"],
  ["#############", "#AA.D......D#", "###B#.#C#.###", "  #D#B#C#.#", "  #D#B#C#.#", "  #A#B#C#A#", "  #########"],
  ["#############", "#AA.D.....AD#", "###B#.#C#.###", "  #D#B#C#.#", "  #D#B#C#.#", "  #A#B#C#.#", "  #########"],
  ["#############", "#AA.......AD#", "###B#.#C#.###", "  #D#B#C#.#", "  #D#B#C#.#", "  #A#B#C#D#", "  #########"],
  ["#############", "#AA.......AD#", "###.#B#C#.###", "  #D#B#C#.#", "  #D#B#C#.#", "  #A#B#C#D#", "  #########"],
  ["#############", "#AA.......AD#", "###.#B#C#.###", "  #.#B#C#.#", "  #D#B#C#D#", "  #A#B#C#D#", "  #########"],
  ["#############", "#AA.D.....AD#", "###.#B#C#.###", "  #.#B#C#.#", "  #.#B#C#D#", "  #A#B#C#D#", "  #########"],
  ["#############", "#A..D.....AD#", "###.#B#C#.###", "  #.#B#C#.#", "  #A#B#C#D#", "  #A#B#C#D#", "  #########"],
  ["#############", "#...D.....AD#", "###.#B#C#.###", "  #A#B#C#.#", "  #A#B#C#D#", "  #A#B#C#D#", "  #########"],
  ["#############", "#.........AD#", "###.#B#C#.###", "  #A#B#C#D#", "  #A#B#C#D#", "  #A#B#C#D#", "  #########"],
  ["#############", "#..........D#", "###A#B#C#.###", "  #A#B#C#D#", "  #A#B#C#D#", "  #A#B#C#D#", "  #########"],
  ["#############", "#...........#", "###A#B#C#D###", "  #A#B#C#D#", "  #A#B#C#D#", "  #A#B#C#D#", "  #########"],
];

const testSetup = {
  initialPositions: {
    A1: Positions.ROOM_1_WINDOW,
    A2: Positions.ROOM_4_WINDOW,
    B1: Positions.ROOM_1_DOOR,
    B2: Positions.ROOM_3_DOOR,
    C1: Positions.ROOM_2_DOOR,
    C2: Positions.ROOM_3_WINDOW,
    D1: Positions.ROOM_4_DOOR,
    D2: Positions.ROOM_2_WINDOW,
  },
};

const testSetupExtended = {
  initialPositions: {
    A1: "room-1-window",
    A2: "room-4-window",
    A3: "room-4-1",
    A4: "room-3-2",
    B1: "room-1-door",
    B2: "room-3-door",
    B3: "room-3-1",
    B4: "room-2-2",
    C1: "room-2-door",
    C2: "room-3-window",
    C3: "room-2-1",
    C4: "room-4-2",
    D1: "room-4-door",
    D2: "room-2-window",
    D3: "room-1-1",
    D4: "room-1-2",
  },
};

describe("parseLinesIntoSetup", () => {
  const { parseLinesIntoSetup } = Import;
  it("works as expected", () => {
    const setup = parseLinesIntoSetup(testData1);
    expect(setup).toEqual(testSetup);
  });
  it("- when used in extended-mode - works as expected", () => {
    const setup = parseLinesIntoSetup(testData1, true);
    expect(setup).toEqual(testSetupExtended);
    expect(Import.createPositionsOutput(setup.initialPositions, true)).toEqual([
      "#############",
      "#...........#",
      "###B#C#B#D###",
      "  #D#C#B#A#",
      "  #D#B#A#C#",
      "  #A#D#C#A#",
      "  #########",
    ]);
  });
});

describe("isFinal", () => {
  const { isFinal } = Import;
  it("works as expected", () => {
    const testFinalPositions = {
      A1: Positions.ROOM_1_DOOR,
      A2: Positions.ROOM_1_WINDOW,
      B1: Positions.ROOM_2_WINDOW,
      B2: Positions.ROOM_2_DOOR,
      C1: Positions.ROOM_3_WINDOW,
      C2: Positions.ROOM_3_DOOR,
      D1: Positions.ROOM_4_DOOR,
      D2: Positions.ROOM_4_WINDOW,
    };

    expect(isFinal(testSetup.initialPositions)).toBe(false);
    expect(isFinal(testFinalPositions)).toBe(true);
    expect(isFinal({ ...testFinalPositions, C2: Positions.HALLWAY_LEFT_SIDE })).toBe(false);
  });
  it("- when used in extended-mode - works as expected", () => {
    const testFinalPositions = {
      A1: AdditionalPositions.ROOM_1_BEHIND_DOOR,
      A2: AdditionalPositions.ROOM_1_BEHIND_WINDOW,
      A3: Positions.ROOM_1_DOOR,
      A4: Positions.ROOM_1_WINDOW,
      B1: Positions.ROOM_2_WINDOW,
      B2: AdditionalPositions.ROOM_2_BEHIND_DOOR,
      B3: AdditionalPositions.ROOM_2_BEHIND_WINDOW,
      B4: Positions.ROOM_2_DOOR,
      C1: AdditionalPositions.ROOM_3_BEHIND_WINDOW,
      C2: Positions.ROOM_3_DOOR,
      C3: Positions.ROOM_3_WINDOW,
      C4: AdditionalPositions.ROOM_3_BEHIND_DOOR,
      D1: AdditionalPositions.ROOM_4_BEHIND_DOOR,
      D2: AdditionalPositions.ROOM_4_BEHIND_WINDOW,
      D3: Positions.ROOM_4_DOOR,
      D4: Positions.ROOM_4_WINDOW,
    };

    expect(isFinal(testSetupExtended.initialPositions, true)).toBe(false);
    expect(isFinal(testFinalPositions, true)).toBe(true);
    expect(isFinal({ ...testFinalPositions, C2: Positions.HALLWAY_LEFT_SIDE }, true)).toBe(false);
  });
});

describe("listPossibleNextMoves", () => {
  const { listPossibleNextMoves } = Import;
  it("works as expected", () => {
    const result1 = listPossibleNextMoves({ currentPositions: testSetup.initialPositions });
    expect(result1).toEqual([
      { hasPriority: false, id: "B1", positionFrom: "room-1-door", positionTo: "hall-1" },
      { hasPriority: false, id: "B1", positionFrom: "room-1-door", positionTo: "hall-2" },
      { hasPriority: false, id: "B1", positionFrom: "room-1-door", positionTo: "hall-3" },
      { hasPriority: false, id: "B1", positionFrom: "room-1-door", positionTo: "hall-4" },
      { hasPriority: false, id: "B1", positionFrom: "room-1-door", positionTo: "hall-5" },
      { hasPriority: false, id: "B1", positionFrom: "room-1-door", positionTo: "hall-6" },
      { hasPriority: false, id: "B1", positionFrom: "room-1-door", positionTo: "hall-7" },
      { hasPriority: false, id: "B2", positionFrom: "room-3-door", positionTo: "hall-1" },
      { hasPriority: false, id: "B2", positionFrom: "room-3-door", positionTo: "hall-2" },
      { hasPriority: false, id: "B2", positionFrom: "room-3-door", positionTo: "hall-3" },
      { hasPriority: false, id: "B2", positionFrom: "room-3-door", positionTo: "hall-4" },
      { hasPriority: false, id: "B2", positionFrom: "room-3-door", positionTo: "hall-5" },
      { hasPriority: false, id: "B2", positionFrom: "room-3-door", positionTo: "hall-6" },
      { hasPriority: false, id: "B2", positionFrom: "room-3-door", positionTo: "hall-7" },
      { hasPriority: false, id: "C1", positionFrom: "room-2-door", positionTo: "hall-1" },
      { hasPriority: false, id: "C1", positionFrom: "room-2-door", positionTo: "hall-2" },
      { hasPriority: false, id: "C1", positionFrom: "room-2-door", positionTo: "hall-3" },
      { hasPriority: false, id: "C1", positionFrom: "room-2-door", positionTo: "hall-4" },
      { hasPriority: false, id: "C1", positionFrom: "room-2-door", positionTo: "hall-5" },
      { hasPriority: false, id: "C1", positionFrom: "room-2-door", positionTo: "hall-6" },
      { hasPriority: false, id: "C1", positionFrom: "room-2-door", positionTo: "hall-7" },
      { hasPriority: false, id: "D1", positionFrom: "room-4-door", positionTo: "hall-1" },
      { hasPriority: false, id: "D1", positionFrom: "room-4-door", positionTo: "hall-2" },
      { hasPriority: false, id: "D1", positionFrom: "room-4-door", positionTo: "hall-3" },
      { hasPriority: false, id: "D1", positionFrom: "room-4-door", positionTo: "hall-4" },
      { hasPriority: false, id: "D1", positionFrom: "room-4-door", positionTo: "hall-5" },
      { hasPriority: false, id: "D1", positionFrom: "room-4-door", positionTo: "hall-6" },
      { hasPriority: false, id: "D1", positionFrom: "room-4-door", positionTo: "hall-7" },
    ]);

    const currentPositions2 = {
      A1: Positions.ROOM_1_WINDOW,
      A2: Positions.ROOM_4_WINDOW,
      B1: Positions.ROOM_1_DOOR,
      B2: Positions.HALLWAY_RIGHT_SIDE,
      C1: Positions.HALLWAY_ROOMS_2_3,
      C2: Positions.HALLWAY_LEFT_END,
      D1: Positions.ROOM_4_DOOR,
      D2: Positions.ROOM_2_WINDOW,
    };
    expect(Import.createPositionsOutput(currentPositions2)).toEqual([
      "#############",
      "#c....C...b.#",
      "###B#.#.#D###",
      "  #A#d#.#a#",
      "  #########",
    ]);
    const result2 = listPossibleNextMoves({ currentPositions: currentPositions2 });
    expect(result2).toEqual([
      { hasPriority: false, id: "B1", positionFrom: "room-1-door", positionTo: "hall-2" },
      { hasPriority: false, id: "B1", positionFrom: "room-1-door", positionTo: "hall-3" },
      { hasPriority: true, id: "C1", positionFrom: "hall-4", positionTo: "room-3-window" },
      { hasPriority: false, id: "D1", positionFrom: "room-4-door", positionTo: "hall-5" },
      { hasPriority: false, id: "D2", positionFrom: "room-2-window", positionTo: "hall-2" },
      { hasPriority: false, id: "D2", positionFrom: "room-2-window", positionTo: "hall-3" },
    ]);

    const currentPositions3 = {
      A1: Positions.ROOM_1_DOOR,
      A2: Positions.ROOM_1_WINDOW,
      B1: Positions.HALLWAY_RIGHT_SIDE,
      B2: Positions.ROOM_2_WINDOW,
      C1: Positions.ROOM_3_WINDOW,
      C2: Positions.ROOM_3_DOOR,
      D1: Positions.ROOM_4_DOOR,
      D2: Positions.ROOM_4_WINDOW,
    };
    expect(Import.createPositionsOutput(currentPositions3)).toEqual([
      "#############",
      "#.........B.#",
      "###A#.#c#D###",
      "  #a#b#C#d#",
      "  #########",
    ]);
    const result3 = listPossibleNextMoves({ currentPositions: currentPositions3 });
    expect(result3).toEqual([
      {
        hasPriority: true,
        id: "B1",
        positionFrom: "hall-6",
        positionTo: "room-2-door",
      },
    ]);

    const currentPositions4 = {
      A1: Positions.ROOM_1_DOOR,
      A2: Positions.ROOM_1_WINDOW,
      B1: Positions.HALLWAY_RIGHT_SIDE,
      B2: Positions.ROOM_2_DOOR,
      C1: Positions.ROOM_3_WINDOW,
      C2: Positions.ROOM_3_DOOR,
      D1: Positions.ROOM_4_DOOR,
      D2: Positions.ROOM_4_WINDOW,
    };
    expect(Import.createPositionsOutput(currentPositions4)).toEqual([
      "#############",
      "#.........B.#",
      "###A#b#c#D###",
      "  #a#.#C#d#",
      "  #########",
    ]);
    const result4 = listPossibleNextMoves({ currentPositions: currentPositions4 });
    expect(result4).toEqual([
      { hasPriority: true, id: "B2", positionFrom: "room-2-door", positionTo: "room-2-window" },
    ]);
  });

  it("- when used in extended-mode - can lead to example solution", () => {
    const listOfCurrentPositions = testSolutionExtended.map(
      item => Import.parseLinesIntoSetupFromExtendedInput(item).initialPositions
    );

    const steps = listOfCurrentPositions.slice(1).map((currentPositions, index) => {
      const allCurrentPositions = Object.values(currentPositions);
      const allPreviousPositions = Object.values(listOfCurrentPositions[index]);
      const newPositions = allCurrentPositions.filter(pos => !allPreviousPositions.includes(pos));
      const oldPositions = allPreviousPositions.filter(pos => !allCurrentPositions.includes(pos));
      if (newPositions.length !== 1 || oldPositions.length !== 1) {
        return { newPositions, oldPositions };
      }
      const id = Object.keys(currentPositions).find(key => currentPositions[key] === newPositions[0]);
      return {
        type: id[0],
        indexFrom: index,
        positionFrom: oldPositions[0],
        positionTo: newPositions[0],
      };
    });

    expect(steps).toEqual([
      { indexFrom: 0, type: "D", positionFrom: "room-4-door", positionTo: "hall-7" },
      { indexFrom: 1, type: "A", positionFrom: "room-4-1", positionTo: "hall-1" },
      { indexFrom: 2, type: "B", positionFrom: "room-3-door", positionTo: "hall-6" },
      { indexFrom: 3, type: "B", positionFrom: "room-3-1", positionTo: "hall-5" },
      { indexFrom: 4, type: "A", positionFrom: "room-3-2", positionTo: "hall-2" },
      { indexFrom: 5, type: "C", positionFrom: "room-2-door", positionTo: "room-3-2" },
      { indexFrom: 6, type: "C", positionFrom: "room-2-1", positionTo: "room-3-1" },
      { indexFrom: 7, type: "B", positionFrom: "room-2-2", positionTo: "hall-4" },
      { indexFrom: 8, type: "D", positionFrom: "room-2-window", positionTo: "hall-3" },
      { indexFrom: 9, type: "B", positionFrom: "hall-4", positionTo: "room-2-window" },
      { indexFrom: 10, type: "B", positionFrom: "hall-5", positionTo: "room-2-2" },
      { indexFrom: 11, type: "B", positionFrom: "hall-6", positionTo: "room-2-1" },
      { indexFrom: 12, type: "C", positionFrom: "room-4-2", positionTo: "room-3-door" },
      { indexFrom: 13, type: "A", positionFrom: "room-4-window", positionTo: "hall-6" },
      { indexFrom: 14, type: "D", positionFrom: "hall-3", positionTo: "room-4-window" },
      { indexFrom: 15, type: "B", positionFrom: "room-1-door", positionTo: "room-2-door" },
      { indexFrom: 16, type: "D", positionFrom: "room-1-1", positionTo: "room-4-2" },
      { indexFrom: 17, type: "D", positionFrom: "room-1-2", positionTo: "hall-3" },
      { indexFrom: 18, type: "A", positionFrom: "hall-2", positionTo: "room-1-2" },
      { indexFrom: 19, type: "A", positionFrom: "hall-1", positionTo: "room-1-1" },
      { indexFrom: 20, type: "D", positionFrom: "hall-3", positionTo: "room-4-1" },
      { indexFrom: 21, type: "A", positionFrom: "hall-6", positionTo: "room-1-door" },
      { indexFrom: 22, type: "D", positionFrom: "hall-7", positionTo: "room-4-door" },
    ]);

    const matchingResults = steps.map(({ indexFrom, type, positionFrom, positionTo }) => {
      const currentPositions = listOfCurrentPositions[indexFrom];
      const results = listPossibleNextMoves({ currentPositions, isExtendedMode: true });
      const _checkIfIsMatching = move =>
        move.id[0] === type && move.positionFrom === positionFrom && move.positionTo === positionTo;
      const matching = results.filter(_checkIfIsMatching);
      if (matching.length > 0) {
        return matching;
      }
      return { allResults: results };
    });

    expect(matchingResults).toEqual([
      [{ hasPriority: false, id: "D1", positionFrom: "room-4-door", positionTo: "hall-7" }],
      [{ hasPriority: false, id: "A1", positionFrom: "room-4-1", positionTo: "hall-1" }],
      [{ hasPriority: false, id: "B2", positionFrom: "room-3-door", positionTo: "hall-6" }],
      [{ hasPriority: false, id: "B3", positionFrom: "room-3-1", positionTo: "hall-5" }],
      [{ hasPriority: false, id: "A2", positionFrom: "room-3-2", positionTo: "hall-2" }],
      [{ hasPriority: false, id: "C1", positionFrom: "room-2-door", positionTo: "room-3-2" }],
      [{ hasPriority: false, id: "C1", positionFrom: "room-2-1", positionTo: "room-3-1" }],
      [{ hasPriority: false, id: "B4", positionFrom: "room-2-2", positionTo: "hall-4" }],
      [{ hasPriority: false, id: "D4", positionFrom: "room-2-window", positionTo: "hall-3" }],
      [{ hasPriority: true, id: "B1", positionFrom: "hall-4", positionTo: "room-2-window" }],
      [{ hasPriority: true, id: "B1", positionFrom: "hall-5", positionTo: "room-2-2" }],
      [{ hasPriority: true, id: "B1", positionFrom: "hall-6", positionTo: "room-2-1" }],
      [{ hasPriority: false, id: "C3", positionFrom: "room-4-2", positionTo: "room-3-door" }],
      [{ hasPriority: false, id: "A4", positionFrom: "room-4-window", positionTo: "hall-6" }],
      [{ hasPriority: true, id: "D1", positionFrom: "hall-3", positionTo: "room-4-window" }],
      [{ hasPriority: false, id: "B1", positionFrom: "room-1-door", positionTo: "room-2-door" }],
      [{ hasPriority: false, id: "D2", positionFrom: "room-1-1", positionTo: "room-4-2" }],
      [{ hasPriority: false, id: "D2", positionFrom: "room-1-2", positionTo: "hall-3" }],
      [{ hasPriority: true, id: "A2", positionFrom: "hall-2", positionTo: "room-1-2" }],
      [{ hasPriority: true, id: "A1", positionFrom: "hall-1", positionTo: "room-1-1" }],
      [{ hasPriority: true, id: "D1", positionFrom: "hall-3", positionTo: "room-4-1" }],
      [{ hasPriority: true, id: "A1", positionFrom: "hall-6", positionTo: "room-1-door" }],
      [{ hasPriority: true, id: "D1", positionFrom: "hall-7", positionTo: "room-4-door" }],
    ]);
  });
});

describe("getMinimalNeededEnergyToOrganizeAmphipods", () => {
  const { getMinimalNeededEnergyToOrganizeAmphipods } = Import;
  it("works as expected", () => {
    const result1 = getMinimalNeededEnergyToOrganizeAmphipods({
      initialPositions: {
        A1: Positions.ROOM_1_DOOR,
        A2: Positions.ROOM_1_WINDOW,
        B1: Positions.HALLWAY_RIGHT_SIDE,
        B2: Positions.ROOM_2_DOOR,
        C1: Positions.ROOM_3_WINDOW,
        C2: Positions.ROOM_3_DOOR,
        D1: Positions.HALLWAY_LEFT_END,
        D2: Positions.ROOM_4_WINDOW,
      },
    });
    expect(result1).toBe(9070);

    const result2 = getMinimalNeededEnergyToOrganizeAmphipods(testSetup);
    expect(result2).toBe(12521);
  });
});

describe.skip("getSolutionPart1", () => {
  const { getSolutionPart1 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart1();
    expect(result).not.toBe(19703);
    expect(result).toBe(15358);
  });
});

describe.skip("getSolutionPart2", () => {
  const { getSolutionPart2 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart2();
    expect(result).toBe(51436);
  });
});
