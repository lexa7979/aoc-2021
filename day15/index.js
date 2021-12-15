const Helpers = require("./helpers");

Helpers.setParseOptions({
  transformMatch: null,
  asInteger: false,
});

const LENGTH_OF_SUBPATHS_UNDER_PROCESS = 10;
const NUMBER_OF_FINAL_POSITIONS_TO_KEEP_UNDER_PROCESS = 50;

const UNKNOWN_RISKLEVEL = null;
const UNVISITED = false;
const VISITED = true;
const POSSIBLE_NEIGHBOR_OFFSETS = [
  [0, -1],
  [-1, 0],
  [0, 1],
  [1, 0],
];

const UNDONE = false;
const DONE = true;
const ZERO_RISKLEVEL = 0;

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
  return getLowestRiskLevelWithDijkstra2(setup);
}

function getSolutionPart2() {
  const lines = Helpers.parseInputData();
  const setup = parseLinesIntoSetup(lines);
  const setup2 = adaptSetupForPart2(setup);
  return getLowestRiskLevelWithDijkstra2(setup2);
}

function parseLinesIntoSetup(lines) {
  const setup = [];
  lines.forEach(text => {
    if (/^\d+$/.test(text)) {
      setup.push(text.split("").map(character => parseInt(character, 10)));
    }
  });
  return setup;
}

function adaptSetupForPart2(setup) {
  const sizeX = setup[0].length;
  const sizeY = setup.length;

  const newSetup = [];

  for (let y = 0; y < 5 * sizeY; y++) {
    const line = [];
    for (let x = 0; x < 5 * sizeX; x++) {
      const initialValue = setup[y % sizeY][x % sizeX];
      const blockOffsetX = Math.floor(x / sizeX);
      const blockOffsetY = Math.floor(y / sizeY);
      const newValue = initialValue + blockOffsetX + blockOffsetY;
      line.push(newValue < 10 ? newValue : newValue % 9);
    }
    newSetup.push(line);
  }

  return newSetup;
}

function getLowestRiskLevel3(setup) {
  const sizeX = setup[0].length;
  const sizeY = setup.length;

  const _getDiagonal = startY => {
    const result = [];
    for (let x = 0; x < sizeX; x++) {
      const y = startY - x;
      if (y >= 0 && y < sizeY) {
        result.push({ x, y });
      }
    }
    return result;
  };

  const allDiagonals = [];
  for (let startY = 0; startY < sizeX + sizeY - 1; startY++) {
    allDiagonals.push(_getDiagonal(startY));
  }

  allDiagonals.forEach((diagonal, index1) => {
    if (index1 === 0) {
      allDiagonals[index1][0].riskLevel = 0;
      return;
    }
    const precedingDiagonal = allDiagonals[index1 - 1];
    diagonal.forEach((node, index2) => {
      const { x, y } = node;
      const cost = setup[y][x];
      let riskLevel = null;
      precedingDiagonal.forEach(precedingNode => {
        if (
          (precedingNode.x === x - 1 && precedingNode.y === y) ||
          (precedingNode.x === x && precedingNode.y === y - 1)
        ) {
          if (riskLevel === null || precedingNode.riskLevel + cost < riskLevel) {
            riskLevel = precedingNode.riskLevel + cost;
          }
        }
      });
      allDiagonals[index1][index2].riskLevel = riskLevel;
      // const predecessorCoordinate1 = { x: x - 1, y };
      // const predecessorCoordinate2 = { x, y: y - 1 };

      // const predecessor1 = allDiagonals[index1 - 1][index2];
      // const predecessor2 = allDiagonals[index1 - 1][index2 + 1];
      // if (predecessor1 && predecessor2) {
      //   allDiagonals[index1][index2].riskLevel = Math.min(predecessor1.riskLevel + cost, predecessor2.riskLevel + cost);
      // } else if (predecessor1) {
      //   allDiagonals[index1][index2].riskLevel = predecessor1.riskLevel + cost;
      // } else {
      //   allDiagonals[index1][index2].riskLevel = predecessor2.riskLevel + cost;
      // }
    });
  });

  return allDiagonals[allDiagonals.length - 1][0].riskLevel;

  console.log(allDiagonals);

  // console.log(_getDiagonal(0));
  // console.log(_getDiagonal(10));
  // console.log(_getDiagonal(sizeY));
  // console.log(_getDiagonal(sizeY + 10));
  // console.log(_getDiagonal(sizeY + sizeX - 3));
  // console.log(_getDiagonal(sizeY + sizeX - 2));
  // console.log(_getDiagonal(sizeY + sizeX - 1));
  // console.log(_getDiagonal(sizeY + sizeX));
}

function getLowestRiskLevelWithDijkstra2(setup) {
  const sizeX = setup[0].length;
  const sizeY = setup.length;

  const allNodes = setup.map((row, y) =>
    row.map((cost, x) => ({ x, y, cost, done: false, riskLevel: Number.MAX_VALUE }))
  );
  allNodes[0][0].riskLevel = 0;

  // console.log(allNodes);

  const _getCurrNode = () => {
    let result = null;
    let minRiskLevel = Number.MAX_VALUE;
    for (let y = 0; y < sizeY; y++) {
      for (let x = 0; x < sizeX; x++) {
        const item = allNodes[y][x];
        if (!item.done && item.riskLevel < minRiskLevel) {
          minRiskLevel = item.riskLevel;
          result = item;
        }
      }
    }
    if (result) {
      allNodes[result.y][result.x].done = true;
    }
    return result;
  };

  const _getNeighborCoordinates = (x, y) =>
    [
      y + 1 < sizeY ? [x, y + 1] : null,
      x + 1 < sizeX ? [x + 1, y] : null,
      y > 0 ? [x, y - 1] : null,
      x > 0 ? [x - 1, y] : null,
    ].filter(item => item != null);

  const _getNeighbors = item => {
    const coordinates = _getNeighborCoordinates(item.x, item.y);
    const allNeighbors = coordinates.map(([x, y]) => allNodes[y][x]);
    return allNeighbors.filter(item2 => !item2.done);
  };

  const _showNodes = () => {
    let output = "\n";
    for (y = 0; y < sizeY; y++) {
      for (x = 0; x < sizeX; x++) {
        const item = allNodes[y][x];
        if (item.riskLevel < Number.MAX_VALUE) {
          output += item.done
            ? `(${String(item.riskLevel).padStart(3, " ")}) `
            : ` ${String(item.riskLevel).padStart(3, " ")}  `;
        } else {
          output += " ...  ";
        }
      }
      output += "\n";
    }
    return output;
  };

  for (let i = 0; i < sizeX * sizeY; i++) {
    const node = _getCurrNode();
    _getNeighbors(node).forEach(neighbor => {
      const newPathLength = node.riskLevel + neighbor.cost;
      const oldPathLength = neighbor.riskLevel;
      if (newPathLength < oldPathLength) {
        neighbor.riskLevel = newPathLength;
      }
    });
    if (i % 1000 === 79) {
      console.log(i);
    }
  }

  // let node = _getCurrNode();
  // // console.log(_showNodes(), node);
  // while (node) {
  //   _getNeighbors(node).forEach(neighbor => {
  //     const newPathLength = node.riskLevel + neighbor.cost;
  //     const oldPathLength = neighbor.riskLevel;
  //     if (newPathLength < oldPathLength) {
  //       neighbor.riskLevel = newPathLength;
  //     }
  //   });
  //   // console.log(_showNodes(), node);
  //   node = _getCurrNode();
  // }

  return allNodes[sizeY - 1][sizeX - 1].riskLevel;

  // const alreadyTouchedNodes = new Map();
  // alreadyTouchedNodes.set([0, 0], { done: false, riskLevel: 0 });

  // // const alreadyTouchedNodes = [{ x: 0, y: 0, done: false, riskLevel: 0 }];

  // const _getCurrNodeCoordinates = () => {
  //   let result = null;
  //   let minRiskLevel = null;
  //   alreadyTouchedNodes.forEach((item, key) => {
  //     if (!item.done) {
  //       if (minRiskLevel == null || item.riskLevel < minRiskLevel) {
  //         minRiskLevel = item.riskLevel;
  //         result = item;
  //       }
  //     }
  //   });
  //   return result;
  // };

  // const _processNeighbor = ({ x, y, prevRiskLevel }) => {
  //   const cost = setup[y][x];
  //   const existingNode = alreadyTouchedNodes.get([item.x, item.y]);
  //   // const existingNode = alreadyTouchedNodes.find(item => item.x === x && item.y === y);
  //   if (existingNode) {
  //     existingNode.riskLevel = Math.min(existingNode.riskLevel, prevRiskLevel + cost);
  //   } else {
  //     alreadyTouchedNodes.push({ x, y, done: false, riskLevel: prevRiskLevel + cost });
  //   }
  // };

  // const _showNodes = () => {
  //   let output = "\n";
  //   for (y = 0; y < sizeY; y++) {
  //     for (x = 0; x < sizeX; x++) {
  //       const node = alreadyTouchedNodes.find(item => item.x === x && item.y === y);
  //       if (node) {
  //         output += node.done
  //           ? `(${String(node.riskLevel).padStart(3, " ")}) `
  //           : ` ${String(node.riskLevel).padStart(3, " ")}  `;
  //       } else {
  //         output += " ...  ";
  //       }
  //     }
  //     output += "\n";
  //   }
  //   console.log(output);
  // };

  // for (let i = 0; i < sizeX * sizeY; i++) {
  //   const node = _getCurrNode();
  //   if (!node) {
  //     throw new Error(`_getCurrNode() failed in step ${i + 1}`);
  //   }
  //   if (node.x === finalX && node.y === finalY) {
  //     return node.riskLevel;
  //   }
  //   _getNeighborCoordinates(node.x, node.y).forEach(([x, y]) => {
  //     _processNeighbor({ x, y, prevRiskLevel: node.riskLevel });
  //   });
  //   node.done = true;

  //   // console.log(node, _getNeighborCoordinates(node.x, node.y));
  //   // _showNodes();
  // }

  // throw new Error("Failed to reach final node.");
}

function getLowestRiskLevelWithDijkstra(setup) {
  const sizeX = setup[0].length;
  const sizeY = setup.length;

  // console.log({ sizeX, sizeY });

  // const totalNumber = sizeX * sizeY;
  // let counter = 0;

  const finalKey = `${sizeX - 1},${sizeY - 1}`;

  const _getNeighborCoordinates = ([x, y]) =>
    [
      y + 1 < sizeY ? [x, y + 1] : null,
      x + 1 < sizeX ? [x + 1, y] : null,
      y > 1 ? [x, y - 1] : null,
      x > 1 ? [x - 1, y] : null,
    ].filter(Boolean);

  const alreadyTouchedNodes = { "0,0": [UNDONE, ZERO_RISKLEVEL] };

  const _getNextNodeKey = () => {
    let result = null;
    let minRiskLevel = null;
    Object.keys(alreadyTouchedNodes).forEach(key => {
      const item = alreadyTouchedNodes[key];
      if (item[0] === UNDONE) {
        if (minRiskLevel == null || item[1] < minRiskLevel) {
          result = key;
          minRiskLevel = item[1];
        }
      }
    });
    return result;
  };

  while (!alreadyTouchedNodes[finalKey] || alreadyTouchedNodes[finalKey][0] === UNDONE) {
    const currNodeKey = _getNextNodeKey();
    const currNodeCoordinates = currNodeKey.split(",").map(c => parseInt(c, 10));
    const currRiskLevel = alreadyTouchedNodes[currNodeKey][1];

    _getNeighborCoordinates(currNodeCoordinates).forEach(neighborCoordinates => {
      const neighborKey = String(neighborCoordinates[0]) + "," + String(neighborCoordinates[1]);
      const neighborCost = setup[neighborCoordinates[1]][neighborCoordinates[0]];
      const newRiskLevel = currRiskLevel + neighborCost;
      if (alreadyTouchedNodes[neighborKey]) {
        // if (alreadyTouchedNodes[neighborKey][0] === UNDONE) {
        alreadyTouchedNodes[neighborKey][1] = Math.min(alreadyTouchedNodes[neighborKey][1], newRiskLevel);
        // }
      } else {
        alreadyTouchedNodes[neighborKey] = [UNDONE, newRiskLevel];
      }
    });

    console.log({ currNodeKey, currNodeCoordinates, currRiskLevel }, alreadyTouchedNodes);

    alreadyTouchedNodes[currNodeKey][0] = DONE;
    // counter++;

    // console.log(totalNumber - counter);
  }

  return alreadyTouchedNodes[finalKey][1];

  //
  //
  //

  // const allNodeStates = setup.map(row => row.map(cost => [UNVISITED, UNKNOWN_RISKLEVEL]));

  // const _processNode = ([x, y]) => {
  //   const [currState, currRiskLevel] = allNodeStates[y][x];

  //   POSSIBLE_NEIGHBOR_OFFSETS.forEach(([diffX, diffY]) => {
  //     const neighborX = x + diffX;
  //     const neighborY = y + diffY;
  //     const neighbor = allNodeStates[neighborY]?.[neighborX];
  //     if (neighbor) {
  //       const [neighborState, neighborRiskLevel] = neighbor;
  //       if (neighborState === UNVISITED) {
  //         const neighborCost = setup[neighborY][neighborX];
  //         const newRiskLevel =
  //           neighborRiskLevel === UNKNOWN_RISKLEVEL
  //             ? currRiskLevel + neighborCost
  //             : Math.min(currRiskLevel + neighborCost, oldRiskLevel);
  //         allNodeStates[neighborY][neighborX] = [UNVISITED, newRiskLevel];
  //       }
  //     }
  //   });

  //   allNodeStates[y][x][0] = VISITED;
  // };

  // const _getNextNode = () => {
  //   let result = null;
  //   let minRiskLevelOfUnvisitedNode = null;
  //   for (let x = 0; x < sizeX; x++) {
  //     for (let y = 0; y < sizeY; y++) {
  //       const [state, riskLevel] = allNodeStates[y][x];
  //       if (state === UNVISITED && (minRiskLevelOfUnvisitedNode == null || riskLevel < minRiskLevelOfUnvisitedNode)) {
  //         minRiskLevelOfUnvisitedNode = riskLevel;
  //         result = [x, y];
  //       }
  //     }
  //   }
  //   return result;
  // };

  // let currNode = [0, 0];
  // while (allNodeStates[sizeY - 1][sizeX - 1][0] === UNVISITED) {
  //   _processNode(currNode);
  //   currNode = _getNextNode();
  // }

  // console.log(allNodeStates);

  // return allNodeStates[sizeY - 1][sizeX - 1][1];
}

function getLowestRiskLevel(setup) {
  const lastX = setup[0].length - 1;
  const lastY = setup.length - 1;

  let lowestRiskLevel = null;

  let bestResults = [{ finalX: 0, finalY: 0, riskLevel: 0 }];

  while (lowestRiskLevel == null) {
    const results = [];
    bestResults.forEach(({ finalX, finalY, riskLevel }) => {
      const state = {
        entryX: finalX,
        entryY: finalY,
        entryRiskLevel: riskLevel,
        steps: LENGTH_OF_SUBPATHS_UNDER_PROCESS,
      };
      results.push(...getFinalPositionsWithLowestRiskLevelsAfterGivenSteps(setup, state));
    });
    results.sort((itemA, itemB) => itemA.riskLevel - itemB.riskLevel);
    results.splice(NUMBER_OF_FINAL_POSITIONS_TO_KEEP_UNDER_PROCESS);

    if (results[0].finalX === lastX && results[0].finalY === lastY) {
      lowestRiskLevel = results[0].riskLevel;
    } else {
      bestResults = results.filter(
        (item, index) =>
          results.findIndex(item2 => item2.finalX === item.finalX && item2.finalY === item.finalY) === index
      );
    }

    // console.log(bestResults);
  }

  return lowestRiskLevel;
}

function getFinalPositionsWithLowestRiskLevelsAfterGivenSteps(setup, state) {
  const { entryX, entryY, entryRiskLevel, steps } = state;

  const lastX = setup[0].length - 1;
  const lastY = setup.length - 1;

  const results = [];

  const _traverse = (currRiskLevel, nextX, nextY, currStep) => {
    if (!setup[nextY]?.[nextX]) {
      return;
    }
    const nextRiskLevel = currStep === 0 ? currRiskLevel : currRiskLevel + setup[nextY][nextX];
    if ((nextX === lastX && nextY === lastY) || currStep === steps) {
      const index = results.findIndex(item => item.finalX === nextX && item.finalY === nextY);
      if (index >= 0) {
        results[index].riskLevel = Math.min(results[index].riskLevel, nextRiskLevel);
      } else {
        results.push({ finalX: nextX, finalY: nextY, riskLevel: nextRiskLevel });
      }
      results.sort((itemA, itemB) => itemA.riskLevel - itemB.riskLevel);
      results.splice(NUMBER_OF_FINAL_POSITIONS_TO_KEEP_UNDER_PROCESS);
      return;
    }
    _traverse(nextRiskLevel, nextX + 1, nextY, currStep + 1);
    _traverse(nextRiskLevel, nextX, nextY + 1, currStep + 1);
  };

  _traverse(entryRiskLevel, entryX, entryY, 0);

  return results;
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2,

  parseLinesIntoSetup,
  adaptSetupForPart2,
  getLowestRiskLevel3,
  getLowestRiskLevelWithDijkstra,
  getLowestRiskLevelWithDijkstra2,
  getLowestRiskLevel,
  getFinalPositionsWithLowestRiskLevelsAfterGivenSteps,
};
