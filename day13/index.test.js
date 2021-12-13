const Import = require("./index");
const Helpers = require("./helpers");

const testData = [
  //
  "6,10",
  "0,14",
  "9,10",
  "0,3",
  "10,4",
  "4,11",
  "6,0",
  "6,12",
  "4,1",
  "0,13",
  "10,12",
  "3,4",
  "3,0",
  "8,4",
  "1,10",
  "2,14",
  "8,10",
  "9,0",
  "",
  "fold along y=7",
  "fold along x=5",
];

const testSetup = {
  dots: [
    [6, 10],
    [0, 14],
    [9, 10],
    [0, 3],
    [10, 4],
    [4, 11],
    [6, 0],
    [6, 12],
    [4, 1],
    [0, 13],
    [10, 12],
    [3, 4],
    [3, 0],
    [8, 4],
    [1, 10],
    [2, 14],
    [8, 10],
    [9, 0],
  ],
  foldings: [
    ["y", 7],
    ["x", 5],
  ],
};

describe("parseLinesIntoFoldingSetup", () => {
  const { parseLinesIntoFoldingSetup } = Import;
  it("- when used with test-data - works as expected", () => {
    const lines = Helpers.parseInputData(testData);
    const setup = parseLinesIntoFoldingSetup(lines);
    expect(setup).toEqual(testSetup);
  });
});

describe("getNumberOfDotsAfterFirstFolding", () => {
  const { getNumberOfDotsAfterFirstFolding } = Import;
  it("works as expected", () => {
    expect(getNumberOfDotsAfterFirstFolding(testSetup)).toBe(17);
  });
});

describe("getSolutionPart1", () => {
  const { getSolutionPart1 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart1();
    expect(result).not.toBe(845);
    expect(result).toBe(684);
  });
});

describe("getSolutionPart2", () => {
  const { getSolutionPart2 } = Import;
  it("- when used with real data - works as expected", () => {
    expect(getSolutionPart2()).toBe(`
>   ## ###  #### ###  #     ##  #  # #  #
>    # #  #    # #  # #    #  # # #  #  #
>    # #  #   #  ###  #    #    ##   ####
>    # ###   #   #  # #    # ## # #  #  #
> #  # # #  #    #  # #    #  # # #  #  #
>  ##  #  # #### ###  ####  ### #  # #  #`);
  });
});
