// @ts-check

// const Positions = Object.freeze({
//   HALLWAY_LEFT_END: 0,
//   HALLWAY_LEFT_SIDE: 1,
//   HALLWAY_ROOMS_1_2: 2,
//   HALLWAY_ROOMS_2_3: 3,
//   HALLWAY_ROOMS_3_4: 4,
//   HALLWAY_RIGHT_SIDE: 5,
//   HALLWAY_RIGHT_END: 6,
//   ROOM_1_DOOR: 7,
//   ROOM_1_WINDOW: 8,
//   ROOM_2_DOOR: 9,
//   ROOM_2_WINDOW: 10,
//   ROOM_3_DOOR: 11,
//   ROOM_3_WINDOW: 12,
//   ROOM_4_DOOR: 13,
//   ROOM_4_WINDOW: 14,
// });

const Positions = Object.freeze({
  HALLWAY_LEFT_END: "hall-1",
  HALLWAY_LEFT_SIDE: "hall-2",
  HALLWAY_ROOMS_1_2: "hall-3",
  HALLWAY_ROOMS_2_3: "hall-4",
  HALLWAY_ROOMS_3_4: "hall-5",
  HALLWAY_RIGHT_SIDE: "hall-6",
  HALLWAY_RIGHT_END: "hall-7",
  ROOM_1_DOOR: "room-1-door",
  ROOM_1_WINDOW: "room-1",
  ROOM_2_DOOR: "room-2-door",
  ROOM_2_WINDOW: "room-2",
  ROOM_3_DOOR: "room-3-door",
  ROOM_3_WINDOW: "room-3",
  ROOM_4_DOOR: "room-4-door",
  ROOM_4_WINDOW: "room-4",
});

const WindowPositions = [
  Positions.ROOM_1_WINDOW,
  Positions.ROOM_2_WINDOW,
  Positions.ROOM_3_WINDOW,
  Positions.ROOM_4_WINDOW,
];

const DoorPositions = [Positions.ROOM_1_DOOR, Positions.ROOM_2_DOOR, Positions.ROOM_3_DOOR, Positions.ROOM_4_DOOR];

const HallPositions = [
  Positions.HALLWAY_LEFT_END,
  Positions.HALLWAY_LEFT_SIDE,
  Positions.HALLWAY_ROOMS_1_2,
  Positions.HALLWAY_ROOMS_2_3,
  Positions.HALLWAY_ROOMS_3_4,
  Positions.HALLWAY_RIGHT_SIDE,
  Positions.HALLWAY_RIGHT_END,
];

const MainPath = [
  { pos: Positions.HALLWAY_LEFT_END },
  { pos: Positions.HALLWAY_LEFT_SIDE },
  { subPath: [Positions.ROOM_1_DOOR, Positions.ROOM_1_WINDOW] },
  { pos: Positions.HALLWAY_ROOMS_1_2 },
  { subPath: [Positions.ROOM_2_DOOR, Positions.ROOM_2_WINDOW] },
  { pos: Positions.HALLWAY_ROOMS_2_3 },
  { subPath: [Positions.ROOM_3_DOOR, Positions.ROOM_3_WINDOW] },
  { pos: Positions.HALLWAY_ROOMS_3_4 },
  { subPath: [Positions.ROOM_4_DOOR, Positions.ROOM_4_WINDOW] },
  { pos: Positions.HALLWAY_RIGHT_SIDE },
  { pos: Positions.HALLWAY_RIGHT_END },
];

const Ids = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"];

const TargetPositionsById = Object.freeze({
  A1: [Positions.ROOM_1_DOOR, Positions.ROOM_1_WINDOW],
  A2: [Positions.ROOM_1_DOOR, Positions.ROOM_1_WINDOW],
  B1: [Positions.ROOM_2_DOOR, Positions.ROOM_2_WINDOW],
  B2: [Positions.ROOM_2_DOOR, Positions.ROOM_2_WINDOW],
  C1: [Positions.ROOM_3_DOOR, Positions.ROOM_3_WINDOW],
  C2: [Positions.ROOM_3_DOOR, Positions.ROOM_3_WINDOW],
  D1: [Positions.ROOM_4_DOOR, Positions.ROOM_4_WINDOW],
  D2: [Positions.ROOM_4_DOOR, Positions.ROOM_4_WINDOW],
});

const TargetIdsByPosition = Object.freeze({
  [Positions.ROOM_1_DOOR]: ["A1", "A2"],
  [Positions.ROOM_1_WINDOW]: ["A1", "A2"],
  [Positions.ROOM_2_DOOR]: ["B1", "B2"],
  [Positions.ROOM_2_WINDOW]: ["B1", "B2"],
  [Positions.ROOM_3_DOOR]: ["C1", "C2"],
  [Positions.ROOM_3_WINDOW]: ["C1", "C2"],
  [Positions.ROOM_4_DOOR]: ["D1", "D2"],
  [Positions.ROOM_4_WINDOW]: ["D1", "D2"],
});

const MapSinglePositionsToRoomPositions = Object.freeze({
  [Positions.ROOM_1_DOOR]: [Positions.ROOM_1_DOOR, Positions.ROOM_1_WINDOW],
  [Positions.ROOM_1_WINDOW]: [Positions.ROOM_1_DOOR, Positions.ROOM_1_WINDOW],
  [Positions.ROOM_2_DOOR]: [Positions.ROOM_2_DOOR, Positions.ROOM_2_WINDOW],
  [Positions.ROOM_2_WINDOW]: [Positions.ROOM_2_DOOR, Positions.ROOM_2_WINDOW],
  [Positions.ROOM_3_DOOR]: [Positions.ROOM_3_DOOR, Positions.ROOM_3_WINDOW],
  [Positions.ROOM_3_WINDOW]: [Positions.ROOM_3_DOOR, Positions.ROOM_3_WINDOW],
  [Positions.ROOM_4_DOOR]: [Positions.ROOM_4_DOOR, Positions.ROOM_4_WINDOW],
  [Positions.ROOM_4_WINDOW]: [Positions.ROOM_4_DOOR, Positions.ROOM_4_WINDOW],
});

const PossibleSteps = Object.freeze({
  [Positions.HALLWAY_LEFT_END]: [{ to: Positions.HALLWAY_LEFT_SIDE, distance: 1 }],
  [Positions.HALLWAY_LEFT_SIDE]: [
    { to: Positions.HALLWAY_LEFT_END, distance: 1 },
    { to: Positions.HALLWAY_ROOMS_1_2, distance: 2 },
    { to: Positions.ROOM_1_DOOR, distance: 2 },
  ],
  [Positions.HALLWAY_ROOMS_1_2]: [
    { to: Positions.HALLWAY_LEFT_SIDE, distance: 2 },
    { to: Positions.HALLWAY_ROOMS_2_3, distance: 2 },
    { to: Positions.ROOM_1_DOOR, distance: 2 },
    { to: Positions.ROOM_2_DOOR, distance: 2 },
  ],
  [Positions.HALLWAY_ROOMS_2_3]: [
    { to: Positions.HALLWAY_ROOMS_1_2, distance: 2 },
    { to: Positions.HALLWAY_ROOMS_3_4, distance: 2 },
    { to: Positions.ROOM_2_DOOR, distance: 2 },
    { to: Positions.ROOM_3_DOOR, distance: 2 },
  ],
  [Positions.HALLWAY_ROOMS_3_4]: [
    { to: Positions.HALLWAY_ROOMS_2_3, distance: 2 },
    { to: Positions.HALLWAY_RIGHT_SIDE, distance: 2 },
    { to: Positions.ROOM_3_DOOR, distance: 2 },
    { to: Positions.ROOM_4_DOOR, distance: 2 },
  ],
  [Positions.HALLWAY_RIGHT_SIDE]: [
    { to: Positions.HALLWAY_RIGHT_END, distance: 1 },
    { to: Positions.HALLWAY_ROOMS_3_4, distance: 2 },
    { to: Positions.ROOM_4_DOOR, distance: 2 },
  ],
  [Positions.HALLWAY_RIGHT_END]: [{ to: Positions.HALLWAY_RIGHT_SIDE, distance: 1 }],
  [Positions.ROOM_1_DOOR]: [
    { to: Positions.HALLWAY_LEFT_SIDE, distance: 2 },
    { to: Positions.HALLWAY_ROOMS_1_2, distance: 2 },
    { to: Positions.ROOM_1_WINDOW, distance: 1 },
  ],
  [Positions.ROOM_1_WINDOW]: [{ to: Positions.ROOM_1_DOOR, distance: 1 }],
  [Positions.ROOM_2_DOOR]: [
    { to: Positions.HALLWAY_ROOMS_1_2, distance: 2 },
    { to: Positions.HALLWAY_ROOMS_2_3, distance: 2 },
    { to: Positions.ROOM_2_WINDOW, distance: 1 },
  ],
  [Positions.ROOM_2_WINDOW]: [{ to: Positions.ROOM_2_DOOR, distance: 1 }],
  [Positions.ROOM_3_DOOR]: [
    { to: Positions.HALLWAY_ROOMS_2_3, distance: 2 },
    { to: Positions.HALLWAY_ROOMS_3_4, distance: 2 },
    { to: Positions.ROOM_3_WINDOW, distance: 1 },
  ],
  [Positions.ROOM_3_WINDOW]: [{ to: Positions.ROOM_3_DOOR, distance: 1 }],
  [Positions.ROOM_4_DOOR]: [
    { to: Positions.HALLWAY_ROOMS_3_4, distance: 2 },
    { to: Positions.HALLWAY_RIGHT_SIDE, distance: 2 },
    { to: Positions.ROOM_4_WINDOW, distance: 1 },
  ],
  [Positions.ROOM_4_WINDOW]: [{ to: Positions.ROOM_4_DOOR, distance: 1 }],
});

const EnergyConsumptionById = Object.freeze({
  A1: 1,
  A2: 1,
  B1: 10,
  B2: 10,
  C1: 100,
  C2: 100,
  D1: 1000,
  D2: 1000,
});

const MapIdToTargetRoom = Object.freeze({
  A1: "ROOM_1",
  A2: "ROOM_1",
  B1: "ROOM_2",
  B2: "ROOM_2",
  C1: "ROOM_3",
  C2: "ROOM_3",
  D1: "ROOM_4",
  D2: "ROOM_4",
});

const MovementDirections = Object.freeze({
  INSIDE_ROOM: 1,
  OUT_OF_ROOM: 2,
  INSIDE_HALL: 3,
  OUT_OF_HALL: 4,
});

const AnyPathBetweenTwoPositions = {};
_initAnyPathBetweenTwoPositions();

function _initAnyPathBetweenTwoPositions() {
  const allPositions = Object.values(Positions);
  for (let i = 0; i < allPositions.length; i++) {
    const positionFrom = allPositions[i];
    if (!AnyPathBetweenTwoPositions[positionFrom]) {
      AnyPathBetweenTwoPositions[positionFrom] = {};
    }
    for (let k = 0; k < allPositions.length; k++) {
      if (i !== k) {
        const positionTo = allPositions[k];
        AnyPathBetweenTwoPositions[positionFrom][positionTo] = listStepsOnPath({ positionFrom, positionTo });
      }
    }
  }
}

function listStepsOnPath({ positionFrom, positionTo }) {
  if (HallPositions.includes(positionFrom) && HallPositions.includes(positionTo)) {
    const index1 = MainPath.findIndex(item => item.pos === positionFrom);
    const index2 = MainPath.findIndex(item => item.pos === positionTo);
    if (index1 < index2) {
      return MainPath.slice(index1, index2 + 1).map(item => item.pos || null);
    }
    return MainPath.slice(index2, index1 + 1)
      .map(item => item.pos || null)
      .reverse();
  }

  if (HallPositions.includes(positionFrom)) {
    const indexSub = MainPath.findIndex(item => item.subPath && item.subPath.includes(positionTo));
    const indexFrom = MainPath.findIndex(item => item.pos === positionFrom);
    console.log({ positionFrom, positionTo, indexSub, indexFrom });
    const indexSubTo = MainPath[indexSub].subPath.indexOf(positionTo);

    if (indexFrom < indexSub) {
      return [
        ...MainPath.slice(indexFrom, indexSub + 1).map(item => item.pos || null),
        ...MainPath[indexSub].subPath.slice(0, indexSubTo + 1),
      ];
    }
    return [
      ...MainPath.slice(indexSub, indexFrom + 1)
        .map(item => item.pos || null)
        .reverse(),
      ...MainPath[indexSub].subPath.slice(0, indexSubTo + 1),
    ];
  }

  if (HallPositions.includes(positionTo)) {
    const indexSub = MainPath.findIndex(item => item.subPath && item.subPath.includes(positionFrom));
    const indexSubFrom = MainPath[indexSub].subPath.indexOf(positionFrom);
    const indexTo = MainPath.findIndex(item => item.pos === positionTo);

    if (indexSub < indexTo) {
      return [
        ...MainPath[indexSub].subPath.slice(0, indexSubFrom + 1).reverse(),
        ...MainPath.slice(indexSub, indexTo + 1).map(item => item.pos || null),
      ];
    }
    return [
      ...MainPath[indexSub].subPath.slice(0, indexSubFrom + 1).reverse(),
      ...MainPath.slice(indexTo, indexSub + 1)
        .map(item => item.pos || null)
        .reverse(),
    ];
  }

  const indexSub1 = MainPath.findIndex(item => item.subPath && item.subPath.includes(positionFrom));
  const indexSub2 = MainPath.findIndex(item => item.subPath && item.subPath.includes(positionTo));
  if (indexSub1 === indexSub2) {
    return [positionFrom, positionTo];
  }

  const indexSubFrom = MainPath[indexSub1].subPath.indexOf(positionFrom);
  const indexSubTo = MainPath[indexSub2].subPath.indexOf(positionTo);
  if (indexSub1 < indexSub2) {
    return [
      ...MainPath[indexSub1].subPath.slice(0, indexSubFrom + 1).reverse(),
      ...MainPath.slice(indexSub1, indexSub2 + 1).map(item => item.pos || null),
      ...MainPath[indexSub2].subPath.slice(0, indexSubTo + 1),
    ];
  } else {
    return [
      ...MainPath[indexSub1].subPath.slice(0, indexSubFrom + 1).reverse(),
      ...MainPath.slice(indexSub2, indexSub1 + 1)
        .map(item => item.pos || null)
        .reverse(),
      ...MainPath[indexSub2].subPath.slice(0, indexSubTo + 1),
    ];
  }
}

module.exports = {
  Positions,
  WindowPositions,
  DoorPositions,
  HallPositions,
  MainPath,
  Ids,
  TargetPositionsById,
  TargetIdsByPosition,
  MapSinglePositionsToRoomPositions,
  PossibleSteps,
  EnergyConsumptionById,
  MapIdToTargetRoom,
  MovementDirections,
  AnyPathBetweenTwoPositions,
};
