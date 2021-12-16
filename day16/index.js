const Helpers = require("./helpers");

Helpers.setParseOptions({
  transformMatch: null,
  asInteger: false,
});

if (process.env.NODE_ENV !== "test") {
  console.log("Javascript");
  const part = process.env.part || "part1";
  if (part === "part1") {
    console.log(getSolutionPart1());
  } else {
    console.log(getSolutionPart2());
  }
}

function getSolutionPart1() {
  const lines = Helpers.parseInputData();
  const setup = parseLinesIntoSetup(lines);
  return getSumOfAllVersionNumbers(setup);
}

function getSolutionPart2() {
  const lines = Helpers.parseInputData();
  const setup = parseLinesIntoSetup(lines);
  return runCalculationEncodedInPacket(parsePacket(setup));
}

function parseLinesIntoSetup(lines) {
  let setup = "";
  lines[0].split("").forEach(character => {
    const number = parseInt(character, 16);
    setup += number.toString(2).padStart(4, "0");
  });
  return setup;
}

function parsePacket(packet) {
  const result = {};
  result.version = parseInt(packet.slice(0, 3), 2);
  result.typeId = parseInt(packet.slice(3, 6), 2);
  result.packetLength = 6;

  if (result.typeId === 4) {
    result.isLiteralValue = true;
    let binary = "";
    for (let i = 6; i + 5 <= packet.length; i += 5) {
      binary += packet.slice(i + 1, i + 5);
      result.packetLength += 5;
      if (packet[i] === "0") {
        break;
      }
    }
    result.number = parseInt(binary, 2);
  } else {
    result.isOperator = true;
    result.subPackets = [];
    const lengthTypeId = packet[6];

    if (lengthTypeId === "0") {
      const totalLengthOfSubPackets = parseInt(packet.slice(7, 7 + 15), 2);
      result.packetLength = 7 + 15;
      while (result.packetLength < 7 + 15 + totalLengthOfSubPackets) {
        const currPacket = parsePacket(packet.slice(result.packetLength));
        result.packetLength += currPacket.packetLength;
        result.subPackets.push(currPacket);
      }
    } else {
      const numberOfSubPackets = parseInt(packet.slice(7, 7 + 11), 2);
      result.packetLength = 7 + 11;
      for (let i = 0; i < numberOfSubPackets; i++) {
        const currPacket = parsePacket(packet.slice(result.packetLength));
        result.packetLength += currPacket.packetLength;
        result.subPackets.push(currPacket);
      }
    }
  }

  result.otherPackets = packet.slice(result.packetLength);
  return result;
}

function getSumOfAllVersionNumbers(setup) {
  let sum = 0;
  const _processPacket = packet => {
    sum += packet.version;
    if (Array.isArray(packet.subPackets)) {
      packet.subPackets.map(_processPacket);
    }
  };
  _processPacket(parsePacket(setup));
  return sum;
}

function runCalculationEncodedInPacket(packet) {
  if (packet.isLiteralValue) {
    return packet.number;
  }

  if (packet.subPackets.length === 0) {
    throw new Error("Missing subpacket(s)");
  }
  if (packet.typeId > 4 && packet.subPackets.length !== 2) {
    throw new Error("Comparison expects exactly two subpackets");
  }
  const subValues = packet.subPackets.map(runCalculationEncodedInPacket);

  switch (packet.typeId) {
    case 0:
      return subValues.reduce((acc, curr) => acc + curr, 0);
    case 1:
      return subValues.reduce((acc, curr) => acc * curr, 1);
    case 2:
      return Math.min(...subValues);
    case 3:
      return Math.max(...subValues);
    case 5:
      return subValues[0] > subValues[1] ? 1 : 0;
    case 6:
      return subValues[0] < subValues[1] ? 1 : 0;
    case 7:
      return subValues[0] == subValues[1] ? 1 : 0;
  }
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2,

  parseLinesIntoSetup,
  parsePacket,
  getSumOfAllVersionNumbers,
  runCalculationEncodedInPacket,
};
