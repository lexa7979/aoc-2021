// @ts-check

const Import = require("./index");

const testData1 = [
  //
  "on x=10..12,y=10..12,z=10..12",
  "on x=11..13,y=11..13,z=11..13",
  "off x=9..11,y=9..11,z=9..11",
  "on x=10..10,y=10..10,z=10..10",
];

const testSetup1 = {
  commands: [
    { type: "on", rangeX: [10, 12], rangeY: [10, 12], rangeZ: [10, 12] },
    { type: "on", rangeX: [11, 13], rangeY: [11, 13], rangeZ: [11, 13] },
    { type: "off", rangeX: [9, 11], rangeY: [9, 11], rangeZ: [9, 11] },
    { type: "on", rangeX: [10, 10], rangeY: [10, 10], rangeZ: [10, 10] },
  ],
};

describe("parseLinesIntoSetup", () => {
  const { parseLinesIntoSetup } = Import;
  it("works as expected", () => {
    const setup = parseLinesIntoSetup(testData1);
    expect(setup).toEqual(testSetup1);
  });
});

describe("getCuboidsAfterRunningCommands", () => {
  const { getCuboidsAfterRunningCommands } = Import;
  it("works as expected", () => {
    expect(getCuboidsAfterRunningCommands(testSetup1)).toMatchInlineSnapshot(`
Array [
  Cuboid {
    "endX": 10,
    "endY": 10,
    "endZ": 12,
    "startX": 10,
    "startY": 10,
    "startZ": 12,
  },
  Cuboid {
    "endX": 10,
    "endY": 11,
    "endZ": 12,
    "startX": 10,
    "startY": 11,
    "startZ": 12,
  },
  Cuboid {
    "endX": 10,
    "endY": 12,
    "endZ": 12,
    "startX": 10,
    "startY": 12,
    "startZ": 10,
  },
  Cuboid {
    "endX": 11,
    "endY": 10,
    "endZ": 12,
    "startX": 11,
    "startY": 10,
    "startZ": 12,
  },
  Cuboid {
    "endX": 12,
    "endY": 10,
    "endZ": 12,
    "startX": 12,
    "startY": 10,
    "startZ": 10,
  },
  Cuboid {
    "endX": 11,
    "endY": 12,
    "endZ": 10,
    "startX": 11,
    "startY": 12,
    "startZ": 10,
  },
  Cuboid {
    "endX": 12,
    "endY": 12,
    "endZ": 10,
    "startX": 12,
    "startY": 11,
    "startZ": 10,
  },
  Cuboid {
    "endX": 11,
    "endY": 11,
    "endZ": 13,
    "startX": 11,
    "startY": 11,
    "startZ": 12,
  },
  Cuboid {
    "endX": 11,
    "endY": 13,
    "endZ": 13,
    "startX": 11,
    "startY": 12,
    "startZ": 11,
  },
  Cuboid {
    "endX": 13,
    "endY": 13,
    "endZ": 13,
    "startX": 12,
    "startY": 11,
    "startZ": 11,
  },
  Cuboid {
    "endX": 10,
    "endY": 10,
    "endZ": 10,
    "startX": 10,
    "startY": 10,
    "startZ": 10,
  },
]
`);
  });
});

describe("countTotalSizeOfCuboids", () => {
  const { countTotalSizeOfCuboids } = Import;
  it("works as expected", () => {
    const allCuboids = Import.getCuboidsAfterRunningCommands(testSetup1);
    expect(countTotalSizeOfCuboids(allCuboids, -50, 50)).toBe(39);
  });
});

describe("getSolutionPart1", () => {
  const { getSolutionPart1 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart1();
    expect(result).toBe(612714);
  });
});

describe("getSolutionPart2", () => {
  const { getSolutionPart2 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart2();
    expect(result).toBe(1311612259117092);
  });
});
