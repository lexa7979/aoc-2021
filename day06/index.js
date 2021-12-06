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
  const setup = parseInitialStateOfFishs(Helpers.parseInputData());
  return countFishsAfterGivenDays(setup, 80);
}

function getSolutionPart2() {
  const setup = parseInitialStateOfFishs(Helpers.parseInputData());
  return countFishsAfterGivenDays(setup, 256);
}

function parseInitialStateOfFishs(lines) {
  return lines[0].split(",").map(text => parseInt(text, 10));
}

function countFishsAfterGivenDays(setup, days) {
  let numberOfFishesWithGivenCounter = Array(9).fill(0);
  setup.forEach(fishCounter => {
    numberOfFishesWithGivenCounter[fishCounter] = 1 + (numberOfFishesWithGivenCounter[fishCounter] || 0);
  });

  for (let day = 0; day < days; day++) {
    const newNumberOfFishes = Array(9).fill(0);
    for (let fishCounter = 0; fishCounter < 9; fishCounter++) {
      if (fishCounter === 0) {
        newNumberOfFishes[8] += numberOfFishesWithGivenCounter[0];
        newNumberOfFishes[6] += numberOfFishesWithGivenCounter[0];
      } else {
        newNumberOfFishes[fishCounter - 1] += numberOfFishesWithGivenCounter[fishCounter];
      }
    }
    numberOfFishesWithGivenCounter = newNumberOfFishes;
  }

  return numberOfFishesWithGivenCounter.reduce((acc, curr) => acc + curr, 0);
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2,
  parseInitialStateOfFishs,
  countFishsAfterGivenDays,
};
