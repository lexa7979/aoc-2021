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
  return getNumberOfIncreases(inputDataLinesIntegers());
}

function getNumberOfIncreases(list) {
  const _findIncreases = (number, index, array) =>
    array[index - 1] != null && array[index - 1] < number;
  return list.filter(_findIncreases).length;
}

function getSolutionPart2() {
  return getNumberOfIncreasesWithSumOfThreeValues(inputDataLinesIntegers());
}

function getNumberOfIncreasesWithSumOfThreeValues(list) {
  const _getSumOfThreeValues = (number, index, array) =>
    array[index - 2] == null
      ? null
      : array[index - 2] + array[index - 1] + number;
  const _findIncreases = (number, index, array) =>
    array[index - 1] != null && array[index - 1] < number;
  return list.map(_getSumOfThreeValues).filter(_findIncreases).length;
}

function inputDataLinesIntegers(filename = "input.txt") {
  return fs
    .readFileSync(filename)
    .toString()
    .trim()
    .split("\n")
    .map((x) => parseInt(x));
}

module.exports = {
  getNumberOfIncreases,
  getNumberOfIncreasesWithSumOfThreeValues,
  getSolutionPart1,
  getSolutionPart2,
  inputDataLinesIntegers,
};
