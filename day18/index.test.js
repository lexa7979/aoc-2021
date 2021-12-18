const Import = require("./index");
const Helpers = require("./helpers");

const testData = [
  "[1,2]",
  "[[1,2],3]",
  "[9,[8,7]]",
  "[[1,9],[8,5]]",
  "[[[[1,2],[3,4]],[[5,6],[7,8]]],9]",
  "[[[9,[3,8]],[[0,9],6]],[[[3,7],[4,9]],3]]",
  "[[[[1,3],[5,3]],[[1,3],[8,7]]],[[[4,9],[6,9]],[[8,2],[7,3]]]]",
];
const testSetup = {
  pairsById: {
    id100: [1, 2],
    id101: ["id102", 3],
    id102: [1, 2],
    id103: [9, "id104"],
    id104: [8, 7],
    id105: ["id106", "id107"],
    id106: [1, 9],
    id107: [8, 5],
    id108: ["id109", 9],
    id109: ["id110", "id113"],
    id110: ["id111", "id112"],
    id111: [1, 2],
    id112: [3, 4],
    id113: ["id114", "id115"],
    id114: [5, 6],
    id115: [7, 8],
    id116: ["id117", "id122"],
    id117: ["id118", "id120"],
    id118: [9, "id119"],
    id119: [3, 8],
    id120: ["id121", 6],
    id121: [0, 9],
    id122: ["id123", 3],
    id123: ["id124", "id125"],
    id124: [3, 7],
    id125: [4, 9],
    id126: ["id127", "id134"],
    id127: ["id128", "id131"],
    id128: ["id129", "id130"],
    id129: [1, 3],
    id130: [5, 3],
    id131: ["id132", "id133"],
    id132: [1, 3],
    id133: [8, 7],
    id134: ["id135", "id138"],
    id135: ["id136", "id137"],
    id136: [4, 9],
    id137: [6, 9],
    id138: ["id139", "id140"],
    id139: [8, 2],
    id140: [7, 3],
  },
  nextId: 141,
};

describe("parseLinesIntoSetup", () => {
  const { parseLinesIntoSetup } = Import;
  it("- when used with test-data - works as expected", () => {
    const lines = Helpers.parseInputData(testData);
    const setup = parseLinesIntoSetup(lines);
    expect(setup).toEqual(testSetup);
  });
});

describe("getParentId", () => {
  const { getParentId } = Import;
  it("works as expected", () => {
    expect(() => getParentId(testSetup, "id79")).toThrow("Unknown ID");
    expect(getParentId(testSetup, "id100")).toBe(null);
    expect(getParentId(testSetup, "id102")).toBe("id101");
  });
});

describe("getPathToPair", () => {
  const { getPathToPair } = Import;
  it("works as expected", () => {
    expect(getPathToPair(testSetup, "id100")).toEqual(["id100"]);
    expect(getPathToPair(testSetup, "id104")).toEqual(["id103", "id104"]);
    expect(getPathToPair(testSetup, "id133")).toEqual(["id126", "id127", "id131", "id133"]);
  });
});

describe("getTopMostParentId", () => {
  const { getTopMostParentId } = Import;
  it("works as expected", () => {
    expect(getTopMostParentId(testSetup, "id100")).toBe("id100");
    expect(getTopMostParentId(testSetup, "id104")).toBe("id103");
    expect(getTopMostParentId(testSetup, "id133")).toBe("id126");
  });
});

describe("listTopLevelIds", () => {
  const { listTopLevelIds } = Import;
  it("works as expected", () => {
    expect(listTopLevelIds(testSetup)).toEqual(["id100", "id101", "id103", "id105", "id108", "id116", "id126"]);
  });
});

describe("getDepthOfPair", () => {
  const { getDepthOfPair } = Import;
  it("works as expected", () => {
    expect(getDepthOfPair(testSetup, "id100")).toBe(0);
    expect(getDepthOfPair(testSetup, "id102")).toBe(1);
  });
});

describe("listTreeIdsLeftToRight", () => {
  const { listTreeIdsLeftToRight } = Import;
  it("works as expected", () => {
    expect(listTreeIdsLeftToRight(testSetup, "id100")).toEqual(["id100"]);
    expect(listTreeIdsLeftToRight(testSetup, "id105")).toEqual(["id106", "id105", "id107"]);
    expect(listTreeIdsLeftToRight(testSetup, "id126")).toEqual([
      "id129",
      "id128",
      "id130",
      "id127",
      "id132",
      "id131",
      "id133",
      "id126",
      "id136",
      "id135",
      "id137",
      "id134",
      "id139",
      "id138",
      "id140",
    ]);
  });
});

describe("showSubTreeAsString", () => {
  const { showSubTreeAsString } = Import;
  it("works as expected", () => {
    expect(showSubTreeAsString(testSetup, "id126")).toBe(
      "[[[[1,3],[5,3]],[[1,3],[8,7]]],[[[4,9],[6,9]],[[8,2],[7,3]]]]"
    );
  });
});

describe("explodeDeepPairsInPlace", () => {
  const { explodeDeepPairsInPlace } = Import;
  it("works as expected", () => {
    const testCases = [
      {
        input: "[[[[[9,8],1],2],3],4]",
        output: "[[[[0,9],2],3],4]",
        operationCount: 1,
      },
      {
        input: "[7,[6,[5,[4,[3,2]]]]]",
        output: "[7,[6,[5,[7,0]]]]",
        operationCount: 1,
      },
      {
        input: "[[6,[5,[4,[3,2]]]],1]",
        output: "[[6,[5,[7,0]]],3]",
        operationCount: 1,
      },
      {
        input: "[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]",
        output: "[[3,[2,[8,0]]],[9,[5,[7,0]]]]",
        operationCount: 2,
      },
      {
        input: "[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]",
        output: "[[3,[2,[8,0]]],[9,[5,[7,0]]]]",
        operationCount: 1,
      },
      {
        input: "[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]",
        output: "[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]",
        operationCount: 0,
      },
      {
        name: "step1",
        input: "[[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]],[1,2]]",
        output: "[[[[4,0],[5,4]],[[7,0],[15,5]]],[1,2]]",
        operationCount: 3,
      },
      {
        name: "step3",
        input: "[[[[4,0],[5,4]],[[7,0],[[7,8],5]]],[1,2]]",
        output: "[[[[4,0],[5,4]],[[7,7],[0,13]]],[1,2]]",
        operationCount: 1,
      },
      {
        name: "step5",
        input: "[[[[4,0],[5,4]],[[7,7],[0,[6,7]]]],[1,2]]",
        output: "[[[[4,0],[5,4]],[[7,7],[6,0]]],[8,2]]",
        operationCount: 1,
      },
      {
        name: "long example, step 2, part1",
        input: "[[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]],[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]]",
        output: "[[[[5,11],[13,0]],[[15,14],[14,0]]],[[2,[11,10]],[[0,8],[8,0]]]]",
        // output: "[[[[6,7],[6,7]],[[7,7],[0,7]]],[[[8,7],[7,7]],[[8,8],[8,0]]]]",
        operationCount: 11,
      },
      // {
      //   name: "long example, step 2, complete",
      //   input: "[[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]],[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]]",
      //   output: "[[[[6,7],[6,7]],[[7,7],[0,7]]],[[[8,7],[7,7]],[[8,8],[8,0]]]]",
      // },
    ];
    const results = testCases.map(item => {
      const setup = Import.parseLinesIntoSetup([item.input]);
      const topLevelId = Import.listTopLevelIds(setup)[0];
      const operationCount = explodeDeepPairsInPlace(setup, topLevelId);
      return { ...item, output: Import.showSubTreeAsString(setup, topLevelId), operationCount };
    });
    expect(results).toEqual(testCases);
  });
});

describe("splitHighNumbersInPlace", () => {
  const { splitHighNumbersInPlace } = Import;
  it("works as expected", () => {
    const testCases = [
      {
        input: "[[[[0,7],4],[15,[0,13]]],[1,1]]",
        output: "[[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]",
        operationCount: 2,
        maxOperations: Number.MAX_VALUE,
      },
      {
        input: "[[[[0,7],4],[15,[0,13]]],[1,1]]",
        output: "[[[[0,7],4],[[7,8],[0,13]]],[1,1]]",
        operationCount: 1,
        maxOperations: 1,
      },
      {
        name: "step2",
        input: "[[[[4,0],[5,4]],[[7,0],[15,5]]],[1,2]]",
        output: "[[[[4,0],[5,4]],[[7,0],[[7,8],5]]],[1,2]]",
        operationCount: 1,
      },
      {
        name: "step4",
        input: "[[[[4,0],[5,4]],[[7,7],[0,13]]],[1,2]]",
        output: "[[[[4,0],[5,4]],[[7,7],[0,[6,7]]]],[1,2]]",
        operationCount: 1,
      },
      {
        name: "long example, step 2, part2",
        input: "[[[[5,11],[13,0]],[[15,14],[14,0]]],[[2,[11,10]],[[0,8],[8,0]]]]",
        output: "[[[[5,[5,6]],[13,0]],[[15,14],[14,0]]],[[2,[11,10]],[[0,8],[8,0]]]]",
        // output: "[[[[6,7],[6,7]],[[7,7],[0,7]]],[[[8,7],[7,7]],[[8,8],[8,0]]]]",
        operationCount: 1,
        maxOperations: 1,
      },
    ];
    const results = testCases.map(item => {
      const setup = Import.parseLinesIntoSetup([item.input]);
      const topLevelId = Import.listTopLevelIds(setup)[0];
      const operationCount = splitHighNumbersInPlace(setup, topLevelId, item.maxOperations || Number.MAX_VALUE);
      return {
        ...item,
        output: Import.showSubTreeAsString(setup, topLevelId),
        operationCount,
      };
    });
    expect(results).toEqual(testCases);
  });
});

describe("addTwoTopLevelPairsInPlace", () => {
  const { addTwoTopLevelPairsInPlace } = Import;
  it("works as expected", () => {
    const setup = Import.parseLinesIntoSetup(testData);
    const topLevelIds = Import.listTopLevelIds(setup);
    addTwoTopLevelPairsInPlace(setup, topLevelIds[0], topLevelIds[1]);
    const setupStrings = Import.listTopLevelIds(setup).map(id => Import.showSubTreeAsString(setup, id));
    expect(setupStrings).toEqual([
      "[[1,2],[[1,2],3]]",
      "[9,[8,7]]",
      "[[1,9],[8,5]]",
      "[[[[1,2],[3,4]],[[5,6],[7,8]]],9]",
      "[[[9,[3,8]],[[0,9],6]],[[[3,7],[4,9]],3]]",
      "[[[[1,3],[5,3]],[[1,3],[8,7]]],[[[4,9],[6,9]],[[8,2],[7,3]]]]",
    ]);
  });
});

describe("turnIntoFinalSumInPlace", () => {
  const { turnIntoFinalSumInPlace } = Import;
  it("works as expected", () => {
    const testCases = [
      // {
      //   input: ["[1,1]", "[2,2]", "[3,3]", "[4,4]"],
      //   output: ["[[[[1,1],[2,2]],[3,3]],[4,4]]"],
      // },
      // {
      //   input: ["[1,1]", "[2,2]", "[3,3]", "[4,4]", "[5,5]", "[6,6]"],
      //   output: ["[[[[5,0],[7,4]],[5,5]],[6,6]]"],
      // },
      // {
      //   name: "step1 to step5",
      //   input: ["[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]", "[1,2]"],
      //   output: ["[[[[4,0],[5,4]],[[7,7],[6,0]]],[8,2]]"],
      // },
      // {
      //   name: "long example, step 1",
      //   input: ["[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]", "[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]"],
      //   output: ["[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]"],
      // },
      {
        name: "long example, step 2",
        input: [
          "[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,7]]]]",
          // "[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]",
          "[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]",
        ],
        output: ["[[[[6,7],[6,7]],[[7,7],[0,7]]],[[[8,7],[7,7]],[[8,8],[8,0]]]]"],
      },
      // {
      //   input: [
      //     "[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]",
      //     "[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]",
      //     "[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]",
      //     "[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]",
      //     "[7,[5,[[3,8],[1,4]]]]",
      //     "[[2,[2,2]],[8,[8,1]]]",
      //     "[2,9]",
      //     "[1,[[[9,3],9],[[9,0],[0,7]]]]",
      //     "[[[5,[7,4]],7],1]",
      //     "[[[[4,2],2],6],[8,7]]",
      //   ],
      //   output: ["[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]"],
      // },
    ];

    const results = testCases.map(item => {
      const setup = Import.parseLinesIntoSetup(item.input);
      turnIntoFinalSumInPlace(setup);
      return {
        ...item,
        output: Import.listTopLevelIds(setup).map(id => Import.showSubTreeAsString(setup, id)),
      };
    });
    expect(results).toEqual(testCases);
  });
});

describe("calculateMagnitudeOfTree", () => {
  const { calculateMagnitudeOfTree } = Import;
  it("works as expected", () => {
    const testCases = [
      {
        input: "[[1,2],[[3,4],5]]",
        output: 143,
      },
      {
        input: "[[[[0,7],4],[[7,8],[6,0]]],[8,1]]",
        output: 1384,
      },
    ];
    const results = testCases.map(item => {
      const setup = Import.parseLinesIntoSetup([item.input]);
      return {
        ...item,
        output: calculateMagnitudeOfTree(setup, Import.listTopLevelIds(setup)[0]),
      };
    });
    expect(results).toEqual(testCases);
  });
});

describe("getSolutionPart1", () => {
  const { getSolutionPart1 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart1();
    expect(result).not.toBe(4200);
  });
});

describe.skip("getSolutionPart2", () => {
  const { getSolutionPart2 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart2();
    expect(result).not.toBe(712);
    expect(result).toBe(1770);
  });
});
