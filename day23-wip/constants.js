// @ts-check

const Positions = Object.freeze({
  HALLWAY_LEFT_END: "hall-1",
  HALLWAY_LEFT_SIDE: "hall-2",
  HALLWAY_ROOMS_1_2: "hall-3",
  HALLWAY_ROOMS_2_3: "hall-4",
  HALLWAY_ROOMS_3_4: "hall-5",
  HALLWAY_RIGHT_SIDE: "hall-6",
  HALLWAY_RIGHT_END: "hall-7",
  ROOM_1_DOOR: "room-1-door",
  ROOM_1_WINDOW: "room-1-window",
  ROOM_2_DOOR: "room-2-door",
  ROOM_2_WINDOW: "room-2-window",
  ROOM_3_DOOR: "room-3-door",
  ROOM_3_WINDOW: "room-3-window",
  ROOM_4_DOOR: "room-4-door",
  ROOM_4_WINDOW: "room-4-window",
});

const AdditionalPositions = Object.freeze({
  ROOM_1_BEHIND_DOOR: "room-1-1",
  ROOM_1_BEHIND_WINDOW: "room-1-2",
  ROOM_2_BEHIND_DOOR: "room-2-1",
  ROOM_2_BEHIND_WINDOW: "room-2-2",
  ROOM_3_BEHIND_DOOR: "room-3-1",
  ROOM_3_BEHIND_WINDOW: "room-3-2",
  ROOM_4_BEHIND_DOOR: "room-4-1",
  ROOM_4_BEHIND_WINDOW: "room-4-2",
});

const HallPositions = [
  Positions.HALLWAY_LEFT_END,
  Positions.HALLWAY_LEFT_SIDE,
  Positions.HALLWAY_ROOMS_1_2,
  Positions.HALLWAY_ROOMS_2_3,
  Positions.HALLWAY_ROOMS_3_4,
  Positions.HALLWAY_RIGHT_SIDE,
  Positions.HALLWAY_RIGHT_END,
];

const WindowPositions = [
  Positions.ROOM_1_WINDOW,
  Positions.ROOM_2_WINDOW,
  Positions.ROOM_3_WINDOW,
  Positions.ROOM_4_WINDOW,
];

const DoorPositions = [Positions.ROOM_1_DOOR, Positions.ROOM_2_DOOR, Positions.ROOM_3_DOOR, Positions.ROOM_4_DOOR];

const RoomPositions2 = [...WindowPositions, ...DoorPositions, ...Object.keys(AdditionalPositions)];

const Ids = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"];

const AdditionalIds = ["A3", "A4", "B3", "B4", "C3", "C4", "D3", "D4"];

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

const TargetPositionsById2 = Object.freeze({
  A1: [
    Positions.ROOM_1_DOOR,
    AdditionalPositions.ROOM_1_BEHIND_DOOR,
    AdditionalPositions.ROOM_1_BEHIND_WINDOW,
    Positions.ROOM_1_WINDOW,
  ],
  A2: [
    Positions.ROOM_1_DOOR,
    AdditionalPositions.ROOM_1_BEHIND_DOOR,
    AdditionalPositions.ROOM_1_BEHIND_WINDOW,
    Positions.ROOM_1_WINDOW,
  ],
  A3: [
    Positions.ROOM_1_DOOR,
    AdditionalPositions.ROOM_1_BEHIND_DOOR,
    AdditionalPositions.ROOM_1_BEHIND_WINDOW,
    Positions.ROOM_1_WINDOW,
  ],
  A4: [
    Positions.ROOM_1_DOOR,
    AdditionalPositions.ROOM_1_BEHIND_DOOR,
    AdditionalPositions.ROOM_1_BEHIND_WINDOW,
    Positions.ROOM_1_WINDOW,
  ],
  B1: [
    Positions.ROOM_2_DOOR,
    AdditionalPositions.ROOM_2_BEHIND_DOOR,
    AdditionalPositions.ROOM_2_BEHIND_WINDOW,
    Positions.ROOM_2_WINDOW,
  ],
  B2: [
    Positions.ROOM_2_DOOR,
    AdditionalPositions.ROOM_2_BEHIND_DOOR,
    AdditionalPositions.ROOM_2_BEHIND_WINDOW,
    Positions.ROOM_2_WINDOW,
  ],
  B3: [
    Positions.ROOM_2_DOOR,
    AdditionalPositions.ROOM_2_BEHIND_DOOR,
    AdditionalPositions.ROOM_2_BEHIND_WINDOW,
    Positions.ROOM_2_WINDOW,
  ],
  B4: [
    Positions.ROOM_2_DOOR,
    AdditionalPositions.ROOM_2_BEHIND_DOOR,
    AdditionalPositions.ROOM_2_BEHIND_WINDOW,
    Positions.ROOM_2_WINDOW,
  ],
  C1: [
    Positions.ROOM_3_DOOR,
    AdditionalPositions.ROOM_3_BEHIND_DOOR,
    AdditionalPositions.ROOM_3_BEHIND_WINDOW,
    Positions.ROOM_3_WINDOW,
  ],
  C2: [
    Positions.ROOM_3_DOOR,
    AdditionalPositions.ROOM_3_BEHIND_DOOR,
    AdditionalPositions.ROOM_3_BEHIND_WINDOW,
    Positions.ROOM_3_WINDOW,
  ],
  C3: [
    Positions.ROOM_3_DOOR,
    AdditionalPositions.ROOM_3_BEHIND_DOOR,
    AdditionalPositions.ROOM_3_BEHIND_WINDOW,
    Positions.ROOM_3_WINDOW,
  ],
  C4: [
    Positions.ROOM_3_DOOR,
    AdditionalPositions.ROOM_3_BEHIND_DOOR,
    AdditionalPositions.ROOM_3_BEHIND_WINDOW,
    Positions.ROOM_3_WINDOW,
  ],
  D1: [
    Positions.ROOM_4_DOOR,
    AdditionalPositions.ROOM_4_BEHIND_DOOR,
    AdditionalPositions.ROOM_4_BEHIND_WINDOW,
    Positions.ROOM_4_WINDOW,
  ],
  D2: [
    Positions.ROOM_4_DOOR,
    AdditionalPositions.ROOM_4_BEHIND_DOOR,
    AdditionalPositions.ROOM_4_BEHIND_WINDOW,
    Positions.ROOM_4_WINDOW,
  ],
  D3: [
    Positions.ROOM_4_DOOR,
    AdditionalPositions.ROOM_4_BEHIND_DOOR,
    AdditionalPositions.ROOM_4_BEHIND_WINDOW,
    Positions.ROOM_4_WINDOW,
  ],
  D4: [
    Positions.ROOM_4_DOOR,
    AdditionalPositions.ROOM_4_BEHIND_DOOR,
    AdditionalPositions.ROOM_4_BEHIND_WINDOW,
    Positions.ROOM_4_WINDOW,
  ],
});

const TargetPositionsByIdAndType = Object.freeze({
  A1: { door: Positions.ROOM_1_DOOR, window: Positions.ROOM_1_WINDOW },
  A2: { door: Positions.ROOM_1_DOOR, window: Positions.ROOM_1_WINDOW },
  B1: { door: Positions.ROOM_2_DOOR, window: Positions.ROOM_2_WINDOW },
  B2: { door: Positions.ROOM_2_DOOR, window: Positions.ROOM_2_WINDOW },
  C1: { door: Positions.ROOM_3_DOOR, window: Positions.ROOM_3_WINDOW },
  C2: { door: Positions.ROOM_3_DOOR, window: Positions.ROOM_3_WINDOW },
  D1: { door: Positions.ROOM_4_DOOR, window: Positions.ROOM_4_WINDOW },
  D2: { door: Positions.ROOM_4_DOOR, window: Positions.ROOM_4_WINDOW },
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

const MainPath2 = [
  { pos: Positions.HALLWAY_LEFT_END },
  { pos: Positions.HALLWAY_LEFT_SIDE },
  {
    subPath: [
      Positions.ROOM_1_DOOR,
      AdditionalPositions.ROOM_1_BEHIND_DOOR,
      AdditionalPositions.ROOM_1_BEHIND_WINDOW,
      Positions.ROOM_1_WINDOW,
    ],
  },
  { pos: Positions.HALLWAY_ROOMS_1_2 },
  {
    subPath: [
      Positions.ROOM_2_DOOR,
      AdditionalPositions.ROOM_2_BEHIND_DOOR,
      AdditionalPositions.ROOM_2_BEHIND_WINDOW,
      Positions.ROOM_2_WINDOW,
    ],
  },
  { pos: Positions.HALLWAY_ROOMS_2_3 },
  {
    subPath: [
      Positions.ROOM_3_DOOR,
      AdditionalPositions.ROOM_3_BEHIND_DOOR,
      AdditionalPositions.ROOM_3_BEHIND_WINDOW,
      Positions.ROOM_3_WINDOW,
    ],
  },
  { pos: Positions.HALLWAY_ROOMS_3_4 },
  {
    subPath: [
      Positions.ROOM_4_DOOR,
      AdditionalPositions.ROOM_4_BEHIND_DOOR,
      AdditionalPositions.ROOM_4_BEHIND_WINDOW,
      Positions.ROOM_4_WINDOW,
    ],
  },
  { pos: Positions.HALLWAY_RIGHT_SIDE },
  { pos: Positions.HALLWAY_RIGHT_END },
];

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

const EnergyConsumptionById = Object.freeze({
  A1: 1,
  A2: 1,
  A3: 1,
  A4: 1,
  B1: 10,
  B2: 10,
  B3: 10,
  B4: 10,
  C1: 100,
  C2: 100,
  C3: 100,
  C4: 100,
  D1: 1000,
  D2: 1000,
  D3: 1000,
  D4: 1000,
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

const AnyPathBetweenTwoPositions = {
  initialized: false,
};

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
  AnyPathBetweenTwoPositions.initialized = true;
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
    // console.log({ positionFrom, positionTo, indexSub, indexFrom });
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
  TargetPositionsByIdAndType,
  TargetIdsByPosition,
  MapSinglePositionsToRoomPositions,
  EnergyConsumptionById,
  MapIdToTargetRoom,
  MovementDirections,
  AnyPathBetweenTwoPositions,
};
