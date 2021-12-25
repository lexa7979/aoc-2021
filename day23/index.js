// @ts-check

const Helpers = require("./helpers");

const {
  Ids,
  Positions,
  HallPositions,
  TargetPositionsById,
  EnergyConsumptionById,
  AnyPathBetweenTwoPositions,
  Ids2,
  AdditionalPositions,
  TargetPositionsByIdExtended,
  AnyPathBetweenTwoPositionsExtended,
  MainPathExtended,
  MainPath,
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
  return getMinimalNeededEnergyToOrganizeAmphipods(setup, false);
}

function getSolutionPart2() {
  const lines = Helpers.parseInputData();
  const setup = parseLinesIntoSetup(lines, true);
  return getMinimalNeededEnergyToOrganizeAmphipods(setup, true);
}

function parseLinesIntoSetup(lines, isExtendedMode = false) {
  const setup = {
    initialPositions: {},
  };

  if (isExtendedMode) {
    setup.initialPositions.A3 = AdditionalPositions.ROOM_4_BEHIND_DOOR;
    setup.initialPositions.A4 = AdditionalPositions.ROOM_3_BEHIND_WINDOW;
    setup.initialPositions.B3 = AdditionalPositions.ROOM_3_BEHIND_DOOR;
    setup.initialPositions.B4 = AdditionalPositions.ROOM_2_BEHIND_WINDOW;
    setup.initialPositions.C3 = AdditionalPositions.ROOM_2_BEHIND_DOOR;
    setup.initialPositions.C4 = AdditionalPositions.ROOM_4_BEHIND_WINDOW;
    setup.initialPositions.D3 = AdditionalPositions.ROOM_1_BEHIND_DOOR;
    setup.initialPositions.D4 = AdditionalPositions.ROOM_1_BEHIND_WINDOW;
  }

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

function parseLinesIntoSetupFromExtendedInput(lines) {
  const setup = {
    initialPositions: {},
  };

  const currNumberByType = { A: 1, B: 1, C: 1, D: 1 };
  let currLineNumber = 1;

  const _getCurrPosInsideCol = col => {
    switch (currLineNumber) {
      case 1:
        return Positions[`ROOM_${col}_DOOR`];
      case 2:
        return AdditionalPositions[`ROOM_${col}_BEHIND_DOOR`];
      case 3:
        return AdditionalPositions[`ROOM_${col}_BEHIND_WINDOW`];
      case 4:
        return Positions[`ROOM_${col}_WINDOW`];
      default:
        throw new Error("Input has too many lines");
    }
  };

  const _storeNewPos = (type, pos) => {
    setup.initialPositions[type + currNumberByType[type]] = pos;
    currNumberByType[type]++;
  };

  lines.forEach(text => {
    const match1 = /#([A-D.])([A-D.])\.([A-D.])\.([A-D.])\.([A-D.])\.([A-D.])([A-D.])#/.exec(text);
    if (match1) {
      [
        Positions.HALLWAY_LEFT_END,
        Positions.HALLWAY_LEFT_SIDE,
        Positions.HALLWAY_ROOMS_1_2,
        Positions.HALLWAY_ROOMS_2_3,
        Positions.HALLWAY_ROOMS_3_4,
        Positions.HALLWAY_RIGHT_SIDE,
        Positions.HALLWAY_RIGHT_END,
      ].forEach((pos, col) => {
        if (match1[col + 1] !== ".") {
          _storeNewPos(match1[col + 1], pos);
        }
      });
    }
    const match2 = /#([A-D.])#([A-D.])#([A-D.])#([A-D.])#/.exec(text);
    if (match2) {
      [1, 2, 3, 4].forEach(col => {
        if (match2[col] !== ".") {
          _storeNewPos(match2[col], _getCurrPosInsideCol(col));
        }
      });
      currLineNumber++;
      return;
    }
  });

  return setup;
}

function isFinal(currentPositions, isExtendedMode = false) {
  return isExtendedMode
    ? Ids2.every(id => TargetPositionsByIdExtended[id].includes(currentPositions[id]))
    : Ids.every(id => TargetPositionsById[id].includes(currentPositions[id]));
}

function listPossibleNextMoves({ currentPositions, isExtendedMode = false }) {
  const _ids = isExtendedMode ? Ids2 : Ids;
  const _mainPath = isExtendedMode ? MainPathExtended : MainPath;
  const _anyPath = isExtendedMode ? AnyPathBetweenTwoPositionsExtended : AnyPathBetweenTwoPositions;
  const _targetPositions = isExtendedMode ? TargetPositionsByIdExtended : TargetPositionsById;

  const _checkIfMoveIsPossible = move => {
    const path = _anyPath[move.positionFrom][move.positionTo];
    return _ids.every(id => id === move.id || !path.includes(currentPositions[id]));
  };

  const _checkIfPositionIsEmptyOrHasTargetId = pos => {
    const id = _ids.find(item => currentPositions[item] === pos);
    return id == null || _targetPositions[id].includes(pos);
  };

  const results = [];

  for (let i = 0; i < _ids.length; i++) {
    const id = _ids[i];
    const positionFrom = currentPositions[id];
    const targets = _targetPositions[id];

    if (targets.includes(positionFrom) && targets.every(_checkIfPositionIsEmptyOrHasTargetId)) {
      const { subPath } = _mainPath.find(item => item.subPath && item.subPath.includes(positionFrom));
      const indexFrom = subPath.findIndex(pos => pos === positionFrom);
      const movesFurtherIntoHome = subPath
        .slice(indexFrom + 1)
        .map(positionTo => ({
          id,
          positionFrom,
          positionTo,
          hasPriority: true,
        }))
        .filter(_checkIfMoveIsPossible);
      if (movesFurtherIntoHome.length > 0) {
        results.push(movesFurtherIntoHome[movesFurtherIntoHome.length - 1]);
      }
      continue;
    }

    if (!targets.includes(positionFrom) && targets.every(_checkIfPositionIsEmptyOrHasTargetId)) {
      const { subPath } = _mainPath.find(item => item.subPath && item.subPath.includes(targets[0]));
      const movesIntoHome = subPath
        .map(positionTo => ({
          id,
          positionFrom,
          positionTo,
          hasPriority: HallPositions.includes(positionFrom),
        }))
        .filter(_checkIfMoveIsPossible);
      if (movesIntoHome.length > 0) {
        results.push(movesIntoHome[movesIntoHome.length - 1]);
      }
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

function getMinimalNeededEnergyToOrganizeAmphipods(setup, isExtendedMode = false, showDebug = false) {
  const _anyPath = isExtendedMode ? AnyPathBetweenTwoPositionsExtended : AnyPathBetweenTwoPositions;

  let minimumEnergy = 10000000;
  let totalTries = 0;

  const _traverse = ({ currentPositions, usedEnergy }) => {
    if (showDebug) {
      if (totalTries++ > 1000000) {
        totalTries = 0;
      }
      if (totalTries < 20) {
        console.log(totalTries, [
          ...createPositionsOutput(currentPositions, isExtendedMode),
          usedEnergy,
          minimumEnergy,
        ]);
      }
    }

    if (usedEnergy >= minimumEnergy) {
      return;
    }
    if (isFinal(currentPositions, isExtendedMode)) {
      minimumEnergy = usedEnergy;
      if (showDebug) {
        console.log({ minimumEnergy });
      }
      return;
    }

    const possibleMoves = listPossibleNextMoves({ currentPositions, isExtendedMode });

    const hasPriorityMoves = possibleMoves.some(item => item.hasPriority);

    for (let i = 0; i < possibleMoves.length; i++) {
      if (!hasPriorityMoves || possibleMoves[i].hasPriority) {
        const { id, positionFrom, positionTo } = possibleMoves[i];
        const distance = _anyPath[positionFrom][positionTo].length - 1;
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

function createPositionsOutput(currentPositions, isExtendedMode = false) {
  if (!isExtendedMode) {
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

  const idsByPos = {};
  Ids2.forEach(id => {
    idsByPos[currentPositions[id]] = id[1] === "1" || isExtendedMode ? id[0] : id[0].toLowerCase();
  });

  return [
    "#############",
    `#${idsByPos[Positions.HALLWAY_LEFT_END] || "."}${idsByPos[Positions.HALLWAY_LEFT_SIDE] || "."}.` +
      `${idsByPos[Positions.HALLWAY_ROOMS_1_2] || "."}.${idsByPos[Positions.HALLWAY_ROOMS_2_3] || "."}.` +
      `${idsByPos[Positions.HALLWAY_ROOMS_3_4] || "."}.${idsByPos[Positions.HALLWAY_RIGHT_SIDE] || "."}` +
      `${idsByPos[Positions.HALLWAY_RIGHT_END] || "."}#`,
    `###${idsByPos[Positions.ROOM_1_DOOR] || "."}#${idsByPos[Positions.ROOM_2_DOOR] || "."}` +
      `#${idsByPos[Positions.ROOM_3_DOOR] || "."}#${idsByPos[Positions.ROOM_4_DOOR] || "."}###`,
    `  #${idsByPos[AdditionalPositions.ROOM_1_BEHIND_DOOR] || "."}#${
      idsByPos[AdditionalPositions.ROOM_2_BEHIND_DOOR] || "."
    }` +
      `#${idsByPos[AdditionalPositions.ROOM_3_BEHIND_DOOR] || "."}#${
        idsByPos[AdditionalPositions.ROOM_4_BEHIND_DOOR] || "."
      }#`,
    `  #${idsByPos[AdditionalPositions.ROOM_1_BEHIND_WINDOW] || "."}#${
      idsByPos[AdditionalPositions.ROOM_2_BEHIND_WINDOW] || "."
    }` +
      `#${idsByPos[AdditionalPositions.ROOM_3_BEHIND_WINDOW] || "."}#${
        idsByPos[AdditionalPositions.ROOM_4_BEHIND_WINDOW] || "."
      }#`,
    `  #${idsByPos[Positions.ROOM_1_WINDOW] || "."}#${idsByPos[Positions.ROOM_2_WINDOW] || "."}` +
      `#${idsByPos[Positions.ROOM_3_WINDOW] || "."}#${idsByPos[Positions.ROOM_4_WINDOW] || "."}#`,
    "  #########",
  ];
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2,

  parseLinesIntoSetup,
  parseLinesIntoSetupFromExtendedInput,

  isFinal,
  listPossibleNextMoves,
  getMinimalNeededEnergyToOrganizeAmphipods,

  createPositionsOutput,
};
