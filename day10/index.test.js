const Import = require("./index");
const Helpers = require("./helpers");

const testData = [
  //
  "[({(<(())[]>[[{[]{<()<>>",
  "[(()[<>])]({[<{<<[]>>(",
  "{([(<{}[<>[]}>{[]{[(<()>",
  "(((({<>}<{<{<>}{[]{[]{}",
  "[[<[([]))<([[{}[[()]]]",
  "[{[{({}]{}}([{[{{{}}([]",
  "{<[[]]>}<{[{[{[]{()[[[]",
  "[<(<(<(<{}))><([]([]()",
  "<{([([[(<>()){}]>(<<{{",
  "<{([{{}}[<[[[<>{}]]]>[]]",
];

describe("getScoreOfFirstIllegalCharacter", () => {
  const { getScoreOfFirstIllegalCharacter } = Import;
  it("- when used with test-data - works as expected", () => {
    const lines = Helpers.parseInputData(testData);
    expect(getScoreOfFirstIllegalCharacter(lines[0])).toBe(0);
    expect(getScoreOfFirstIllegalCharacter(lines[1])).toBe(0);
    expect(getScoreOfFirstIllegalCharacter(lines[2])).toBe(1197);
    expect(getScoreOfFirstIllegalCharacter(lines[3])).toBe(0);
    expect(getScoreOfFirstIllegalCharacter(lines[4])).toBe(3);
  });
});

describe("getSumOfSyntaxErrorScores", () => {
  const { getSumOfSyntaxErrorScores } = Import;
  it("works as expected", () => {
    const lines = Helpers.parseInputData(testData);
    const result = getSumOfSyntaxErrorScores(lines);
    expect(result).toBe(26397);
  });
});

describe("getScoreOfMissingClosingCharacters", () => {
  const { getScoreOfMissingClosingCharacters } = Import;
  it("works as expected", () => {
    const lines = Helpers.parseInputData(testData);
    expect(getScoreOfMissingClosingCharacters(lines[0])).toBe(288957);
    expect(getScoreOfMissingClosingCharacters(lines[1])).toBe(5566);
  });
});

describe("getMiddleScoreOfMissingClosingCharacters", () => {
  const { getMiddleScoreOfMissingClosingCharacters } = Import;
  it("works as expected", () => {
    const lines = Helpers.parseInputData(testData);
    expect(getMiddleScoreOfMissingClosingCharacters(lines)).toBe(288957);
  });
});

describe("getSolutionPart1", () => {
  const { getSolutionPart1 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart1();
    expect(result).toBe(339537);
  });
});

describe("getSolutionPart2", () => {
  const { getSolutionPart2 } = Import;
  it("- when used with real data - works as expected", () => {
    expect(getSolutionPart2()).toBe(2412013412);
  });
});
