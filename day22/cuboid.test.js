// @ts-check

const Cuboid = require("./cuboid");

describe("obj.getResultsAfterSubtraction", () => {
  it("works as expected", () => {
    const cuboid = new Cuboid(10, 50, 20, 60, 30, 70);
    expect(cuboid.getResultsAfterSubtraction(new Cuboid(34, 44, 35, 45, 36, 46))).toEqual([
      { startX: 10, endX: 33, startY: 20, endY: 60, startZ: 30, endZ: 70 },
      { startX: 34, endX: 44, startY: 20, endY: 34, startZ: 30, endZ: 70 },
      { startX: 34, endX: 44, startY: 35, endY: 45, startZ: 30, endZ: 35 },
      { startX: 34, endX: 44, startY: 35, endY: 45, startZ: 47, endZ: 70 },
      { startX: 34, endX: 44, startY: 46, endY: 60, startZ: 30, endZ: 70 },
      { startX: 45, endX: 50, startY: 20, endY: 60, startZ: 30, endZ: 70 },
    ]);
    expect(cuboid.getResultsAfterSubtraction(new Cuboid(0, 5, 10, 15, 20, 25))).toEqual(null);
    expect(cuboid.getResultsAfterSubtraction(cuboid)).toEqual([]);
  });
});

describe("obj.listPoints", () => {
  it("works as expected", () => {
    const cuboid = new Cuboid(10, 12, 11, 13, 12, 14);
    expect(cuboid.listPoints()).toEqual([
      "10,11,12",
      "10,11,13",
      "10,11,14",
      "10,12,12",
      "10,12,13",
      "10,12,14",
      "10,13,12",
      "10,13,13",
      "10,13,14",
      "11,11,12",
      "11,11,13",
      "11,11,14",
      "11,12,12",
      "11,12,13",
      "11,12,14",
      "11,13,12",
      "11,13,13",
      "11,13,14",
      "12,11,12",
      "12,11,13",
      "12,11,14",
      "12,12,12",
      "12,12,13",
      "12,12,14",
      "12,13,12",
      "12,13,13",
      "12,13,14",
    ]);
  });
});

describe("obj.getSize", () => {
  it("works as expected", () => {
    const cuboid = new Cuboid(10, 12, 11, 13, 12, 14);
    expect(cuboid.getSize()).toEqual(27);
  });
});
