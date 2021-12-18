const Helpers = require("./helpers");

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
  turnIntoFinalSumInPlace(setup);
  return calculateMagnitudeOfTree(setup, listTopLevelIds(setup)[0]);
}

function getSolutionPart2() {
  const lines = Helpers.parseInputData();
  const setup = parseLinesIntoSetup(lines);
  return checkAllHittingLauncherVelocities(setup).count;
}

function parseLinesIntoSetup(lines) {
  const setup = {
    pairsById: {},
    nextId: 100,
  };

  lines.forEach((text, lineIndex) => {
    const _turnIntoNumberOrId = subString => {
      if (/^\d+$/.test(subString)) {
        return parseInt(subString, 10);
      }
      if (/^\[.+\]$/.test(subString)) {
        let kommaPos = null;
        let bracketLevel = 0;
        for (let pos = 1; pos < subString.length - 1; pos++) {
          if (subString[pos] === "[") {
            bracketLevel++;
          } else if (subString[pos] === "]") {
            if (bracketLevel <= 0) {
              throw new Error(`Unexpected closing bracket at pos ${pos} in "${subString}"`);
            }
            bracketLevel--;
          } else if (subString[pos] === ",") {
            if (bracketLevel === 0) {
              if (kommaPos != null) {
                throw new Error(`Unexpected comma at pos ${pos} in "${subString}"`);
              }
              kommaPos = pos;
            }
          }
        }
        if (kommaPos == null) {
          throw new Error(`Missing comma in "${subString}"`);
        }
        const id = setup.nextId++;
        const left = _turnIntoNumberOrId(subString.slice(1, kommaPos));
        const right = _turnIntoNumberOrId(subString.slice(kommaPos + 1, subString.length - 1));
        setup.pairsById[`id${id}`] = [left, right];
        return `id${id}`;
      }
      throw new Error(`Invalid sub-string "${subString}"`);
    };
    _turnIntoNumberOrId(text);
  });

  return setup;
}

function getParentId(setup, pairId) {
  const allIds = Object.keys(setup.pairsById);
  if (!allIds.includes(pairId)) {
    throw new Error(`Unknown ID "${pairId}"`);
  }
  let result = null;
  allIds.forEach(id => {
    if (setup.pairsById[id].includes(pairId)) {
      if (result != null) {
        throw new Error(`Found several parents of item with ID "${pairId}"`);
      }
      result = id;
    }
  });
  return result;
}

function getPathToPair(setup, pairId) {
  const result = [pairId];
  let parentId = getParentId(setup, pairId);
  while (parentId != null) {
    result.unshift(parentId);
    parentId = getParentId(setup, parentId);
  }
  return result;
}

function getTopMostParentId(setup, pairId) {
  return getPathToPair(setup, pairId)[0];
}

function listTopLevelIds(setup) {
  return Object.keys(setup.pairsById).filter(id => getParentId(setup, id) == null);
}

function getDepthOfPair(setup, pairId) {
  const parentId = getParentId(setup, pairId);
  return parentId == null ? 0 : getDepthOfPair(setup, parentId) + 1;
}

function hasChildren(setup, pairId) {
  const pair = setup.pairsById[pairId];
  if (pair == null) {
    throw new Error(`Invalid pair-ID "${pairId}"`);
  }
  return typeof pair[0] === "string" || typeof pair[1] === "string";
}

function listTreeIdsLeftToRight(setup, pairId) {
  const result = [];
  const pair = setup.pairsById[pairId];
  if (pair == null) {
    throw new Error(`Missing pair with ID "${pairId}"`);
  }
  if (typeof pair[0] === "string") {
    result.push(...listTreeIdsLeftToRight(setup, pair[0]));
  }
  result.push(pairId);
  if (typeof pair[1] === "string") {
    result.push(...listTreeIdsLeftToRight(setup, pair[1]));
  }
  return result;
}

function showSubTreeAsString(setup, pairId) {
  const pair = setup.pairsById[pairId];
  if (pair == null) {
    throw new Error(`Missing pair with ID "${pairId}"`);
  }
  let result = "[";
  result += typeof pair[0] === "number" ? String(pair[0]) : showSubTreeAsString(setup, pair[0]);
  result += ",";
  result += typeof pair[1] === "number" ? String(pair[1]) : showSubTreeAsString(setup, pair[1]);
  result += "]";
  return result;
}

const Global = { log: [], lastDiff: "" };
const log = (...messageParts) => Global.log.push(messageParts.map(item => String(item)).join(" "));
const clearLog = () => Global.log.splice(0);
const getLog = () => "\n" + Global.log.join("\n") + "\n";
const logSetup = (setup, topLevelId) =>
  Global.log.push(
    "\n" +
      listTreeIdsLeftToRight(setup, topLevelId)
        .map(id => `${id}[${setup.pairsById[id][0]},${setup.pairsById[id][1]}]`)
        .join(" X ") +
      "\n"
  );
const saveLog = filename => require("fs").writeFileSync(filename, "```\n" + getLog() + "\n```\n");
const initDiff = text => {
  Global.lastDiff = text;
};
const logDiff = (text, ...suffix) => {
  const string1 = Global.lastDiff;
  const string2 = text;
  Global.lastDiff = text;
  if (string1 === string2) {
    Global.log.push("(no difference) " + suffix.map(item => String(item)).join(" "));
    return;
  }
  let firstDiffPos = null;
  let lastDiffPos = null;
  for (let pos = 0; pos < string2.length; pos++) {
    if (firstDiffPos == null && string1[pos] !== string2[pos]) {
      firstDiffPos = pos;
    }
    if (lastDiffPos == null && string1[string1.length - pos] !== string2[string2.length - pos]) {
      lastDiffPos = string2.length - pos;
    }
  }
  Global.log.push(
    `${string2.slice(0, firstDiffPos)} >>${string2.slice(firstDiffPos, lastDiffPos + 1)}<< ${string2.slice(
      lastDiffPos + 1
    )} ` + suffix.map(item => String(item)).join(" ")
  );
};

function isTreeReduced(setup, topLevelId) {
  const ids = listTreeIdsLeftToRight(setup, topLevelId);

  const _valueOrNull = input => (typeof input === "number" ? input : 0);
  const maxDepth = Math.max(...ids.map(id => getDepthOfPair(setup, id)));
  const maxValue = Math.max(...ids.map(id => Math.max(...setup.pairsById[id].map(_valueOrNull))));

  return maxDepth < 4 && maxValue < 10;
}

function reduceTree(setup, topLevelId) {
  while (!isTreeReduced(setup, topLevelId)) {
    explodeDeepPairsInPlace(setup, topLevelId);
    splitHighNumbersInPlace(setup, topLevelId, 1);
  }
}

function explodeDeepPairsInPlace(setup, topLevelId, maxOperations = Number.MAX_VALUE) {
  let ids = listTreeIdsLeftToRight(setup, topLevelId);

  const _pair = pairId => setup.pairsById[pairId];

  const _explodeLeft = pairId => {
    const pair = _pair(pairId);
    for (let i = ids.indexOf(pairId) - 1; i >= 0; i--) {
      const item = _pair(ids[i]);
      if (typeof item[1] === "number") {
        setup.pairsById[ids[i]][1] += pair[0];
        return;
      }
      if (typeof item[0] === "number") {
        setup.pairsById[ids[i]][0] += pair[0];
        return;
      }
    }
  };

  const _explodeRight = pairId => {
    const pair = _pair(pairId);
    for (let i = ids.indexOf(pairId) + 1; i < ids.length; i++) {
      const item = _pair(ids[i]);
      if (typeof item[0] === "number") {
        setup.pairsById[ids[i]][0] += pair[1];
        return;
      }
      if (typeof item[1] === "number") {
        setup.pairsById[ids[i]][1] += pair[1];
        return;
      }
    }
  };

  const _replaceWithZero = pairId => {
    const parentId = getParentId(setup, pairId);
    const parent = _pair(parentId);
    if (parent[0] === pairId) {
      setup.pairsById[parentId][0] = 0;
    }
    if (parent[1] === pairId) {
      setup.pairsById[parentId][1] = 0;
    }
    delete setup.pairsById[pairId];
  };

  let operationCount = 0;

  for (let i = 0; i < ids.length && operationCount < maxOperations; i++) {
    if (!hasChildren(setup, ids[i]) && getDepthOfPair(setup, ids[i]) >= 4) {
      // logSetup(setup, topLevelId);
      logDiff(showSubTreeAsString(setup, topLevelId), "start-explode", topLevelId);

      _explodeLeft(ids[i]);
      _explodeRight(ids[i]);
      _replaceWithZero(ids[i]);
      ids = listTreeIdsLeftToRight(setup, topLevelId);
      i = 0;
      operationCount++;

      logDiff(showSubTreeAsString(setup, topLevelId), "stop-explode", topLevelId, operationCount);
    }
  }

  return operationCount;
}

function splitHighNumbersInPlace(setup, topLevelId, maxOperations = Number.MAX_VALUE) {
  let operationCount = 0;

  const ids = listTreeIdsLeftToRight(setup, topLevelId);
  for (let i = 0; i < ids.length && operationCount < maxOperations; i++) {
    const pair = setup.pairsById[ids[i]];
    pair.forEach((item, index) => {
      if (typeof item === "number" && item >= 10) {
        // logSetup(setup, topLevelId);
        logDiff(showSubTreeAsString(setup, topLevelId), "start-split", topLevelId);

        const newId = `id${setup.nextId++}`;
        setup.pairsById[newId] = [Math.floor(item / 2), Math.ceil(item / 2)];
        setup.pairsById[ids[i]][index] = newId;
        operationCount++;

        logDiff(showSubTreeAsString(setup, topLevelId), "stop-split", operationCount);
      }
    });
  }

  return operationCount;
}

function addTwoTopLevelPairsInPlace(setup, pairId1, pairId2) {
  if (getParentId(setup, pairId1) || getParentId(setup, pairId2)) {
    throw new Error(`Expected top-level IDs`);
  }

  // const _reduce = topLevelId => {
  //   log(showSubTreeAsString(setup, topLevelId), "start-reduce", topLevelId);

  //   if (explodeDeepPairsInPlace(setup, topLevelId) + splitHighNumbersInPlace(setup, topLevelId, 1) > 0) {
  //     _reduce(topLevelId);
  //   }

  //   log(showSubTreeAsString(setup, topLevelId), "stop-reduce", topLevelId);
  // };

  // _reduce(pairId1);
  // _reduce(pairId2);

  // logSetup(setup, pairId1);
  // logSetup(setup, pairId2);
  logDiff(showSubTreeAsString(setup, pairId1), "start-add", pairId1, pairId2);

  const newId = `id${setup.nextId++}`;
  const pair1 = setup.pairsById[pairId1];
  setup.pairsById[newId] = [pair1[0], pair1[1]];
  setup.pairsById[pairId1] = [newId, pairId2];

  // logSetup(setup, pairId1);
  logDiff(showSubTreeAsString(setup, pairId1), "stop-add", newId);

  // _reduce(pairId1);

  reduceTree(setup, pairId1);
}

function turnIntoFinalSumInPlace(setup) {
  initDiff(showSubTreeAsString(setup, "id100"));

  let ids = listTopLevelIds(setup);
  while (ids.length > 1) {
    log(showSubTreeAsString(setup, "id100"), "start");

    addTwoTopLevelPairsInPlace(setup, ids[0], ids[1]);
    ids = listTopLevelIds(setup);

    logDiff(showSubTreeAsString(setup, "id100"), "stop");

    saveLog("./log.md");
    clearLog();
  }
}

function calculateMagnitudeOfTree(setup, topLevelId) {
  const _traverse = pairId => {
    const pair = setup.pairsById[pairId];
    return (
      3 * (typeof pair[0] === "number" ? pair[0] : _traverse(pair[0])) +
      2 * (typeof pair[1] === "number" ? pair[1] : _traverse(pair[1]))
    );
  };
  return _traverse(topLevelId);
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2,

  parseLinesIntoSetup,
  getParentId,
  getPathToPair,
  getTopMostParentId,
  listTopLevelIds,
  getDepthOfPair,
  listTreeIdsLeftToRight,
  showSubTreeAsString,
  explodeDeepPairsInPlace,
  splitHighNumbersInPlace,
  addTwoTopLevelPairsInPlace,
  turnIntoFinalSumInPlace,
  calculateMagnitudeOfTree,
};
