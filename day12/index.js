const Helpers = require("./helpers");

Helpers.setParseOptions({
  transformMatch: /^(\w+)-(\w+)$/,
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
  const setup = parseLinesIntoCaveSetup(lines);
  return getNumberOfValidPathsThroughCaveSystem(setup, false);
}

function getSolutionPart2() {
  const lines = Helpers.parseInputData();
  const setup = parseLinesIntoCaveSetup(lines);
  return getNumberOfValidPathsThroughCaveSystem(setup, true);
}

function parseLinesIntoCaveSetup(lines) {
  const caves = {};
  lines.forEach(([caveFrom, caveTo]) => {
    if (!caves[caveFrom]) {
      caves[caveFrom] = { isBigCave: caveFrom.toUpperCase() === caveFrom, paths: [] };
    }
    if (!caves[caveTo]) {
      caves[caveTo] = { isBigCave: caveTo.toUpperCase() === caveTo, paths: [] };
    }
    caves[caveFrom].paths.push(caveTo);
    caves[caveFrom].paths.sort();
    caves[caveTo].paths.push(caveFrom);
    caves[caveTo].paths.sort();
  });
  return caves;
}

function getNumberOfValidPathsThroughCaveSystem(setup, allowOneSmallCaveTwice = false) {
  const paths = [];

  const _traverse = steps => {
    if (steps.length < 100) {
      const currCave = steps[steps.length - 1];
      if (currCave === "end") {
        paths.push(steps.join(","));
        return;
      }
      setup[currCave].paths.forEach(nextCave => {
        if (nextCave === "start") {
          return;
        }
        if (!setup[nextCave].isBigCave && steps.includes(nextCave)) {
          const doubleSmallCaves = steps
            .filter((item, index) => steps.indexOf(item) !== index)
            .filter(item => !setup[item].isBigCave);
          if (doubleSmallCaves.length > 0 || !allowOneSmallCaveTwice) {
            return;
          }
        }
        _traverse([...steps, nextCave]);
      });
    }
  };

  _traverse(["start"]);

  return paths.length;
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2,

  parseLinesIntoCaveSetup,
  getNumberOfValidPathsThroughCaveSystem,
};
