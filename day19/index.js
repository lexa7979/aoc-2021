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
  };

  let currScannerId = null;
  lines.forEach(text => {
    const match1 = /--- scanner (\d+) ---/.exec(text);
    if (match1) {
      currScannerId = `id${match1[1]}`;
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
    return rotation[index][0] === "+"
      ? beacon[MAP_LETTER_TO_ORIG_INDEX[rotation[index][1]]]
      : -beacon[MAP_LETTER_TO_ORIG_INDEX[rotation[index][1]]];
  });
}

function applyTranslationToBeacon(beacon, translation) {
  return beacon.map((pos, index) => pos + translation[index]);
}

function getTranslationFromOneBeaconToAnother(beacon1, beacon2) {
  const diffX = beacon2[0] - beacon1[0];
  const diffY = beacon2[1] - beacon1[1];
  const diffZ = beacon2[2] - beacon1[2];
  return [diffX, diffY, diffZ];
}

function checkIfTranslationResultsInOtherBeacon({ beacon1, translation, beacon2 }) {
  const resultingBeacon = applyTranslationToBeacon(beacon1, translation);
  return resultingBeacon.every((value, index) => value === beacon2[index]);
}

function getBeaconIndexMatchesWithGivenMappingBetweenTwoScanners({
  setup,
  scannerId1,
  scannerId2,
  rotationScanner1,
  translation,
}) {
  const indexMatches = [];
  for (let index1 = 0; index1 < setup.beaconsByScannerId[scannerId1].length; index1++) {
    const beacon1 = setup.beaconsByScannerId[scannerId1][index1];
    const rotated = applyRotationToBeacon(beacon1, rotationScanner1);
    const rotatedAndTranslated = applyTranslationToBeacon(rotated, translation);
    const _checkIfIsMatch = beacon2 =>
      beacon2[0] === rotatedAndTranslated[0] &&
      beacon2[1] === rotatedAndTranslated[1] &&
      beacon2[2] === rotatedAndTranslated[2];
    const matchingIndex = setup.beaconsByScannerId[scannerId2].findIndex(_checkIfIsMatch);
    if (matchingIndex >= 0) {
      indexMatches.push([index1, matchingIndex]);
    }
  }
  return indexMatches;
}

function getBestMappingBetweenTwoScanners({ setup, scannerId1, scannerId2 }) {
  const size1 = setup.beaconsByScannerId[scannerId1].length;
  const size2 = setup.beaconsByScannerId[scannerId2].length;

  let bestMapping = null;
  const allRotations = listPossibleScannerRotations();
  allRotations.forEach(rotationScanner1 => {
    for (let index1 = 0; index1 < size1; index1++) {
      if (bestMapping != null && index1 + bestMapping.indexMapping.length >= size1) {
        break;
      }
      const rotated = applyRotationToBeacon(setup.beaconsByScannerId[scannerId1][index1], rotationScanner1);
      for (let index2 = 0; index2 < size2; index2++) {
        if (bestMapping != null && bestMapping.indexMapping.length >= 12) {
          return bestMapping;
        }
        if (bestMapping != null && index2 + bestMapping.indexMapping.length >= size2) {
          break;
        }
        const translation = getTranslationFromOneBeaconToAnother(rotated, setup.beaconsByScannerId[scannerId2][index2]);
        const mapping = getBeaconIndexMatchesWithGivenMappingBetweenTwoScanners({
          setup,
          scannerId1,
          scannerId2,
          rotationScanner1,
          translation,
        });
        if (bestMapping == null || mapping.length > bestMapping.indexMapping.length) {
          bestMapping = { indexMapping: mapping, rotationScanner1, translation };
          // } else if (
          //   mapping.length === bestMapping.indexMapping.length &&
          //   (bestMapping.rotationScanner1.join("-") !== rotationScanner1.join("-") ||
          //     bestMapping.translation.join("-") !== translation.join("-"))
          // ) {
          //   bestMapping.alternatives = [
          //     ...(bestMapping.alternatives || []),
          //     { indexMapping: mapping, rotationScanner1, translation },
          //   ];
        }
      }
    }
  });
  return bestMapping;
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
  getTranslationFromOneBeaconToAnother,
  applyTranslationToBeacon,
  getBeaconIndexMatchesWithGivenMappingBetweenTwoScanners,
  getBestMappingBetweenTwoScanners,
  getAllBestMappingsBetweenAnyTwoScanners,
  extractUniqueBeaconsFromAllBestMappings,
};
