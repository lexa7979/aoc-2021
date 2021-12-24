// @ts-check

const Helpers = require("./helpers");

const {
  Ids,
  Positions,
  HallPositions,
  DoorPositions,
  // WindowPositions,
  TargetPositionsById,
  MapSinglePositionsToRoomPositions,
  MovementDirections,
  MapIdToTargetRoom,
  EnergyConsumptionById,
  AnyPathBetweenTwoPositions,
  TargetPositionsByIdAndType,
} = require("./constants");

Helpers.setParseOptions({
  transformMatch: null,
  asInteger: false,
});

if (process.env.NODE_ENV !== "test") {
  console.log("Javascript");
  const part = process.env.part || "part1";
  if (part === "part1") {
    console.log(getSolutionPart1());
  } else {
    console.log(getSolutionPart2());
  }
}

function getSolutionPart1() {
  const lines = Helpers.parseInputData();
  const setup = parseLinesIntoSetup(lines);
  return getMinimalNeededEnergyToOrganizeAmphipods(setup);
}

function getSolutionPart2() {
  const lines = Helpers.parseInputData();
  const setup = parseLinesIntoSetup(lines);
}

function parseLinesIntoSetup(lines) {
  const setup = {
    initialPositions: {},
  };

  const _storeNewPos = (type, pos) => {
    if (setup.initialPositions[type + "1"]) {
      setup.initialPositions[type + "2"] = pos;
    } else {
      setup.initialPositions[type + "1"] = pos;
    }
  };

  lines.forEach(text => {
    const match1 = /^###(\w)#(\w)#(\w)#(\w)###$/.exec(text);
    if (match1) {
      [1, 2, 3, 4].forEach(i => _storeNewPos(match1[i], Positions[`ROOM_${i}_DOOR`]));
      return;
    }
    const match2 = /^  #(\w)#(\w)#(\w)#(\w)#$/.exec(text);
    if (match2) {
      [1, 2, 3, 4].forEach(i => _storeNewPos(match2[i], Positions[`ROOM_${i}_WINDOW`]));
    }
  });

  return setup;
}

function listIdsByPosition(currentPositions) {
  const result = {};
  Object.keys(Positions).forEach(key => {
    result[key] = Ids.find(id => currentPositions[id] === Positions[key]) || null;
  });
  return result;
}

function isFinal(currentPositions) {
  const conditions = [
    [Positions.ROOM_1_DOOR, Positions.ROOM_1_WINDOW].includes(currentPositions.A1),
    [Positions.ROOM_1_DOOR, Positions.ROOM_1_WINDOW].includes(currentPositions.A2),
    [Positions.ROOM_2_DOOR, Positions.ROOM_2_WINDOW].includes(currentPositions.B1),
    [Positions.ROOM_2_DOOR, Positions.ROOM_2_WINDOW].includes(currentPositions.B2),
    [Positions.ROOM_3_DOOR, Positions.ROOM_3_WINDOW].includes(currentPositions.C1),
    [Positions.ROOM_3_DOOR, Positions.ROOM_3_WINDOW].includes(currentPositions.C2),
    [Positions.ROOM_4_DOOR, Positions.ROOM_4_WINDOW].includes(currentPositions.D1),
    [Positions.ROOM_4_DOOR, Positions.ROOM_4_WINDOW].includes(currentPositions.D2),
  ];
  return conditions.every(Boolean);
}

function getMovementDirection({ positionFrom, positionTo }) {
  const positionKeyFrom = Object.keys(Positions).find(key => Positions[key] === positionFrom);
  const positionKeyTo = Object.keys(Positions).find(key => Positions[key] === positionTo);
  const isRoomFrom = String(positionKeyFrom).startsWith("ROOM");
  const isRoomTo = String(positionKeyTo).startsWith("ROOM");
  if (isRoomFrom) {
    return isRoomTo ? MovementDirections.INSIDE_ROOM : MovementDirections.OUT_OF_ROOM;
  }
  return isRoomTo ? MovementDirections.OUT_OF_HALL : MovementDirections.INSIDE_HALL;
}

function checkIfPositionIsInTargetRoom({ position, id }) {
  const positionKey = Object.keys(Positions).find(key => Positions[key] === position);
  return positionKey.startsWith(MapIdToTargetRoom[id]);
}

function checkIfRoomWithPositionHasOnlyTargetIds({ currentPositions, position }) {
  const roomPositions = MapSinglePositionsToRoomPositions[position];
  if (!roomPositions) {
    return false;
  }

  for (let i = 0; i < roomPositions.length; i++) {
    const idInRoom = Ids.find(id => currentPositions[id] === roomPositions[i]);
    if (idInRoom && !TargetPositionsById[idInRoom].includes(roomPositions[i])) {
      return false;
    }
  }

  return true;
}

function checkIfRoomWithPositionIsEmpty({ currentPositions, position }) {
  const roomPositions = MapSinglePositionsToRoomPositions[position];
  if (!roomPositions) {
    return false;
  }

  return roomPositions.every(pos => Ids.every(id => currentPositions[id] !== pos));
}

function listPossibleNextMoves({ currentPositions }) {
  const _checkIfMoveIsPossible = move => {
    const path = AnyPathBetweenTwoPositions[move.positionFrom][move.positionTo];
    return Ids.every(id => id === move.id || !path.includes(currentPositions[id]));
  };

  const _checkIfPositionIsEmptyOrHasTargetId = pos => {
    const id = Ids.find(item => currentPositions[item] === pos);
    return id == null || TargetPositionsById[id].includes(pos);
  };

  const results = [];

  for (let i = 0; i < Ids.length; i++) {
    const id = Ids[i];
    const positionFrom = currentPositions[id];
    const targets = TargetPositionsById[id];

    if (targets.includes(positionFrom) && targets.every(_checkIfPositionIsEmptyOrHasTargetId)) {
      if (DoorPositions.includes(positionFrom)) {
        const move = {
          id,
          positionFrom,
          positionTo: TargetPositionsByIdAndType[id].window,
          hasPriority: true,
        };
        if (_checkIfMoveIsPossible(move)) {
          results.push(move);
        }
      }
      continue;
    }

    if (targets.every(_checkIfPositionIsEmptyOrHasTargetId)) {
      const move = {
        id,
        positionFrom,
        positionTo: TargetPositionsByIdAndType[id].door,
        hasPriority: true,
      };
      if (_checkIfMoveIsPossible(move)) {
        results.push(move);
      }
      continue;
    }

    if (HallPositions.includes(positionFrom)) {
      continue;
    }

    HallPositions.forEach(positionTo => {
      const move = {
        id,
        positionFrom,
        positionTo,
        hasPriority: false,
      };

      if (_checkIfMoveIsPossible(move)) {
        results.push(move);
      }
    });
  }

  return results;
}

function getMinimalNeededEnergyToOrganizeAmphipods(setup) {
  let minimumEnergy = 10000000;

  // let totalTries = 0;

  const _traverse = ({ currentPositions, usedEnergy }) => {
    // //
    // if (totalTries++ > 1000000) {
    //   totalTries = 0;
    // }
    // if (totalTries < 5) {
    //   console.log([...createPositionsOutput(currentPositions), usedEnergy, minimumEnergy]);
    // }
    // //

    if (usedEnergy >= minimumEnergy) {
      return;
    }
    if (isFinal(currentPositions)) {
      minimumEnergy = usedEnergy;
      // console.log({ minimumEnergy });
      return;
    }

    const possibleMoves = listPossibleNextMoves({ currentPositions });

    const hasPriorityMoves = possibleMoves.some(item => item.hasPriority);

    for (let i = 0; i < possibleMoves.length; i++) {
      if (!hasPriorityMoves || possibleMoves[i].hasPriority) {
        const { id, positionFrom, positionTo } = possibleMoves[i];
        const distance = AnyPathBetweenTwoPositions[positionFrom][positionTo].length - 1;
        _traverse({
          currentPositions: { ...currentPositions, [id]: positionTo },
          usedEnergy: usedEnergy + distance * EnergyConsumptionById[id],
        });
      }
    }
  };

  _traverse({
    currentPositions: setup.initialPositions,
    usedEnergy: 0,
  });

  return minimumEnergy;
}

function createPositionsOutput(currentPositions) {
  const idsByPos = {};
  Ids.forEach(id => {
    idsByPos[currentPositions[id]] = id[1] === "1" ? id[0] : id[0].toLowerCase();
  });

  return [
    "#############",
    `#${idsByPos[Positions.HALLWAY_LEFT_END] || "."}${idsByPos[Positions.HALLWAY_LEFT_SIDE] || "."}.` +
      `${idsByPos[Positions.HALLWAY_ROOMS_1_2] || "."}.${idsByPos[Positions.HALLWAY_ROOMS_2_3] || "."}.` +
      `${idsByPos[Positions.HALLWAY_ROOMS_3_4] || "."}.${idsByPos[Positions.HALLWAY_RIGHT_SIDE] || "."}` +
      `${idsByPos[Positions.HALLWAY_RIGHT_END] || "."}#`,
    `###${idsByPos[Positions.ROOM_1_DOOR] || "."}#${idsByPos[Positions.ROOM_2_DOOR] || "."}` +
      `#${idsByPos[Positions.ROOM_3_DOOR] || "."}#${idsByPos[Positions.ROOM_4_DOOR] || "."}###`,
    `  #${idsByPos[Positions.ROOM_1_WINDOW] || "."}#${idsByPos[Positions.ROOM_2_WINDOW] || "."}` +
      `#${idsByPos[Positions.ROOM_3_WINDOW] || "."}#${idsByPos[Positions.ROOM_4_WINDOW] || "."}#`,
    "  #########",
  ];
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2,

  parseLinesIntoSetup,
  listIdsByPosition,
  isFinal,
  getMovementDirection,
  checkIfPositionIsInTargetRoom,
  checkIfRoomWithPositionHasOnlyTargetIds,
  checkIfRoomWithPositionIsEmpty,
  listPossibleNextMoves,
  getMinimalNeededEnergyToOrganizeAmphipods,

  createPositionsOutput,
};
