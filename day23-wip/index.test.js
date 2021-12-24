// @ts-check

const Import = require("./index");
const { Positions, MovementDirections } = require("./constants");

const testData1 = [
  //
  "#############",
  "#...........#",
  "###B#C#B#D###",
  "  #A#D#C#A#",
  "  #########",
];

const testSetup1 = {
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

describe("parseLinesIntoSetup", () => {
  const { parseLinesIntoSetup } = Import;
  it("works as expected", () => {
    const setup = parseLinesIntoSetup(testData1);
    expect(setup).toEqual(testSetup1);
  });
});

describe("listIdsByPosition", () => {
  const { listIdsByPosition } = Import;
  it("works as expected", () => {
    expect(listIdsByPosition(testSetup1.initialPositions)).toEqual({
      HALLWAY_LEFT_END: null,
      HALLWAY_LEFT_SIDE: null,
      HALLWAY_RIGHT_END: null,
      HALLWAY_RIGHT_SIDE: null,
      HALLWAY_ROOMS_1_2: null,
      HALLWAY_ROOMS_2_3: null,
      HALLWAY_ROOMS_3_4: null,
      ROOM_1_DOOR: "B1",
      ROOM_1_WINDOW: "A1",
      ROOM_2_DOOR: "C1",
      ROOM_2_WINDOW: "D2",
      ROOM_3_DOOR: "B2",
      ROOM_3_WINDOW: "C2",
      ROOM_4_DOOR: "D1",
      ROOM_4_WINDOW: "A2",
    });
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

    expect(isFinal(testSetup1.initialPositions)).toBe(false);
    expect(isFinal(testFinalPositions)).toBe(true);
    expect(isFinal({ ...testFinalPositions, C2: Positions.HALLWAY_LEFT_SIDE })).toBe(false);
  });
});

describe("getMovementDirection", () => {
  const { getMovementDirection } = Import;
  it("works as expected", () => {
    const results = [
      getMovementDirection({ positionFrom: Positions.ROOM_1_DOOR, positionTo: Positions.HALLWAY_ROOMS_1_2 }),
      getMovementDirection({ positionFrom: Positions.ROOM_1_DOOR, positionTo: Positions.ROOM_1_WINDOW }),
      getMovementDirection({ positionFrom: Positions.HALLWAY_ROOMS_2_3, positionTo: Positions.ROOM_2_DOOR }),
      getMovementDirection({ positionFrom: Positions.HALLWAY_ROOMS_2_3, positionTo: Positions.HALLWAY_ROOMS_1_2 }),
    ];
    expect(results).toEqual([
      MovementDirections.OUT_OF_ROOM,
      MovementDirections.INSIDE_ROOM,
      MovementDirections.OUT_OF_HALL,
      MovementDirections.INSIDE_HALL,
    ]);
  });
});

describe("checkIfPositionIsInTargetRoom", () => {
  const { checkIfPositionIsInTargetRoom } = Import;
  it("works as expected", () => {
    const results = [
      checkIfPositionIsInTargetRoom({ position: Positions.HALLWAY_RIGHT_END, id: "B2" }),
      checkIfPositionIsInTargetRoom({ position: Positions.ROOM_1_DOOR, id: "B2" }),
      checkIfPositionIsInTargetRoom({ position: Positions.ROOM_1_WINDOW, id: "B2" }),
      checkIfPositionIsInTargetRoom({ position: Positions.ROOM_2_DOOR, id: "B2" }),
      checkIfPositionIsInTargetRoom({ position: Positions.ROOM_2_WINDOW, id: "B2" }),
    ];
    expect(results).toEqual([false, false, false, true, true]);
  });
});

describe("checkIfRoomWithPositionHasOnlyTargetIds", () => {
  const { checkIfRoomWithPositionHasOnlyTargetIds } = Import;
  it("works as expected", () => {
    const currentPositions = {
      A1: Positions.ROOM_1_WINDOW,
      A2: Positions.ROOM_4_WINDOW,
      B1: Positions.ROOM_2_DOOR,
      B2: Positions.HALLWAY_RIGHT_END,
      C1: Positions.HALLWAY_ROOMS_2_3,
      C2: Positions.HALLWAY_LEFT_END,
      D1: Positions.ROOM_4_DOOR,
      D2: Positions.ROOM_2_WINDOW,
    };
    const results = [
      checkIfRoomWithPositionHasOnlyTargetIds({ currentPositions, position: Positions.HALLWAY_LEFT_END }) === false,
      checkIfRoomWithPositionHasOnlyTargetIds({ currentPositions, position: Positions.ROOM_1_DOOR }) === true,
      checkIfRoomWithPositionHasOnlyTargetIds({ currentPositions, position: Positions.ROOM_1_WINDOW }) === true,
      checkIfRoomWithPositionHasOnlyTargetIds({ currentPositions, position: Positions.ROOM_2_DOOR }) === false,
      checkIfRoomWithPositionHasOnlyTargetIds({ currentPositions, position: Positions.ROOM_2_WINDOW }) === false,
      checkIfRoomWithPositionHasOnlyTargetIds({ currentPositions, position: Positions.ROOM_3_DOOR }) === true,
      checkIfRoomWithPositionHasOnlyTargetIds({ currentPositions, position: Positions.ROOM_3_WINDOW }) === true,
    ];
    expect(results.every(Boolean)).toBe(true);
  });
});

describe("checkIfRoomWithPositionIsEmpty", () => {
  const { checkIfRoomWithPositionIsEmpty } = Import;
  it("works as expected", () => {
    const currentPositions = {
      A1: Positions.ROOM_1_WINDOW,
      A2: Positions.ROOM_4_WINDOW,
      B1: Positions.ROOM_2_DOOR,
      B2: Positions.HALLWAY_RIGHT_END,
      C1: Positions.HALLWAY_ROOMS_2_3,
      C2: Positions.HALLWAY_LEFT_END,
      D1: Positions.ROOM_4_DOOR,
      D2: Positions.ROOM_2_WINDOW,
    };
    const results = [
      checkIfRoomWithPositionIsEmpty({ currentPositions, position: Positions.HALLWAY_LEFT_END }) === false,
      checkIfRoomWithPositionIsEmpty({ currentPositions, position: Positions.ROOM_1_DOOR }) === false,
      checkIfRoomWithPositionIsEmpty({ currentPositions, position: Positions.ROOM_1_WINDOW }) === false,
      checkIfRoomWithPositionIsEmpty({ currentPositions, position: Positions.ROOM_2_DOOR }) === false,
      checkIfRoomWithPositionIsEmpty({ currentPositions, position: Positions.ROOM_2_WINDOW }) === false,
      checkIfRoomWithPositionIsEmpty({ currentPositions, position: Positions.ROOM_3_DOOR }) === true,
      checkIfRoomWithPositionIsEmpty({ currentPositions, position: Positions.ROOM_3_WINDOW }) === true,
    ];
    expect(results.every(Boolean)).toBe(true);
  });
});

describe("listPossibleNextSteps", () => {
  const { listPossibleNextSteps } = Import;
  it("works as expected", () => {
    const result1 = listPossibleNextSteps({
      currentPositions: testSetup1.initialPositions,
      lastStep: {},
    });
    const resultWithKeys1 = result1.map(item => ({
      ...item,
      from: _getPositionKey(item.from),
      to: _getPositionKey(item.to),
    }));

    expect(resultWithKeys1).toEqual([
      {
        id: "B1",
        from: "Positions.ROOM_1_DOOR",
        to: "Positions.HALLWAY_LEFT_SIDE",
        distance: 2,
        hasToKeepMoving: false,
      },
      {
        id: "B1",
        from: "Positions.ROOM_1_DOOR",
        to: "Positions.HALLWAY_ROOMS_1_2",
        distance: 2,
        hasToKeepMoving: false,
      },
      {
        id: "B2",
        from: "Positions.ROOM_3_DOOR",
        to: "Positions.HALLWAY_ROOMS_2_3",
        distance: 2,
        hasToKeepMoving: false,
      },
      {
        id: "B2",
        from: "Positions.ROOM_3_DOOR",
        to: "Positions.HALLWAY_ROOMS_3_4",
        distance: 2,
        hasToKeepMoving: false,
      },
      {
        id: "C1",
        from: "Positions.ROOM_2_DOOR",
        to: "Positions.HALLWAY_ROOMS_1_2",
        distance: 2,
        hasToKeepMoving: false,
      },
      {
        id: "C1",
        from: "Positions.ROOM_2_DOOR",
        to: "Positions.HALLWAY_ROOMS_2_3",
        distance: 2,
        hasToKeepMoving: false,
      },
      {
        id: "D1",
        from: "Positions.ROOM_4_DOOR",
        to: "Positions.HALLWAY_ROOMS_3_4",
        distance: 2,
        hasToKeepMoving: false,
      },
      {
        id: "D1",
        from: "Positions.ROOM_4_DOOR",
        to: "Positions.HALLWAY_RIGHT_SIDE",
        distance: 2,
        hasToKeepMoving: false,
      },
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
    const lastStep2 = {
      id: "B2",
      from: Positions.HALLWAY_ROOMS_3_4,
      to: Positions.HALLWAY_RIGHT_SIDE,
      hasToKeepMoving: false,
    };
    expect(Import.createPositionsOutput(currentPositions2)).toEqual([
      "#############",
      "#c....C...b.#",
      "###B#.#.#D###",
      "  #A#d#.#a#",
      "  #########",
    ]);
    const result2 = listPossibleNextSteps({ currentPositions: currentPositions2, lastStep: lastStep2 });
    const resultWithKeys2 = result2.map(item => ({
      ...item,
      from: _getPositionKey(item.from),
      to: _getPositionKey(item.to),
    }));

    expect(resultWithKeys2).toEqual([
      {
        id: "B1",
        from: "Positions.ROOM_1_DOOR",
        to: "Positions.HALLWAY_LEFT_SIDE",
        distance: 2,
        hasToKeepMoving: false,
      },
      {
        id: "B1",
        from: "Positions.ROOM_1_DOOR",
        to: "Positions.HALLWAY_ROOMS_1_2",
        distance: 2,
        hasToKeepMoving: false,
      },
      {
        id: "B2",
        from: "Positions.HALLWAY_RIGHT_SIDE",
        to: "Positions.HALLWAY_RIGHT_END",
        distance: 1,
        hasToKeepMoving: false,
      },
      {
        id: "C1",
        from: "Positions.HALLWAY_ROOMS_2_3",
        to: "Positions.HALLWAY_ROOMS_1_2",
        distance: 2,
        hasToKeepMoving: true,
      },
      {
        id: "C1",
        from: "Positions.HALLWAY_ROOMS_2_3",
        to: "Positions.HALLWAY_ROOMS_3_4",
        distance: 2,
        hasToKeepMoving: true,
      },
      {
        id: "C1",
        from: "Positions.HALLWAY_ROOMS_2_3",
        to: "Positions.ROOM_3_DOOR",
        distance: 2,
        hasToKeepMoving: true,
      },
      {
        id: "C2",
        from: "Positions.HALLWAY_LEFT_END",
        to: "Positions.HALLWAY_LEFT_SIDE",
        distance: 1,
        hasToKeepMoving: true,
      },
      {
        id: "D1",
        from: "Positions.ROOM_4_DOOR",
        to: "Positions.HALLWAY_ROOMS_3_4",
        distance: 2,
        hasToKeepMoving: false,
      },
      {
        id: "D2",
        from: "Positions.ROOM_2_WINDOW",
        to: "Positions.ROOM_2_DOOR",
        distance: 1,
        hasToKeepMoving: true,
      },
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
    const lastStep3 = {};
    expect(Import.createPositionsOutput(currentPositions3)).toEqual([
      "#############",
      "#.........B.#",
      "###A#.#c#D###",
      "  #a#b#C#d#",
      "  #########",
    ]);
    const result3 = listPossibleNextSteps({ currentPositions: currentPositions3, lastStep: lastStep3 });
    const resultWithKeys3 = result3.map(item => ({
      ...item,
      from: _getPositionKey(item.from),
      to: _getPositionKey(item.to),
    }));
    expect(resultWithKeys3).toMatchInlineSnapshot(`
Array [
  Object {
    "distance": 1,
    "from": "Positions.HALLWAY_RIGHT_SIDE",
    "hasToKeepMoving": true,
    "id": "B1",
    "to": "Positions.HALLWAY_RIGHT_END",
  },
  Object {
    "distance": 2,
    "from": "Positions.HALLWAY_RIGHT_SIDE",
    "hasToKeepMoving": true,
    "id": "B1",
    "to": "Positions.HALLWAY_ROOMS_3_4",
  },
]
`);
  });
});

describe("getMinimalNeededEnergyToOrganizeAmphipods", () => {
  const { getMinimalNeededEnergyToOrganizeAmphipods } = Import;
  it("works as expected", () => {
    // const result = getMinimalNeededEnergyToOrganizeAmphipods({
    //   initialPositions: {
    //     A1: Positions.ROOM_1_DOOR,
    //     A2: Positions.ROOM_1_WINDOW,
    //     B1: Positions.HALLWAY_RIGHT_SIDE,
    //     B2: Positions.ROOM_2_DOOR,
    //     C1: Positions.ROOM_3_WINDOW,
    //     C2: Positions.ROOM_3_DOOR,
    //     D1: Positions.HALLWAY_LEFT_END,
    //     D2: Positions.ROOM_4_WINDOW,
    //   },
    // });
    // expect(result).toBe(79);

    const result = getMinimalNeededEnergyToOrganizeAmphipods(testSetup1);
    expect(result).toBe(12521);
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

function _getPositionKey(value) {
  const key = Object.keys(Positions).find(key => Positions[key] === value);
  return key ? `Positions.${key}` : null;
}
