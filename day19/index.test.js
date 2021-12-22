// @ts-check

const Import = require("./index");

const testData1 = [
  //
  "--- scanner 0 ---",
  "-1,-1,1",
  "-2,-2,2",
  "-3,-3,3",
  "-2,-3,1",
  "5,6,-4",
  "8,0,7",
];

const testSetup1 = {
  initialScannerId: "id0",
  beaconsByScannerId: {
    id0: [
      [-1, -1, 1],
      [-2, -2, 2],
      [-3, -3, 3],
      [-2, -3, 1],
      [5, 6, -4],
      [8, 0, 7],
    ],
  },
};

const testData2 = [
  //
  "--- scanner 0 ---",
  "404,-588,-901",
  "528,-643,409",
  "-838,591,734",
  "390,-675,-793",
  "-537,-823,-458",
  "-485,-357,347",
  "-345,-311,381",
  "-661,-816,-575",
  "-876,649,763",
  "-618,-824,-621",
  "553,345,-567",
  "474,580,667",
  "-447,-329,318",
  "-584,868,-557",
  "544,-627,-890",
  "564,392,-477",
  "455,729,728",
  "-892,524,684",
  "-689,845,-530",
  "423,-701,434",
  "7,-33,-71",
  "630,319,-379",
  "443,580,662",
  "-789,900,-551",
  "459,-707,401",
  "",
  "--- scanner 1 ---",
  "686,422,578",
  "605,423,415",
  "515,917,-361",
  "-336,658,858",
  "95,138,22",
  "-476,619,847",
  "-340,-569,-846",
  "567,-361,727",
  "-460,603,-452",
  "669,-402,600",
  "729,430,532",
  "-500,-761,534",
  "-322,571,750",
  "-466,-666,-811",
  "-429,-592,574",
  "-355,545,-477",
  "703,-491,-529",
  "-328,-685,520",
  "413,935,-424",
  "-391,539,-444",
  "586,-435,557",
  "-364,-763,-893",
  "807,-499,-711",
  "755,-354,-619",
  "553,889,-390",
  "",
  "--- scanner 2 ---",
  "649,640,665",
  "682,-795,504",
  "-784,533,-524",
  "-644,584,-595",
  "-588,-843,648",
  "-30,6,44",
  "-674,560,763",
  "500,723,-460",
  "609,671,-379",
  "-555,-800,653",
  "-675,-892,-343",
  "697,-426,-610",
  "578,704,681",
  "493,664,-388",
  "-671,-858,530",
  "-667,343,800",
  "571,-461,-707",
  "-138,-166,112",
  "-889,563,-600",
  "646,-828,498",
  "640,759,510",
  "-630,509,768",
  "-681,-892,-333",
  "673,-379,-804",
  "-742,-814,-386",
  "577,-820,562",
  "",
  "--- scanner 3 ---",
  "-589,542,597",
  "605,-692,669",
  "-500,565,-823",
  "-660,373,557",
  "-458,-679,-417",
  "-488,449,543",
  "-626,468,-788",
  "338,-750,-386",
  "528,-832,-391",
  "562,-778,733",
  "-938,-730,414",
  "543,643,-506",
  "-524,371,-870",
  "407,773,750",
  "-104,29,83",
  "378,-903,-323",
  "-778,-728,485",
  "426,699,580",
  "-438,-605,-362",
  "-469,-447,-387",
  "509,732,623",
  "647,635,-688",
  "-868,-804,481",
  "614,-800,639",
  "595,780,-596",
  "",
  "--- scanner 4 ---",
  "727,592,562",
  "-293,-554,779",
  "441,611,-461",
  "-714,465,-776",
  "-743,427,-804",
  "-660,-479,-426",
  "832,-632,460",
  "927,-485,-438",
  "408,393,-506",
  "466,436,-512",
  "110,16,151",
  "-258,-428,682",
  "-393,719,612",
  "-211,-452,876",
  "808,-476,-593",
  "-575,615,604",
  "-485,667,467",
  "-680,325,-822",
  "-627,-443,-432",
  "872,-547,-609",
  "833,512,582",
  "807,604,487",
  "839,-516,451",
  "891,-625,532",
  "-652,-548,-490",
  "30,-46,-14",
];

const testSetup2 = {
  initialScannerId: "id0",
  beaconsByScannerId: {
    id0: [
      [404, -588, -901],
      [528, -643, 409],
      [-838, 591, 734],
      [390, -675, -793],
      [-537, -823, -458],
      [-485, -357, 347],
      [-345, -311, 381],
      [-661, -816, -575],
      [-876, 649, 763],
      [-618, -824, -621],
      [553, 345, -567],
      [474, 580, 667],
      [-447, -329, 318],
      [-584, 868, -557],
      [544, -627, -890],
      [564, 392, -477],
      [455, 729, 728],
      [-892, 524, 684],
      [-689, 845, -530],
      [423, -701, 434],
      [7, -33, -71],
      [630, 319, -379],
      [443, 580, 662],
      [-789, 900, -551],
      [459, -707, 401],
    ],
    id1: [
      [686, 422, 578],
      [605, 423, 415],
      [515, 917, -361],
      [-336, 658, 858],
      [95, 138, 22],
      [-476, 619, 847],
      [-340, -569, -846],
      [567, -361, 727],
      [-460, 603, -452],
      [669, -402, 600],
      [729, 430, 532],
      [-500, -761, 534],
      [-322, 571, 750],
      [-466, -666, -811],
      [-429, -592, 574],
      [-355, 545, -477],
      [703, -491, -529],
      [-328, -685, 520],
      [413, 935, -424],
      [-391, 539, -444],
      [586, -435, 557],
      [-364, -763, -893],
      [807, -499, -711],
      [755, -354, -619],
      [553, 889, -390],
    ],
    id2: [
      [649, 640, 665],
      [682, -795, 504],
      [-784, 533, -524],
      [-644, 584, -595],
      [-588, -843, 648],
      [-30, 6, 44],
      [-674, 560, 763],
      [500, 723, -460],
      [609, 671, -379],
      [-555, -800, 653],
      [-675, -892, -343],
      [697, -426, -610],
      [578, 704, 681],
      [493, 664, -388],
      [-671, -858, 530],
      [-667, 343, 800],
      [571, -461, -707],
      [-138, -166, 112],
      [-889, 563, -600],
      [646, -828, 498],
      [640, 759, 510],
      [-630, 509, 768],
      [-681, -892, -333],
      [673, -379, -804],
      [-742, -814, -386],
      [577, -820, 562],
    ],
    id3: [
      [-589, 542, 597],
      [605, -692, 669],
      [-500, 565, -823],
      [-660, 373, 557],
      [-458, -679, -417],
      [-488, 449, 543],
      [-626, 468, -788],
      [338, -750, -386],
      [528, -832, -391],
      [562, -778, 733],
      [-938, -730, 414],
      [543, 643, -506],
      [-524, 371, -870],
      [407, 773, 750],
      [-104, 29, 83],
      [378, -903, -323],
      [-778, -728, 485],
      [426, 699, 580],
      [-438, -605, -362],
      [-469, -447, -387],
      [509, 732, 623],
      [647, 635, -688],
      [-868, -804, 481],
      [614, -800, 639],
      [595, 780, -596],
    ],
    id4: [
      [727, 592, 562],
      [-293, -554, 779],
      [441, 611, -461],
      [-714, 465, -776],
      [-743, 427, -804],
      [-660, -479, -426],
      [832, -632, 460],
      [927, -485, -438],
      [408, 393, -506],
      [466, 436, -512],
      [110, 16, 151],
      [-258, -428, 682],
      [-393, 719, 612],
      [-211, -452, 876],
      [808, -476, -593],
      [-575, 615, 604],
      [-485, 667, 467],
      [-680, 325, -822],
      [-627, -443, -432],
      [872, -547, -609],
      [833, 512, 582],
      [807, 604, 487],
      [839, -516, 451],
      [891, -625, 532],
      [-652, -548, -490],
      [30, -46, -14],
    ],
  },
};

const testBestMappings2 = [
  {
    path: ["id0", "id1"],
    rotationScanner2: ["-x", "+y", "-z"],
    translation: [-68, 1246, 43],
  },
  {
    path: ["id0", "id1", "id3"],
    rotationScanner2: ["+x", "+y", "+z"],
    translation: [-160, 1134, 23],
  },
  {
    path: ["id0", "id1", "id4"],
    rotationScanner2: ["+y", "-z", "-x"],
    translation: [-88, -113, 1104],
  },
  {
    path: ["id0", "id1", "id4", "id2"],
    rotationScanner2: ["+y", "+x", "-z"],
    translation: [-168, 1125, -72],
  },
];

describe("parseLinesIntoSetup", () => {
  const { parseLinesIntoSetup } = Import;
  it("works as expected", () => {
    expect(parseLinesIntoSetup(testData1)).toEqual(testSetup1);
    expect(parseLinesIntoSetup(testData2)).toEqual(testSetup2);
  });
});

describe("listPossibleScannerRotations", () => {
  const { listPossibleScannerRotations } = Import;
  it("works as expected", () => {
    const rotationsAsStrings = listPossibleScannerRotations()
      .map(item => item.join(""))
      .sort();
    expect(rotationsAsStrings.length).toBe(24);
    expect(rotationsAsStrings).toEqual([
      "+x+y+z",
      "+x+z-y",
      "+x-y-z",
      "+x-z+y",
      "+y+x-z",
      "+y+z+x",
      "+y-x+z",
      "+y-z-x",
      "+z+x+y",
      "+z+y-x",
      "+z-x-y",
      "+z-y+x",
      "-x+y-z",
      "-x+z+y",
      "-x-y+z",
      "-x-z-y",
      "-y+x+z",
      "-y+z-x",
      "-y-x-z",
      "-y-z+x",
      "-z+x-y",
      "-z+y+x",
      "-z-x+y",
      "-z-y-x",
    ]);
  });
});

describe("applyRotationToBeacon", () => {
  const { applyRotationToBeacon } = Import;
  it("works as expected", () => {
    expect(applyRotationToBeacon([404, -588, -901], ["+x", "+y", "+z"])).toEqual([404, -588, -901]);
    expect(applyRotationToBeacon([404, -588, -901], ["-x", "-y", "+z"])).toEqual([-404, 588, -901]);
    expect(applyRotationToBeacon([404, -588, -901], ["+z", "-x", "+y"])).toEqual([-901, -404, -588]);
  });
});

describe("applyNegativeRotationToBeacon", () => {
  const { applyNegativeRotationToBeacon } = Import;
  it("works as expected", () => {
    expect(applyNegativeRotationToBeacon([404, -588, -901], ["+x", "+y", "+z"])).toEqual([404, -588, -901]);
    expect(applyNegativeRotationToBeacon([-404, 588, -901], ["-x", "-y", "+z"])).toEqual([404, -588, -901]);
    expect(applyNegativeRotationToBeacon([-588, 404, -901], ["+y", "+x", "+z"])).toEqual([404, -588, -901]);
    expect(applyNegativeRotationToBeacon([-901, -404, -588], ["+z", "-x", "+y"])).toEqual([404, -588, -901]);
  });
});

describe("getTranslationFromOneBeaconToAnother", () => {
  const { getTranslationFromOneBeaconToAnother } = Import;
  it("works as expected", () => {
    const beacon = [404, -588, -901];
    expect(getTranslationFromOneBeaconToAnother(beacon, [0, 0, 0])).toEqual([-404, 588, 901]);
    expect(getTranslationFromOneBeaconToAnother(beacon, [100, 0, 10])).toEqual([-304, 588, 911]);
    expect(getTranslationFromOneBeaconToAnother(beacon, [0, -100, 1])).toEqual([-404, 488, 902]);
  });
});

describe("applyTranslationToBeacon", () => {
  const { applyTranslationToBeacon } = Import;
  it("works as expected", () => {
    const beacon = [404, -588, -901];
    expect(applyTranslationToBeacon(beacon, [0, 0, 0])).toEqual(beacon);
    expect(applyTranslationToBeacon(beacon, [100, 0, 10])).toEqual([504, -588, -891]);
    expect(applyTranslationToBeacon(beacon, [0, -100, 1])).toEqual([404, -688, -900]);
  });
});

describe("matchTwoBeaconSetsWithGivenTranslation", () => {
  const { matchTwoBeaconSetsWithGivenTranslation } = Import;
  it("works as expected", () => {
    const setup = {
      beaconsByScannerId: {
        id0: [
          [1, 2, 3],
          [3, 4, 5],
          [3, 5, 4],
          [6, 8, 7],
          [3, 2, 10],
        ],
        id1: [
          [4, 8, 1],
          [6, 11, 2],
          [6, 10, 3],
          [7, 10, 0],
          [4, 10, -6],
        ],
      },
    };

    const allBeaconsSet1 = setup.beaconsByScannerId.id0;

    const _testWithRotation = rotationScanner2 => {
      const allBeaconsSet2 = setup.beaconsByScannerId.id1.map(beacon =>
        Import.applyRotationToBeacon(beacon, rotationScanner2)
      );
      const translation = Import.getTranslationFromOneBeaconToAnother(allBeaconsSet1[0], allBeaconsSet2[0]);
      const optionsBag = { allBeaconsSet1, allBeaconsSet2, translation };
      return matchTwoBeaconSetsWithGivenTranslation(optionsBag);
    };

    const rotation1 = ["+x", "+y", "+z"];
    const rotation2 = ["+y", "+x", "-z"];

    expect(setup.beaconsByScannerId.id0.map(beacon => Import.applyRotationToBeacon(beacon, rotation2))).toEqual([
      [2, 1, -3],
      [4, 3, -5],
      [5, 3, -4],
      [8, 6, -7],
      [2, 3, -10],
    ]);
    expect(Import.getTranslationFromOneBeaconToAnother([2, 1, -3], [4, 8, 1])).toEqual([2, 7, 4]);

    expect(_testWithRotation(rotation1)).toEqual([
      [0, 0],
      [1, 2],
      [2, 1],
    ]);
    expect(_testWithRotation(rotation2)).toEqual([
      [0, 0],
      [2, 3],
      [4, 4],
    ]);
  });
});

describe("getBestMappingBetweenTwoScanners", () => {
  const { getBestMappingBetweenTwoScanners } = Import;
  it("works as expected", () => {
    expect(
      getBestMappingBetweenTwoScanners({
        setup: testSetup2,
        scannerId1: "id0",
        scannerId2: "id1",
      })
    ).toEqual({
      indexMapping: [
        [0, 3],
        [1, 8],
        [3, 12],
        [4, 1],
        [5, 24],
        [6, 18],
        [7, 10],
        [9, 0],
        [12, 2],
        [14, 5],
        [19, 15],
        [24, 19],
      ],
      rotationScanner2: ["-x", "+y", "-z"],
      translation: [-68, 1246, 43],
    });

    expect(
      getBestMappingBetweenTwoScanners({
        setup: testSetup2,
        scannerId1: "id1",
        scannerId2: "id4",
      })
    ).toEqual({
      indexMapping: [
        [2, 4],
        [6, 11],
        [8, 24],
        [13, 1],
        [15, 18],
        [16, 15],
        [18, 17],
        [19, 5],
        [21, 13],
        [22, 12],
        [23, 16],
        [24, 3],
      ],
      rotationScanner2: ["+y", "-z", "-x"],
      translation: [-88, -113, 1104],
    });
  });
});

describe("getAllBestMappingsStartingAtInitialScanner", () => {
  const { getAllBestMappingsStartingAtInitialScanner } = Import;
  it("works as expected", () => {
    expect(getAllBestMappingsStartingAtInitialScanner(testSetup2)).toEqual(testBestMappings2);
  });
});

describe("getScannerBeaconsRelativeToInitialScanner", () => {
  const { getScannerBeaconsRelativeToInitialScanner } = Import;
  it("works as expected", () => {
    expect(
      getScannerBeaconsRelativeToInitialScanner({
        setup: testSetup2,
        scannerId2: "id1",
        allBestMappings: testBestMappings2,
      })
    ).toEqual([
      [-618, -824, -621],
      [-537, -823, -458],
      [-447, -329, 318],
      [404, -588, -901],
      [-27, -1108, -65],
      [544, -627, -890],
      [408, -1815, 803],
      [-499, -1607, -770],
      [528, -643, 409],
      [-601, -1648, -643],
      [-661, -816, -575],
      [568, -2007, -577],
      [390, -675, -793],
      [534, -1912, 768],
      [497, -1838, -617],
      [423, -701, 434],
      [-635, -1737, 486],
      [396, -1931, -563],
      [-345, -311, 381],
      [459, -707, 401],
      [-518, -1681, -600],
      [432, -2009, 850],
      [-739, -1745, 668],
      [-687, -1600, 576],
      [-485, -357, 347],
    ]);

    expect(
      getScannerBeaconsRelativeToInitialScanner({
        setup: testSetup2,
        scannerId2: "id4",
        allBestMappings: testBestMappings2,
      })
    ).toEqual([
      [-612, -1695, 1788],
      [534, -1912, 768],
      [-631, -672, 1502],
      [-485, -357, 347],
      [-447, -329, 318],
      [459, -707, 401],
      [612, -1593, 1893],
      [465, -695, 1988],
      [-413, -627, 1469],
      [-456, -621, 1527],
      [-36, -1284, 1171],
      [408, -1815, 803],
      [-739, -1745, 668],
      [432, -2009, 850],
      [456, -540, 1869],
      [-635, -1737, 486],
      [-687, -1600, 576],
      [-345, -311, 381],
      [423, -701, 434],
      [527, -524, 1933],
      [-532, -1715, 1894],
      [-624, -1620, 1868],
      [496, -1584, 1900],
      [605, -1665, 1952],
      [528, -643, 409],
      [26, -1119, 1091],
    ]);

    expect(
      getScannerBeaconsRelativeToInitialScanner({
        setup: testSetup2,
        scannerId2: "id2",
        allBestMappings: testBestMappings2,
      })
    ).toEqual([
      [456, -540, 1869],
      [423, -701, 434],
      [1889, -1729, 1762],
      [1749, -1800, 1813],
      [1693, -557, 386],
      [1135, -1161, 1235],
      [1779, -442, 1789],
      [605, -1665, 1952],
      [496, -1584, 1900],
      [1660, -552, 429],
      [1780, -1548, 337],
      [408, -1815, 803],
      [527, -524, 1933],
      [612, -1593, 1893],
      [1776, -675, 371],
      [1772, -405, 1572],
      [534, -1912, 768],
      [1243, -1093, 1063],
      [1994, -1805, 1792],
      [459, -707, 401],
      [465, -695, 1988],
      [1735, -437, 1738],
      [1786, -1538, 337],
      [432, -2009, 850],
      [1847, -1591, 415],
      [528, -643, 409],
    ]);
  });
});

describe("listAllScannerBeacons", () => {
  const { listAllScannerBeacons } = Import;
  it("works as expected", () => {
    const result = listAllScannerBeacons({ setup: testSetup2, allBestMappings: testBestMappings2 });
    expect(result.length).toBe(79);
    expect(result).toEqual([
      [-892, 524, 684],
      [-876, 649, 763],
      [-838, 591, 734],
      [-789, 900, -551],
      [-739, -1745, 668],
      [-706, -3180, -659],
      [-697, -3072, -689],
      [-689, 845, -530],
      [-687, -1600, 576],
      [-661, -816, -575],
      [-654, -3158, -753],
      [-635, -1737, 486],
      [-631, -672, 1502],
      [-624, -1620, 1868],
      [-620, -3212, 371],
      [-618, -824, -621],
      [-612, -1695, 1788],
      [-601, -1648, -643],
      [-584, 868, -557],
      [-537, -823, -458],
      [-532, -1715, 1894],
      [-518, -1681, -600],
      [-499, -1607, -770],
      [-485, -357, 347],
      [-470, -3283, 303],
      [-456, -621, 1527],
      [-447, -329, 318],
      [-430, -3130, 366],
      [-413, -627, 1469],
      [-345, -311, 381],
      [-36, -1284, 1171],
      [-27, -1108, -65],
      [7, -33, -71],
      [12, -2351, -103],
      [26, -1119, 1091],
      [346, -2985, 342],
      [366, -3059, 397],
      [377, -2827, 367],
      [390, -675, -793],
      [396, -1931, -563],
      [404, -588, -901],
      [408, -1815, 803],
      [423, -701, 434],
      [432, -2009, 850],
      [443, 580, 662],
      [455, 729, 728],
      [456, -540, 1869],
      [459, -707, 401],
      [465, -695, 1988],
      [474, 580, 667],
      [496, -1584, 1900],
      [497, -1838, -617],
      [527, -524, 1933],
      [528, -643, 409],
      [534, -1912, 768],
      [544, -627, -890],
      [553, 345, -567],
      [564, 392, -477],
      [568, -2007, -577],
      [605, -1665, 1952],
      [612, -1593, 1893],
      [630, 319, -379],
      [686, -3108, -505],
      [776, -3184, -501],
      [846, -3110, -434],
      [1135, -1161, 1235],
      [1243, -1093, 1063],
      [1660, -552, 429],
      [1693, -557, 386],
      [1735, -437, 1738],
      [1749, -1800, 1813],
      [1772, -405, 1572],
      [1776, -675, 371],
      [1779, -442, 1789],
      [1780, -1548, 337],
      [1786, -1538, 337],
      [1847, -1591, 415],
      [1889, -1729, 1762],
      [1994, -1805, 1792],
    ]);
  });
});

describe("getLargestManhattenDistanceBetweenScanners", () => {
  const { getLargestManhattenDistanceBetweenScanners } = Import;
  it("works as expected", () => {
    const result = getLargestManhattenDistanceBetweenScanners({
      setup: testSetup2,
      allBestMappings: testBestMappings2,
    });
    expect(result).toEqual({
      relativeScannerPositions: [
        { position: [0, 0, 0], scannerId: "id0" },
        { position: [68, -1246, -43], scannerId: "id1" },
        { position: [1105, -1205, 1229], scannerId: "id2" },
        { position: [-92, -2380, -20], scannerId: "id3" },
        { position: [-20, -1133, 1061], scannerId: "id4" },
      ],
      maxDistance: 3621,
    });
  });
});

describe("getSolutionPart1", () => {
  const { getSolutionPart1 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart1();
    expect(result).not.toBe(387);
    expect(result).not.toBe(573);
    expect(result).toBe(378);
  });
});

describe("getSolutionPart2", () => {
  const { getSolutionPart2 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart2();
    expect(result).toBe(13148);
  });
});
