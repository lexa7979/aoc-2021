const fs = require("fs");

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
  return getProductOfUnderwaterPositions(inputDataLines());
}

function getProductOfUnderwaterPositions(list) {
  let horizontal = 0;
  let depth = 0;
  for (let i = 0; i < list.length; i++) {
    const [command, valueText] = list[i].split(" ");
    const value = parseInt(valueText, 10);
    if (command === "forward") {
      horizontal += value;
    } else if (command === "down") {
      depth += value;
    } else if (command === "up") {
      depth -= value;
    } else {
      throw new Error(`Invalid command "${command}"`);
    }
  }
  return horizontal * depth;
}

function getSolutionPart2() {
  return getProductOfUnderwaterPositionsWithAiming(inputDataLines());
}

function getProductOfUnderwaterPositionsWithAiming(list) {
  let aim = 0;
  let horizontal = 0;
  let depth = 0;
  for (let i = 0; i < list.length; i++) {
    const [command, valueText] = list[i].split(" ");
    const value = parseInt(valueText, 10);
    if (command === "forward") {
      horizontal += value;
      depth += aim * value;
    } else if (command === "down") {
      aim += value;
    } else if (command === "up") {
      aim -= value;
    } else {
      throw new Error(`Invalid command "${command}"`);
    }
  }
  return horizontal * depth;
}

function inputDataLines(filename = "input.txt", asInteger = false) {
  const lines = fs.readFileSync(filename).toString().trim().split("\n");
  return asInteger ? lines.map((x) => parseInt(x)) : lines;
}

module.exports = {
  getProductOfUnderwaterPositions,
  getProductOfUnderwaterPositionsWithAiming,
  getSolutionPart1,
  getSolutionPart2,
  inputDataLines,
};
