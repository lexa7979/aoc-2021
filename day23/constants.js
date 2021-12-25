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

const Ids = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"];
const AdditionalIds = ["A3", "A4", "B3", "B4", "C3", "C4", "D3", "D4"];
const Ids2 = [...Ids, ...AdditionalIds];

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

const TargetPositionsByIdExtended = Object.freeze({
  A1: [...TargetPositionsById.A1, AdditionalPositions.ROOM_1_BEHIND_DOOR, AdditionalPositions.ROOM_1_BEHIND_WINDOW],
  A2: [...TargetPositionsById.A1, AdditionalPositions.ROOM_1_BEHIND_DOOR, AdditionalPositions.ROOM_1_BEHIND_WINDOW],
  A3: [...TargetPositionsById.A1, AdditionalPositions.ROOM_1_BEHIND_DOOR, AdditionalPositions.ROOM_1_BEHIND_WINDOW],
  A4: [...TargetPositionsById.A1, AdditionalPositions.ROOM_1_BEHIND_DOOR, AdditionalPositions.ROOM_1_BEHIND_WINDOW],
  B1: [...TargetPositionsById.B1, AdditionalPositions.ROOM_2_BEHIND_DOOR, AdditionalPositions.ROOM_2_BEHIND_WINDOW],
  B2: [...TargetPositionsById.B1, AdditionalPositions.ROOM_2_BEHIND_DOOR, AdditionalPositions.ROOM_2_BEHIND_WINDOW],
  B3: [...TargetPositionsById.B1, AdditionalPositions.ROOM_2_BEHIND_DOOR, AdditionalPositions.ROOM_2_BEHIND_WINDOW],
  B4: [...TargetPositionsById.B1, AdditionalPositions.ROOM_2_BEHIND_DOOR, AdditionalPositions.ROOM_2_BEHIND_WINDOW],
  C1: [...TargetPositionsById.C1, AdditionalPositions.ROOM_3_BEHIND_DOOR, AdditionalPositions.ROOM_3_BEHIND_WINDOW],
  C2: [...TargetPositionsById.C1, AdditionalPositions.ROOM_3_BEHIND_DOOR, AdditionalPositions.ROOM_3_BEHIND_WINDOW],
  C3: [...TargetPositionsById.C1, AdditionalPositions.ROOM_3_BEHIND_DOOR, AdditionalPositions.ROOM_3_BEHIND_WINDOW],
  C4: [...TargetPositionsById.C1, AdditionalPositions.ROOM_3_BEHIND_DOOR, AdditionalPositions.ROOM_3_BEHIND_WINDOW],
  D1: [...TargetPositionsById.D1, AdditionalPositions.ROOM_4_BEHIND_DOOR, AdditionalPositions.ROOM_4_BEHIND_WINDOW],
  D2: [...TargetPositionsById.D1, AdditionalPositions.ROOM_4_BEHIND_DOOR, AdditionalPositions.ROOM_4_BEHIND_WINDOW],
  D3: [...TargetPositionsById.D1, AdditionalPositions.ROOM_4_BEHIND_DOOR, AdditionalPositions.ROOM_4_BEHIND_WINDOW],
  D4: [...TargetPositionsById.D1, AdditionalPositions.ROOM_4_BEHIND_DOOR, AdditionalPositions.ROOM_4_BEHIND_WINDOW],
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

const MainPathExtended = [
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

const AnyPathBetweenTwoPositions = _getAnyPathBetweenTwoPositions();

const AnyPathBetweenTwoPositionsExtended = _getAnyPathBetweenTwoPositions(true);

function _getAnyPathBetweenTwoPositions(isExtendedMode = false) {
  const result = {};
  const allPositions = Object.values(Positions);

  if (isExtendedMode) {
    allPositions.push(...Object.values(AdditionalPositions));
  }

  for (let i = 0; i < allPositions.length; i++) {
    const positionFrom = allPositions[i];
    result[positionFrom] = {};
    for (let k = 0; k < allPositions.length; k++) {
      if (i !== k) {
        const positionTo = allPositions[k];
        result[positionFrom][positionTo] = listStepsOnPath({ positionFrom, positionTo, isExtendedMode });
      }
    }
  }

  return result;
}

function listStepsOnPath({ positionFrom, positionTo, isExtendedMode = false }) {
  const _mainPath = isExtendedMode ? MainPathExtended : MainPath;

  if (HallPositions.includes(positionFrom) && HallPositions.includes(positionTo)) {
    const index1 = _mainPath.findIndex(item => item.pos === positionFrom);
    const index2 = _mainPath.findIndex(item => item.pos === positionTo);
    if (index1 < index2) {
      return _mainPath.slice(index1, index2 + 1).map(item => item.pos || null);
    }
    return _mainPath
      .slice(index2, index1 + 1)
      .map(item => item.pos || null)
      .reverse();
  }

  if (HallPositions.includes(positionFrom)) {
    const indexSub = _mainPath.findIndex(item => item.subPath && item.subPath.includes(positionTo));
    const indexFrom = _mainPath.findIndex(item => item.pos === positionFrom);
    const indexSubTo = _mainPath[indexSub].subPath.indexOf(positionTo);

    if (indexFrom < indexSub) {
      return [
        ..._mainPath.slice(indexFrom, indexSub + 1).map(item => item.pos || null),
        ..._mainPath[indexSub].subPath.slice(0, indexSubTo + 1),
      ];
    }
    return [
      ..._mainPath
        .slice(indexSub, indexFrom + 1)
        .map(item => item.pos || null)
        .reverse(),
      ..._mainPath[indexSub].subPath.slice(0, indexSubTo + 1),
    ];
  }

  if (HallPositions.includes(positionTo)) {
    const indexSub = _mainPath.findIndex(item => item.subPath && item.subPath.includes(positionFrom));
    const indexSubFrom = _mainPath[indexSub].subPath.indexOf(positionFrom);
    const indexTo = _mainPath.findIndex(item => item.pos === positionTo);

    if (indexSub < indexTo) {
      return [
        ..._mainPath[indexSub].subPath.slice(0, indexSubFrom + 1).reverse(),
        ..._mainPath.slice(indexSub, indexTo + 1).map(item => item.pos || null),
      ];
    }
    return [
      ..._mainPath[indexSub].subPath.slice(0, indexSubFrom + 1).reverse(),
      ..._mainPath
        .slice(indexTo, indexSub + 1)
        .map(item => item.pos || null)
        .reverse(),
    ];
  }

  const indexSub1 = _mainPath.findIndex(item => item.subPath && item.subPath.includes(positionFrom));
  const indexSub2 = _mainPath.findIndex(item => item.subPath && item.subPath.includes(positionTo));
  if (indexSub1 === indexSub2) {
    return [positionFrom, positionTo];
  }

  const indexSubFrom = _mainPath[indexSub1].subPath.indexOf(positionFrom);
  const indexSubTo = _mainPath[indexSub2].subPath.indexOf(positionTo);
  if (indexSub1 < indexSub2) {
    return [
      ..._mainPath[indexSub1].subPath.slice(0, indexSubFrom + 1).reverse(),
      ..._mainPath.slice(indexSub1, indexSub2 + 1).map(item => item.pos || null),
      ..._mainPath[indexSub2].subPath.slice(0, indexSubTo + 1),
    ];
  } else {
    return [
      ..._mainPath[indexSub1].subPath.slice(0, indexSubFrom + 1).reverse(),
      ..._mainPath
        .slice(indexSub2, indexSub1 + 1)
        .map(item => item.pos || null)
        .reverse(),
      ..._mainPath[indexSub2].subPath.slice(0, indexSubTo + 1),
    ];
  }
}

module.exports = {
  Positions,
  AdditionalPositions,
  HallPositions,

  MainPath,
  MainPathExtended,

  Ids,
  AdditionalIds,
  Ids2,

  TargetPositionsById,
  TargetPositionsByIdExtended,
  EnergyConsumptionById,

  AnyPathBetweenTwoPositions,
  AnyPathBetweenTwoPositionsExtended,
};
