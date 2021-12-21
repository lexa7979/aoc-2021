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

describe("getBeaconIndexMatchesWithGivenMappingBetweenTwoScanners", () => {
  const { getBeaconIndexMatchesWithGivenMappingBetweenTwoScanners } = Import;
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

    const _testWithRotation = rotationScanner1 => {
      const rotated = Import.applyRotationToBeacon(setup.beaconsByScannerId.id0[0], rotationScanner1);
      const translation = Import.getTranslationFromOneBeaconToAnother(rotated, setup.beaconsByScannerId.id1[0]);
      const optionsBag = { setup, scannerId1: "id0", scannerId2: "id1", rotationScanner1, translation };
      return getBeaconIndexMatchesWithGivenMappingBetweenTwoScanners(optionsBag);
    };

    expect(_testWithRotation(["+x", "+y", "+z"])).toEqual([
      [0, 0],
      [1, 2],
      [2, 1],
    ]);
    expect(
      setup.beaconsByScannerId.id0.map(beacon => Import.applyRotationToBeacon(beacon, ["+y", "+x", "-z"]))
    ).toEqual([
      [2, 1, -3],
      [4, 3, -5],
      [5, 3, -4],
      [8, 6, -7],
      [2, 3, -10],
    ]);
    expect(Import.getTranslationFromOneBeaconToAnother([2, 1, -3], [4, 8, 1])).toEqual([2, 7, 4]);
    expect(_testWithRotation(["+y", "+x", "-z"])).toEqual([
      [0, 0],
      [2, 3],
      [4, 4],
    ]);
  });
});

describe("getBestMappingBetweenTwoScanners", () => {
  const { getBestMappingBetweenTwoScanners } = Import;
  it("works as expected", () => {
    const result = getBestMappingBetweenTwoScanners({
      setup: testSetup2,
      scannerId1: "id0",
      scannerId2: "id1",
    });
    expect(result).toEqual({
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
      rotationScanner1: ["-x", "+y", "-z"],
      translation: [68, 1246, -43],
    });
  });
});

describe("getAllBestMappingsBetweenAnyTwoScanners", () => {
  const { getAllBestMappingsBetweenAnyTwoScanners } = Import;
  it("works as expected", () => {
    expect(getAllBestMappingsBetweenAnyTwoScanners(testSetup2)).toEqual([
      {
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
        rotationScanner1: ["-x", "+y", "-z"],
        scannerId1: "id0",
        scannerId2: "id1",
        translation: [68, 1246, -43],
      },
      {
        indexMapping: [
          [6, 2],
          [7, 13],
          [9, 20],
          [11, 3],
          [13, 6],
          [14, 0],
          [16, 11],
          [17, 5],
          [20, 17],
          [21, 12],
          [22, 21],
          [23, 24],
        ],
        rotationScanner1: ["+x", "+y", "+z"],
        scannerId1: "id1",
        scannerId2: "id3",
        translation: [-160, 1134, 23],
      },
      {
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
        rotationScanner1: ["-z", "+x", "-y"],
        scannerId1: "id1",
        scannerId2: "id4",
        translation: [-1104, -88, 113],
      },
      {
        indexMapping: [
          [0, 14],
          [1, 18],
          [7, 23],
          [8, 22],
          [11, 11],
          [12, 19],
          [13, 6],
          [16, 1],
          [19, 5],
          [20, 7],
          [23, 13],
          [25, 24],
        ],
        rotationScanner1: ["+y", "+x", "-z"],
        scannerId1: "id2",
        scannerId2: "id4",
        translation: [168, -1125, 72],
      },
    ]);
  });
});

describe("extractUniqueBeaconsFromAllBestMappings", () => {
  const { extractUniqueBeaconsFromAllBestMappings } = Import;
  it("works as expected", () => {
    const allBestMappings = Import.getAllBestMappingsBetweenAnyTwoScanners(testSetup2);
    const result = extractUniqueBeaconsFromAllBestMappings(testSetup2, allBestMappings);
    expect(result.length).toBe(79);
    expect(result).toEqual([
      ["id0-0", "id1-3"],
      ["id0-1", "id1-8", "id4-24", "id2-25"],
      ["id0-2"],
      ["id0-3", "id1-12"],
      ["id0-4", "id1-1"],
      ["id0-5", "id1-24", "id4-3"],
      ["id0-6", "id1-18", "id4-17"],
      ["id0-7", "id1-10"],
      ["id0-8"],
      ["id0-9", "id1-0"],
      ["id0-10"],
      ["id0-11"],
      ["id0-12", "id1-2", "id4-4"],
      ["id0-13"],
      ["id0-14", "id1-5"],
      ["id0-15"],
      ["id0-16"],
      ["id0-17"],
      ["id0-18"],
      ["id0-19", "id1-15", "id4-18", "id2-1"],
      ["id0-20"],
      ["id0-21"],
      ["id0-22"],
      ["id0-23"],
      ["id0-24", "id1-19", "id4-5", "id2-19"],
      ["id1-4"],
      ["id1-6", "id3-2", "id4-11", "id2-11"],
      ["id1-7", "id3-13"],
      ["id1-9", "id3-20"],
      ["id1-11", "id3-3"],
      ["id1-13", "id3-6", "id4-1", "id2-16"],
      ["id1-14", "id3-0"],
      ["id1-16", "id3-11", "id4-15"],
      ["id1-17", "id3-5"],
      ["id1-20", "id3-17"],
      ["id1-21", "id3-12", "id4-13", "id2-23"],
      ["id1-22", "id3-21", "id4-12"],
      ["id1-23", "id3-24", "id4-16"],
      ["id2-0", "id4-14"],
      ["id2-2"],
      ["id2-3"],
      ["id2-4"],
      ["id2-5"],
      ["id2-6"],
      ["id2-7", "id4-23"],
      ["id2-8", "id4-22"],
      ["id2-9"],
      ["id2-10"],
      ["id2-12", "id4-19"],
      ["id2-13", "id4-6"],
      ["id2-14"],
      ["id2-15"],
      ["id2-17"],
      ["id2-18"],
      ["id2-20", "id4-7"],
      ["id2-21"],
      ["id2-22"],
      ["id2-24"],
      ["id3-1"],
      ["id3-4"],
      ["id3-7"],
      ["id3-8"],
      ["id3-9"],
      ["id3-10"],
      ["id3-14"],
      ["id3-15"],
      ["id3-16"],
      ["id3-18"],
      ["id3-19"],
      ["id3-22"],
      ["id3-23"],
      ["id4-0"],
      ["id4-2"],
      ["id4-8"],
      ["id4-9"],
      ["id4-10"],
      ["id4-20"],
      ["id4-21"],
      ["id4-25"],
    ]);
  });
});

describe.skip("getSolutionPart1", () => {
  const { getSolutionPart1 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart1();
    expect(result).not.toBe(387);
    expect(result).not.toBe(573);
    expect(result).toBe(79);
  });
});

describe.skip("getSolutionPart2", () => {
  const { getSolutionPart2 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart2();
    expect(result).toBe(4731);
  });
});
