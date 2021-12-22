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
  const allBestMappings = getAllBestMappingsBetweenAnyTwoScanners(setup);
  return extractUniqueBeaconsFromAllBestMappings(setup, allBestMappings).length;
}

function getSolutionPart2() {
  const lines = Helpers.parseInputData();
  return getMaximumMagnitudeWhenAddingTwoSnailfishNumbers(lines);
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

        // const translation = getTranslationFromOneBeaconToAnother(beacon1, allRotatedBeacons2[index2]);
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

function getScannerBeaconsRelativeToInitialScanner({ setup, scannerId2, scannerMappings }) {
  const { initialScannerId } = setup;

  if (scannerId2 === initialScannerId) {
    return setup.beaconsByScannerId[initialScannerId];
  }

  const mappingSteps = [];
  const _traverse = currPath => {
    if (mappingSteps.length === 0) {
      const lastStep = currPath[currPath.length - 1];
      if (lastStep === scannerId2) {
        mappingSteps.push(...currPath);
        return;
      }
      scannerMappings
        .filter(
          item =>
            (item.scannerId1 === lastStep && !currPath.includes(item.scannerId2)) ||
            (item.scannerId2 === lastStep && !currPath.includes(item.scannerId1))
        )
        .forEach(item => _traverse([...currPath, item.scannerId2]));
    }
  };
  _traverse([initialScannerId]);

  if (Array.isArray(mappingSteps) && mappingSteps.length > 1) {
    let beacons = setup.beaconsByScannerId[scannerId2];
    for (let i = mappingSteps.length - 1; i > 0; i--) {
      const mappingItem = scannerMappings.find(
        item => item.scannerId1 === mappingSteps[i - 1] && item.scannerId2 === mappingSteps[i]
      );
      if (mappingItem) {
        beacons = beacons.map(item => {
          const rotated = applyRotationToBeacon(item, mappingItem.rotationScanner2);
          return applyNegativeTranslationToBeacon(rotated, mappingItem.translation);
        });
      } else {
        const reverseMappingItem = scannerMappings.find(
          item => item.scannerId1 === mappingSteps[i] && item.scannerId2 === mappingSteps[i - 1]
        );
        beacons = beacons.map(item => {
          const translated = applyTranslationToBeacon(item, mappingItem.translation);
          return applyNegativeRotationToBeacon(translated, mappingItem.rotationScanner2);
        });
      }
    }
    return beacons;
  }
}

function getAllBestMappingsBetweenAnyTwoScanners(setup) {
  const allScannerIds = Object.keys(setup.beaconsByScannerId);
  const allBestMappings = [];

  for (let idIndex1 = 0; idIndex1 < allScannerIds.length - 1; idIndex1++) {
    const scannerId1 = allScannerIds[idIndex1];
    console.log({ scannerId1, length: allBestMappings.length });
    for (let idIndex2 = idIndex1 + 1; idIndex2 < allScannerIds.length; idIndex2++) {
      const scannerId2 = allScannerIds[idIndex2];
      const bestMapping = getBestMappingBetweenTwoScanners({ setup, scannerId1, scannerId2 });
      // console.log({ scannerId1, scannerId2, length: bestMapping?.indexMapping.length });
      if (bestMapping != null && bestMapping.indexMapping.length >= 12) {
        allBestMappings.push({ scannerId1, scannerId2, ...bestMapping });
      }
    }
  }

  return allBestMappings;
}

function extractUniqueBeaconsFromAllBestMappings(setup, allBestMappings) {
  const allBeaconsRelativeToInitialScanner = [];

  Object.keys(setup.beaconsByScannerId).forEach(scannerId2 => {
    console.log({ scannerId2, allBestMappings });

    const relativeBeacons = getScannerBeaconsRelativeToInitialScanner({
      setup,
      scannerId2,
      scannerMappings: allBestMappings,
    });
    relativeBeacons.forEach(beacon => {
      if (
        allBeaconsRelativeToInitialScanner.every(
          beacon2 => beacon[0] !== beacon2[0] || beacon[1] !== beacon2[1] || beacon[2] !== beacon2[2]
        )
      ) {
        allBeaconsRelativeToInitialScanner.push(beacon);
      }
    });
  });

  return allBeaconsRelativeToInitialScanner;

  const beaconsWithScannerIdsAndIndexes = [];

  Object.keys(setup.beaconsByScannerId).forEach(scannerId => {
    setup.beaconsByScannerId[scannerId].forEach((beacon, beaconIndex) => {
      const key = `${scannerId}-${beaconIndex}`;
      // if (beaconsWithScannerIdsAndIndexes.some(item => item.includes(key))) {
      //   return;
      // }
      // const keysOfSameBeacon = [key];
      const keysOfSameBeacon = [key];
      allBestMappings.forEach(({ scannerId1, scannerId2, indexMapping }) => {
        if (scannerId1 === scannerId) {
          const match = indexMapping.find(item => item[0] === beaconIndex);
          if (match) {
            keysOfSameBeacon.push(`${scannerId2}-${match[1]}`);
          }
        } else if (scannerId2 === scannerId) {
          const match = indexMapping.find(item => item[1] === beaconIndex);
          if (match) {
            keysOfSameBeacon.push(`${scannerId1}-${match[0]}`);
          }
        }
      });
      const index = beaconsWithScannerIdsAndIndexes.findIndex(list => list.some(key => keysOfSameBeacon.includes(key)));
      if (index >= 0) {
        keysOfSameBeacon.forEach(key => {
          if (!beaconsWithScannerIdsAndIndexes[index].includes(key)) {
            beaconsWithScannerIdsAndIndexes[index].push(key);
          }
        });
      } else {
        beaconsWithScannerIdsAndIndexes.push(keysOfSameBeacon);
      }
    });
  });

  return beaconsWithScannerIdsAndIndexes;
}

// function getPossibleIndexCombinations(size1, size2) {
//   const mappings = [];
//   if (size1 <= 0 || size2 <= 0) {
//     return [];
//   }
//   const _addAllPossibleMappings = (partialMapping, nextIndex1) => {
//     if (nextIndex1 === size1) {
//       mappings.push(partialMapping);
//     }
//     if (nextIndex1 < size1) {
//       for (let index2 = 0; index2 < size2; index2++) {
//         const mapToIndex2 = partialMapping.find(item => item[1] === index2);
//         if (mapToIndex2 == null) {
//           _addAllPossibleMappings([...partialMapping, [nextIndex1, index2]], nextIndex1 + 1);
//         }
//       }
//     }
//   };
//   _addAllPossibleMappings([], 0);
//   return mappings;
// }

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
  getScannerBeaconsRelativeToInitialScanner,

  getAllBestMappingsBetweenAnyTwoScanners,
  extractUniqueBeaconsFromAllBestMappings,
};
