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

describe("getSnailfishNumberStats", () => {
  const { getSnailfishNumberStats } = Import;
  it("works as expected", () => {
    const inputs = [...testData, "[[[[1,[7,9]],[3,4]],[[5,6],[7,8]]],9]", "[[[[1,2],[3,4]],[[5,6],[17,8]]],9]"];
    const results = inputs.map(text => [text, getSnailfishNumberStats(text)]);
    expect(results).toEqual([
      ["[1,2]", { maxDepth: 0, maxValue: 2 }],
      ["[[1,2],3]", { maxDepth: 1, maxValue: 3 }],
      ["[9,[8,7]]", { maxDepth: 1, maxValue: 9 }],
      ["[[1,9],[8,5]]", { maxDepth: 1, maxValue: 9 }],
      ["[[[[1,2],[3,4]],[[5,6],[7,8]]],9]", { maxDepth: 3, maxValue: 9 }],
      ["[[[9,[3,8]],[[0,9],6]],[[[3,7],[4,9]],3]]", { maxDepth: 3, maxValue: 9 }],
      ["[[[[1,3],[5,3]],[[1,3],[8,7]]],[[[4,9],[6,9]],[[8,2],[7,3]]]]", { maxDepth: 3, maxValue: 9 }],
      ["[[[[1,[7,9]],[3,4]],[[5,6],[7,8]]],9]", { maxDepth: 4, maxValue: 9 }],
      ["[[[[1,2],[3,4]],[[5,6],[17,8]]],9]", { maxDepth: 3, maxValue: 17 }],
    ]);
  });
});

describe("checkIfSnailfishNumberIsReduced", () => {
  const { checkIfSnailfishNumberIsReduced } = Import;
  it("- when tree is reduced - returns true", () => {
    const results = testData.map(checkIfSnailfishNumberIsReduced);
    expect(results.every(Boolean)).toBe(true);
  });
  it("- when tree is not reduced - returns false", () => {
    expect(checkIfSnailfishNumberIsReduced("[[[[1,[7,9]],[3,4]],[[5,6],[7,8]]],9]")).toBe(false);
    expect(checkIfSnailfishNumberIsReduced("[[[[1,2],[3,4]],[[5,6],[17,8]]],9]")).toBe(false);
  });
});

describe("tryToExplodeOnePairInSnailfishNumber", () => {
  const { tryToExplodeOnePairInSnailfishNumber } = Import;
  it("- when at least on pair has to explode - returns updated snailfish-number", () => {
    const result = tryToExplodeOnePairInSnailfishNumber("[[[[1,[7,9]],[3,4]],[[5,6],[7,8]]],9]");
    expect(result).toMatchInlineSnapshot(`"[[[[8,0],[12,4]],[[5,6],[7,8]]],9]"`);
  });
  it("- when snailfish-number is reduced - returns null", () => {
    const result = tryToExplodeOnePairInSnailfishNumber(
      "[[[[1,3],[5,3]],[[1,3],[8,7]]],[[[4,9],[6,9]],[[8,2],[7,3]]]]"
    );
    expect(result).toBe(null);
  });
});

describe("tryToSplitOneValueInSnailfishNumber", () => {
  const { tryToSplitOneValueInSnailfishNumber } = Import;
  it("works as expected", () => {
    const inputs = [
      "[1,2]",
      "[[1,2],13]",
      "[9,[8,7]]",
      "[[1,39],[8,5]]",
      "[[[[1,2],[3,4]],[[5,6],[7,8]]],9]",
      "[[[9,[3,8]],[[10,19],16]],[[[3,7],[14,9]],3]]",
      "[[[[1,3],[5,3]],[[1,3],[18,7]]],[[[4,9],[6,9]],[[8,2],[7,3]]]]",
    ];
    const outputs = inputs.map(tryToSplitOneValueInSnailfishNumber);
    expect(outputs).toEqual([
      null,
      "[[1,2],[6,7]]",
      null,
      "[[1,[19,20]],[8,5]]",
      null,
      "[[[9,[3,8]],[[[5,5],19],16]],[[[3,7],[14,9]],3]]",
      "[[[[1,3],[5,3]],[[1,3],[[9,9],7]]],[[[4,9],[6,9]],[[8,2],[7,3]]]]",
    ]);
  });
});

describe("getSumOfListOfSnailfishNumbers", () => {
  const { getSumOfListOfSnailfishNumbers } = Import;
  it("works as expected", () => {
    expect(getSumOfListOfSnailfishNumbers(testData)).toMatchInlineSnapshot(
      `"[[[[6,7],[7,7]],[[7,7],[7,7]]],[[[7,7],[7,9]],[[7,8],[0,9]]]]"`
    );

    const testData2 = [
      "[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]",
      "[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]",
      "[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]",
      "[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]",
      "[7,[5,[[3,8],[1,4]]]]",
      "[[2,[2,2]],[8,[8,1]]]",
      "[2,9]",
      "[1,[[[9,3],9],[[9,0],[0,7]]]]",
      "[[[5,[7,4]],7],1]",
      "[[[[4,2],2],6],[8,7]]",
    ];
    expect(getSumOfListOfSnailfishNumbers(testData2)).toMatchInlineSnapshot(
      `"[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]"`
    );
  });
});

describe("getMagnitudeOfSnailfishNumber", () => {
  const { getMagnitudeOfSnailfishNumber } = Import;
  it("works as expected", () => {
    const testData2 = [
      "[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]",
      "[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]",
      "[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]",
      "[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]",
      "[7,[5,[[3,8],[1,4]]]]",
      "[[2,[2,2]],[8,[8,1]]]",
      "[2,9]",
      "[1,[[[9,3],9],[[9,0],[0,7]]]]",
      "[[[5,[7,4]],7],1]",
      "[[[[4,2],2],6],[8,7]]",
    ];
    const sum = Import.getSumOfListOfSnailfishNumbers(testData2);
    expect(getMagnitudeOfSnailfishNumber(sum)).toMatchInlineSnapshot(`3488`);
  });
});

describe("getSolutionPart1", () => {
  const { getSolutionPart1 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart1();
    expect(result).not.toBe(4200);
    expect(result).toBe(4184);
  });
});

describe("getSolutionPart2", () => {
  const { getSolutionPart2 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart2();
    expect(result).toBe(4731);
  });
});
