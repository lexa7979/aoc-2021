const Import = require("./index");

const testData = [
  "7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1",
  "",
  "22 13 17 11  0",
  " 8  2 23  4 24",
  "21  9 14 16  7",
  " 6 10  3 18  5",
  " 1 12 20 15 19",
  "",
  " 3 15  0  2 22",
  " 9 18 13 17  5",
  "19  8  7 25 23",
  "20 11 10 24  4",
  "14 21 16 12  6",
  "",
  "14 21 17 24  4",
  "10 16 15  9 19",
  "18  8 23 26 20",
  "22 11 13  6  5",
  " 2  0 12  3  7",
];

describe("parseBingoSetup", () => {
  const { parseBingoSetup } = Import;
  it("- when used with test-data - works as expected", () => {
    expect(parseBingoSetup(testData)).toEqual({
      draws: [
        7, 4, 9, 5, 11, 17, 23, 2, 100, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12,
        22, 18, 20, 8, 19, 3, 26, 1,
      ],
      boards: [
        [
          [22, 13, 17, 11, 100],
          [8, 2, 23, 4, 24],
          [21, 9, 14, 16, 7],
          [6, 10, 3, 18, 5],
          [1, 12, 20, 15, 19],
        ],
        [
          [3, 15, 100, 2, 22],
          [9, 18, 13, 17, 5],
          [19, 8, 7, 25, 23],
          [20, 11, 10, 24, 4],
          [14, 21, 16, 12, 6],
        ],
        [
          [14, 21, 17, 24, 4],
          [10, 16, 15, 9, 19],
          [18, 8, 23, 26, 20],
          [22, 11, 13, 6, 5],
          [2, 100, 12, 3, 7],
        ],
      ],
    });
  });
});

describe("playBingoAndGetWinningBoardAndNumber", () => {
  const { playBingoAndGetWinningBoardAndNumber, parseBingoSetup } = Import;
  it("- when used with test-data - works as expected", () => {
    const setup = parseBingoSetup(testData);
    expect(playBingoAndGetWinningBoardAndNumber(setup)).toBe(4512);
  });
});

describe("getSolutionPart1", () => {
  const { getSolutionPart1 } = Import;
  it("- when used with real data - works as expected", () => {
    expect(getSolutionPart1()).toBe(71708);
  });
});

describe("playBingoAndGetLosingBoardAndNumber", () => {
  const { playBingoAndGetLosingBoardAndNumber, parseBingoSetup } = Import;
  it("- when used with test-data - works as expected", () => {
    const setup = parseBingoSetup(testData);
    expect(playBingoAndGetLosingBoardAndNumber(setup)).toBe(1924);
  });
});

describe("getSolutionPart2", () => {
  const { getSolutionPart2 } = Import;
  it("- when used with real data - works as expected", () => {
    expect(getSolutionPart2()).not.toBe(28392);
    expect(getSolutionPart2()).toBe(34726);
  });
});
