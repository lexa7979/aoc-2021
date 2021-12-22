// @ts-check

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
  const allBestMappings = getAllBestMappingsStartingAtInitialScanner(setup);
  const allScannerBeacons = listAllScannerBeacons({ setup, allBestMappings });
  return allScannerBeacons.length;
}

function getSolutionPart2() {
  const lines = Helpers.parseInputData();
  const setup = parseLinesIntoSetup(lines);
  const allBestMappings = getAllBestMappingsStartingAtInitialScanner(setup);
  return getLargestManhattenDistanceBetweenScanners({ setup, allBestMappings }).maxDistance;
}

function parseLinesIntoSetup(lines) {
  const setup = {
    beaconsByScannerId: {},
    initialScannerId: null,
  };

  let currScannerId = null;
  lines.forEach(text => {
    const match1 = /--- scanner (\d+) ---/.exec(text);
    if (match1) {
      currScannerId = `id${match1[1]}`;
      if (setup.initialScannerId == null) {
        setup.initialScannerId = currScannerId;
      }
      setup.beaconsByScannerId[currScannerId] = [];
      return;
    }
    const match2 = /^(-?\d+),(-?\d+),(-?\d+)$/.exec(text);
    if (match2) {
      setup.beaconsByScannerId[currScannerId].push([
        parseInt(match2[1], 10),
        parseInt(match2[2], 10),
        parseInt(match2[3], 10),
      ]);
    }
  });

  return setup;
}

function listPossibleScannerRotations() {
  const results = [
    ["+x", "+y", "+z"],
    ["+x", "-y", "-z"],
    ["+x", "+z", "-y"],
    ["+x", "-z", "+y"],
    ["-x", "+y", "-z"],
    ["-x", "-y", "+z"],
    ["-x", "+z", "+y"],
    ["-x", "-z", "-y"],
    ["+y", "+z", "+x"],
    ["+y", "-z", "-x"],
    ["+y", "+x", "-z"],
    ["+y", "-x", "+z"],
    ["-y", "+z", "-x"],
    ["-y", "-z", "+x"],
    ["-y", "+x", "+z"],
    ["-y", "-x", "-z"],
    ["+z", "+x", "+y"],
    ["+z", "-x", "-y"],
    ["+z", "+y", "-x"],
    ["+z", "-y", "+x"],
    ["-z", "+x", "-y"],
    ["-z", "-x", "+y"],
    ["-z", "+y", "+x"],
    ["-z", "-y", "-x"],
  ];
  return results;
}

function applyRotationToBeacon(beacon, rotation) {
  const MAP_LETTER_TO_ORIG_INDEX = { x: 0, y: 1, z: 2 };
  return [null, null, null].map((_, index) => {
    const origIndex = MAP_LETTER_TO_ORIG_INDEX[rotation[index][1]];
    return rotation[index][0] === "+" ? beacon[origIndex] : -beacon[origIndex];
  });
}

function applyNegativeRotationToBeacon(beacon, rotation) {
  const MAP_LETTER_TO_ORIG_INDEX = { x: 0, y: 1, z: 2 };
  const result = [null, null, null];

  for (let i = 0; i < 3; i++) {
    const origIndex = MAP_LETTER_TO_ORIG_INDEX[rotation[i][1]];
    result[origIndex] = rotation[i][0] === "+" ? beacon[i] : -beacon[i];
  }

  return result;
}

function applyTranslationToBeacon(beacon, translation) {
  return beacon.map((pos, index) => pos + translation[index]);
}

function applyNegativeTranslationToBeacon(beacon, translation) {
  return beacon.map((pos, index) => pos - translation[index]);
}

function getTranslationFromOneBeaconToAnother(beacon1, beacon2) {
  return [beacon2[0] - beacon1[0], beacon2[1] - beacon1[1], beacon2[2] - beacon1[2]];
}

function matchTwoBeaconSetsWithGivenTranslation({ allBeaconsSet1, allBeaconsSet2, translation }) {
  const indexMatches = [];
  for (let index1 = 0; index1 < allBeaconsSet1.length; index1++) {
    const translatedBeacon1 = applyTranslationToBeacon(allBeaconsSet1[index1], translation);
    const _checkIfIsMatch = beacon2 => beacon2.every((value, index) => translatedBeacon1[index] === value);
    const matchingIndex = allBeaconsSet2.findIndex(_checkIfIsMatch);
    if (matchingIndex >= 0) {
      indexMatches.push([index1, matchingIndex]);
    }
  }
  return indexMatches;
}

function getBestMappingBetweenTwoScanners({ setup, scannerId1, scannerId2 }) {
  const size1 = setup.beaconsByScannerId[scannerId1].length;
  const size2 = setup.beaconsByScannerId[scannerId2].length;

  const allBeaconsSet1 = setup.beaconsByScannerId[scannerId1];
  const allBeaconsSet2 = setup.beaconsByScannerId[scannerId2];

  let bestMapping = null;

  listPossibleScannerRotations().forEach(rotationScanner2 => {
    const allRotatedBeacons2 = allBeaconsSet2.map(item => applyRotationToBeacon(item, rotationScanner2));

    for (let index1 = 0; index1 < size1; index1++) {
      if (bestMapping != null && index1 + bestMapping.indexMapping.length >= Math.min(size1, size2)) {
        break;
      }
      const beacon1 = setup.beaconsByScannerId[scannerId1][index1];
      for (let index2 = 0; index2 < size2; index2++) {
        if (bestMapping != null && bestMapping.indexMapping.length >= 12) {
          return bestMapping;
        }

        const translation = getTranslationFromOneBeaconToAnother(beacon1, allRotatedBeacons2[index2]);

        const indexMapping = matchTwoBeaconSetsWithGivenTranslation({
          allBeaconsSet1,
          allBeaconsSet2: allRotatedBeacons2,
          translation,
        });
        if (bestMapping == null || indexMapping.length > bestMapping.indexMapping.length) {
          bestMapping = { indexMapping, rotationScanner2, translation };
        }
      }
    }
  });

  return bestMapping;
}

function getAllBestMappingsStartingAtInitialScanner(setup) {
  const { initialScannerId } = setup;

  const allScannerIds = Object.keys(setup.beaconsByScannerId);
  const allBestMappings = [];
  const alreadyReachedScannerIds = [initialScannerId];

  allScannerIds.forEach(scannerId2 => {
    if (initialScannerId !== scannerId2) {
      // console.log("Looking for direct mappings to initial scanner", scannerId2);
      const bestMapping = getBestMappingBetweenTwoScanners({
        setup,
        scannerId1: initialScannerId,
        scannerId2,
      });
      if (bestMapping != null && bestMapping.indexMapping.length >= 12) {
        const { rotationScanner2, translation } = bestMapping;
        allBestMappings.push({
          path: [initialScannerId, scannerId2],
          rotationScanner2,
          translation,
        });
        alreadyReachedScannerIds.push(scannerId2);
      }
    }
  });

  while (allScannerIds.length > alreadyReachedScannerIds.length) {
    let foundMoreMappings = false;
    allBestMappings.forEach(currMapping => {
      const { path } = currMapping;
      const scannerId1 = path[path.length - 1];
      allScannerIds.forEach(scannerId2 => {
        if (!alreadyReachedScannerIds.includes(scannerId2)) {
          // console.log("Looking for indirect mappings to initial scanner", scannerId2);
          const bestMapping = getBestMappingBetweenTwoScanners({
            setup,
            scannerId1,
            scannerId2,
          });
          if (bestMapping != null && bestMapping.indexMapping.length >= 12) {
            const { rotationScanner2, translation } = bestMapping;
            allBestMappings.push({
              path: [...path, scannerId2],
              rotationScanner2,
              translation,
            });
            alreadyReachedScannerIds.push(scannerId2);
            foundMoreMappings = true;
          }
        }
      });
    });
    if (!foundMoreMappings) {
      break;
    }
  }

  if (allScannerIds.length !== alreadyReachedScannerIds.length) {
    throw new Error("Could not reach all scanners");
  }

  return allBestMappings;
}

function getScannerBeaconsRelativeToInitialScanner({ setup, scannerId2, allBestMappings }) {
  const { initialScannerId } = setup;

  if (scannerId2 === initialScannerId) {
    return setup.beaconsByScannerId[initialScannerId];
  }

  const { path } = allBestMappings.find(mapping => mapping.path[mapping.path.length - 1] === scannerId2) || {};
  if (!Array.isArray(path) || path.length < 2) {
    throw new Error("No mapping found");
  }

  let beacons = setup.beaconsByScannerId[scannerId2];
  for (let i = path.length - 1; i > 0; i--) {
    const mappingItem = allBestMappings.find(
      item => item.path[item.path.length - 2] === path[i - 1] && item.path[item.path.length - 1] === path[i]
    );
    if (!mappingItem) {
      console.error({ scannerId2, path, id1: path[i - 1], id2: path[i] });
      throw new Error("Missing mid-mapping");
    }
    beacons = beacons.map(item => {
      const rotated = applyRotationToBeacon(item, mappingItem.rotationScanner2);
      return applyNegativeTranslationToBeacon(rotated, mappingItem.translation);
    });
  }
  return beacons;
}

function listAllScannerBeacons({ setup, allBestMappings }) {
  const beacons = [];

  const _sortBeacons = (beaconA, beaconB) =>
    beaconA[0] - beaconB[0] || beaconA[1] - beaconB[1] || beaconA[2] - beaconB[2];

  const allScannerIds = Object.keys(setup.beaconsByScannerId);
  allScannerIds.forEach(scannerId2 => {
    // console.log("Processing beacons of single scanner", scannerId2);
    const beaconsOfCurrScanner = getScannerBeaconsRelativeToInitialScanner({ setup, scannerId2, allBestMappings });
    beaconsOfCurrScanner.forEach(currBeacon => {
      if (beacons.every(item => item[0] !== currBeacon[0] || item[1] !== currBeacon[1] || item[2] !== currBeacon[2])) {
        beacons.push(currBeacon);
      }
    });
  });

  beacons.sort(_sortBeacons);

  return beacons;
}

function getLargestManhattenDistanceBetweenScanners({ setup, allBestMappings }) {
  const { initialScannerId } = setup;
  const allScannerIds = Object.keys(setup.beaconsByScannerId);

  const relativeScannerPositions = [{ scannerId: initialScannerId, position: [0, 0, 0] }];
  allScannerIds.forEach(scannerId => {
    if (scannerId === initialScannerId) {
      return;
    }

    const { path } = allBestMappings.find(mapping => mapping.path[mapping.path.length - 1] === scannerId) || {};
    if (!Array.isArray(path) || path.length < 2) {
      console.error({ scannerId });
      throw new Error("No matching mapping-path found");
    }

    let position = [0, 0, 0];
    for (let i = path.length - 1; i > 0; i--) {
      const mappingItem = allBestMappings.find(
        item => item.path[item.path.length - 2] === path[i - 1] && item.path[item.path.length - 1] === path[i]
      );
      if (!mappingItem) {
        console.error({ scannerId, path, id1: path[i - 1], id2: path[i] });
        throw new Error("Missing mid-mapping");
      }
      position = applyNegativeTranslationToBeacon(
        applyRotationToBeacon(position, mappingItem.rotationScanner2),
        mappingItem.translation
      );
    }
    relativeScannerPositions.push({ scannerId, position });
  });

  const _getManhattanDistance = (position1, position2) => {
    return (
      Math.abs(position1[0] - position2[0]) +
      Math.abs(position1[1] - position2[1]) +
      Math.abs(position1[2] - position2[2])
    );
  };

  let maxDistance = 0;
  for (let i = 0; i < relativeScannerPositions.length - 1; i++) {
    const position1 = relativeScannerPositions[i].position;
    for (let k = i + 1; k < relativeScannerPositions.length; k++) {
      const position2 = relativeScannerPositions[k].position;
      const currDistance = _getManhattanDistance(position1, position2);
      maxDistance = Math.max(maxDistance, currDistance);
    }
  }

  return { relativeScannerPositions, maxDistance };
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2,

  parseLinesIntoSetup,
  listPossibleScannerRotations,
  applyRotationToBeacon,
  applyNegativeRotationToBeacon,
  getTranslationFromOneBeaconToAnother,
  applyTranslationToBeacon,
  matchTwoBeaconSetsWithGivenTranslation,
  getBestMappingBetweenTwoScanners,
  getAllBestMappingsStartingAtInitialScanner,
  getScannerBeaconsRelativeToInitialScanner,
  listAllScannerBeacons,
  getLargestManhattenDistanceBetweenScanners,
};
