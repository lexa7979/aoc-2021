const Import = require("./index");
const Helpers = require("./helpers");

const testData = [
  //
  "D2FE28",
];

const testSetup1 = "110100101111111000101000";
const testSetup2 = "00111000000000000110111101000101001010010001001000000000";
const testSetup3 = "11101110000000001101010000001100100000100011000001100000";
const testSetup4 = "100010100000000001001010100000000001101010000000000000101111010001111000";

describe("parseLinesIntoSetup", () => {
  const { parseLinesIntoSetup } = Import;
  it("- when used with test-data - works as expected", () => {
    const lines = Helpers.parseInputData(testData);
    const setup = parseLinesIntoSetup(lines);
    expect(setup).toBe(testSetup1);
    expect(parseLinesIntoSetup(["8A004A801A8002F478"])).toBe(testSetup4);
  });
});

describe("parsePacket", () => {
  const { parsePacket } = Import;
  it("works as expected", () => {
    expect(parsePacket(testSetup1)).toMatchInlineSnapshot(`
Object {
  "isLiteralValue": true,
  "number": 2021,
  "otherPackets": "000",
  "packetLength": 21,
  "typeId": 4,
  "version": 6,
}
`);
    expect(parsePacket(testSetup2)).toMatchInlineSnapshot(`
Object {
  "isOperator": true,
  "otherPackets": "0000000",
  "packetLength": 49,
  "subPackets": Array [
    Object {
      "isLiteralValue": true,
      "number": 10,
      "otherPackets": "01010010001001000000000",
      "packetLength": 11,
      "typeId": 4,
      "version": 6,
    },
    Object {
      "isLiteralValue": true,
      "number": 20,
      "otherPackets": "0000000",
      "packetLength": 16,
      "typeId": 4,
      "version": 2,
    },
  ],
  "typeId": 6,
  "version": 1,
}
`);
    expect(parsePacket(testSetup3)).toMatchInlineSnapshot(`
Object {
  "isOperator": true,
  "otherPackets": "00000",
  "packetLength": 51,
  "subPackets": Array [
    Object {
      "isLiteralValue": true,
      "number": 1,
      "otherPackets": "100100000100011000001100000",
      "packetLength": 11,
      "typeId": 4,
      "version": 2,
    },
    Object {
      "isLiteralValue": true,
      "number": 2,
      "otherPackets": "0011000001100000",
      "packetLength": 11,
      "typeId": 4,
      "version": 4,
    },
    Object {
      "isLiteralValue": true,
      "number": 3,
      "otherPackets": "00000",
      "packetLength": 11,
      "typeId": 4,
      "version": 1,
    },
  ],
  "typeId": 3,
  "version": 7,
}
`);
    expect(parsePacket(Import.parseLinesIntoSetup(["8A004A801A8002F478"]))).toMatchInlineSnapshot(`
Object {
  "isOperator": true,
  "otherPackets": "000",
  "packetLength": 69,
  "subPackets": Array [
    Object {
      "isOperator": true,
      "otherPackets": "000",
      "packetLength": 51,
      "subPackets": Array [
        Object {
          "isOperator": true,
          "otherPackets": "000",
          "packetLength": 33,
          "subPackets": Array [
            Object {
              "isLiteralValue": true,
              "number": 15,
              "otherPackets": "000",
              "packetLength": 11,
              "typeId": 4,
              "version": 6,
            },
          ],
          "typeId": 2,
          "version": 5,
        },
      ],
      "typeId": 2,
      "version": 1,
    },
  ],
  "typeId": 2,
  "version": 4,
}
`);
  });
});

describe("getSumOfAllVersionNumbers", () => {
  const { getSumOfAllVersionNumbers } = Import;
  it("works as expected", () => {
    expect(getSumOfAllVersionNumbers(testSetup1)).toBe(6);
    expect(getSumOfAllVersionNumbers(testSetup2)).toBe(9);
    expect(getSumOfAllVersionNumbers(testSetup3)).toBe(14);
    expect(getSumOfAllVersionNumbers(testSetup4)).toBe(16);
  });
});

describe("runCalculationEncodedInPacket", () => {
  const { runCalculationEncodedInPacket, parseLinesIntoSetup } = Import;
  it("works as expected", () => {
    const setups = [
      ["C200B40A82", 3],
      ["04005AC33890", 54],
      ["880086C3E88112", 7],
      ["CE00C43D881120", 9],
      ["D8005AC2A8F0", 1],
      ["F600BC2D8F", 0],
      ["9C005AC2F8F0", 0],
      ["9C0141080250320F1802104A08", 1],
    ];
    const results = setups.map(item => [
      item[0],
      runCalculationEncodedInPacket(Import.parsePacket(parseLinesIntoSetup([item[0]]))),
    ]);
    expect(results).toEqual(setups);
  });
});

describe("getSolutionPart1", () => {
  const { getSolutionPart1 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart1();
    expect(result).toBe(981);
  });
});

describe("getSolutionPart2", () => {
  const { getSolutionPart2 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart2();
    expect(result).toBe(299227024091);
  });
});
