// @ts-check

const Import = require("./index");

const testData1 = [
  //
  "..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..##" +
    "#..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###" +
    ".######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#." +
    ".#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#....." +
    ".#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.." +
    "...####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#....." +
    "..##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#",
  "",
  "#..#.",
  "#....",
  "##..#",
  "..#..",
  "..###",
];

const testSetup1 = {
  enhancement:
    "..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..##" +
    "#..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###" +
    ".######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#." +
    ".#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#....." +
    ".#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.." +
    "...####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#....." +
    "..##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#",
  lightPixelsByRow: {
    0: [0, 3],
    1: [0],
    2: [0, 1, 4],
    3: [2],
    4: [2, 3, 4],
  },
};

describe("parseLinesIntoSetup", () => {
  const { parseLinesIntoSetup } = Import;
  it("works as expected", () => {
    const setup = parseLinesIntoSetup(testData1);
    expect(setup).toEqual(testSetup1);
  });
});

describe("getImageDimension", () => {
  const { getImageDimension } = Import;
  it("works as expected", () => {
    expect(getImageDimension(testSetup1)).toEqual({
      maxX: 4,
      maxY: 4,
      minX: 0,
      minY: 0,
    });
  });
});

describe("getEnhancement", () => {
  const { getEnhancement } = Import;
  it("works as expected", () => {
    expect(getEnhancement(testSetup1, 2, 2)).toBe(true);
  });
});

describe("getDoubleEnhancement", () => {
  const { getDoubleEnhancement } = Import;
  it("works as expected", () => {
    expect(getDoubleEnhancement(testSetup1, 2, 2)).toBe(false);
  });
});

describe("countPixelsAfterDoubleEnhancement", () => {
  const { countPixelsAfterDoubleEnhancement } = Import;
  it("works as expected", () => {
    expect(countPixelsAfterDoubleEnhancement(testSetup1)).toBe(35);
  });
});

describe("countPixelsAfterSeveralDoubleEnhancements", () => {
  const { countPixelsAfterSeveralDoubleEnhancements } = Import;
  it("works as expected", () => {
    expect(countPixelsAfterSeveralDoubleEnhancements(testSetup1, 25)).toBe(3351);
  });
});

describe("getSolutionPart1", () => {
  const { getSolutionPart1 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart1();
    expect(result).toBe(5486);
  });
});

describe("getSolutionPart2", () => {
  const { getSolutionPart2 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart2();
    expect(result).toBe(20210);
  });
});
