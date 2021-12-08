const Import = require("./index");
const Helpers = require("./helpers");

const testData1 = ["acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf"];

const testData2 = [
  "be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe",
  "edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc",
  "fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg",
  "fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb",
  "aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea",
  "fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb",
  "dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe",
  "bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef",
  "egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb",
  "gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce",
];

describe("countNumberOfDigitsWithUniqueAmountOfSegments", () => {
  const { countNumberOfDigitsWithUniqueAmountOfSegments } = Import;
  it("- when used with test-data - works as expected", () => {
    const lines = Helpers.parseInputData(testData2);
    const result = countNumberOfDigitsWithUniqueAmountOfSegments(lines);
    expect(result).toBe(26);
  });
});

describe("parseAndSortAllSegmentLetters", () => {
  const { parseAndSortAllSegmentLetters } = Import;
  it("works as expected", () => {
    const lines = Helpers.parseInputData(testData2);
    const sorted = parseAndSortAllSegmentLetters(lines);
    expect(sorted[0]).toEqual([
      ["be", "bde", "bceg", "cdefg", "bcdef", "abcdf", "bcdefg", "acdefg", "abdefg", "abcdefg"],
      ["abcdefg", "bcdef", "bcdefg", "bceg"],
    ]);
  });
});

describe("getDiffLetterFromTwoMixedSegments", () => {
  const { getDiffLetterFromTwoMixedSegments } = Import;
  it("works as expected", () => {
    expect(getDiffLetterFromTwoMixedSegments({ shorterSegment: "abd", longerSegment: "abcd", ignore: "" })).toBe("c");
    expect(getDiffLetterFromTwoMixedSegments({ shorterSegment: "cf", longerSegment: "bcdf", ignore: "d" })).toBe("b");
  });
});

describe("getUniqueLetterFromSeveralMixedSegments", () => {
  const { getUniqueLetterFromSeveralMixedSegments } = Import;
  it("works as expected", () => {
    expect(getUniqueLetterFromSeveralMixedSegments({ segments: ["cdfbe", "gcdfa", "fbcad", "eafb"] })).toEqual("f");
    expect(
      getUniqueLetterFromSeveralMixedSegments({ segments: ["cdafbe", "gcdfa", "fbcad", "eafb"], ignore: "f" })
    ).toEqual("a");
  });
});

describe("analyseTenDigitOutput", () => {
  const { analyseTenDigitOutput, parseAndSortAllSegmentLetters } = Import;
  it("- when used with test-data - works as expected", () => {
    const parsedLines = parseAndSortAllSegmentLetters(Helpers.parseInputData(testData1));
    const analysis = analyseTenDigitOutput(parsedLines[0][0]);
    expect(analysis).toEqual({
      ab: 1,
      abcdef: 9,
      abcdefg: 8,
      abcdf: 3,
      abcdeg: 0,
      abd: 7,
      abef: 4,
      acdfg: 2,
      bcdef: 5,
      bcdefg: 6,
    });
  });
});

describe("getSumOfAllAnalysedFourDigitOutputs", () => {
  const { getSumOfAllAnalysedFourDigitOutputs } = Import;
  it("- when used with test-data - works as expected", () => {
    const parsedLines1 = Import.parseAndSortAllSegmentLetters(Helpers.parseInputData(testData1));
    const result1 = getSumOfAllAnalysedFourDigitOutputs(parsedLines1);
    expect(result1).toBe(5353);

    const parsedLines2 = Import.parseAndSortAllSegmentLetters(Helpers.parseInputData(testData2));
    const result2 = getSumOfAllAnalysedFourDigitOutputs(parsedLines2);
    expect(result2).toBe(61229);
  });
});

describe("applyAnalysisToFourDigitOutput", () => {
  const { applyAnalysisToFourDigitOutput, parseAndSortAllSegmentLetters } = Import;
  it("- when used with test-data - works as expected", () => {
    const lines = parseAndSortAllSegmentLetters(Helpers.parseInputData(testData1));
    const result = applyAnalysisToFourDigitOutput(lines[0][1], {
      abcdefg: 8,
      bcdef: 5,
      acdfg: 2,
      abcdf: 3,
      abd: 7,
      abcdef: 9,
      bcdefg: 6,
      abef: 4,
      abcdeg: 0,
      ab: 1,
    });
    expect(result).toBe(5353);
  });
});

describe("getSolutionPart1", () => {
  const { getSolutionPart1 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart1();
    expect(result).toBe(367);
  });
});

describe("getSolutionPart2", () => {
  const { getSolutionPart2 } = Import;
  it("- when used with real data - works as expected", () => {
    expect(getSolutionPart2()).toBe(974512);
  });
});
