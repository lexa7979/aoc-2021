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
  return getElementQuantityDifferenceAfterSeveralSteps(setup, 10);
}

function getSolutionPart2() {
  const lines = Helpers.parseInputData();
  const setup = parseLinesIntoSetup(lines);
  return getElementQuantityDifferenceAfterSeveralSteps(setup, 40);
}

function parseLinesIntoSetup(lines) {
  const setup = {
    polymerTemplate: lines[0],
    pairInsertionRules: {},
    elements: [],
  };

  lines.forEach(text => {
    const match = /^(\w\w) -> (\w)$/.exec(text);
    if (match) {
      setup.pairInsertionRules[match[1]] = match[2];
      if (!setup.elements.includes(match[1][0])) {
        setup.elements.push(match[1][0]);
      }
    }
  });
  setup.elements.sort();

  return setup;
}

function getElementQuantityDifferenceAfterSeveralSteps(setup, stepCount) {
  let lastElementInPolymer = setup.polymerTemplate[setup.polymerTemplate.length - 1];

  let initialElementPairFrequencies = {};
  for (let pos = 0; pos < setup.polymerTemplate.length - 1; pos++) {
    const pair = setup.polymerTemplate[pos] + setup.polymerTemplate[pos + 1];
    initialElementPairFrequencies[pair] = 1 + (initialElementPairFrequencies[pair] || 0);
  }

  let currFrequencies = initialElementPairFrequencies;
  for (let i = 0; i < stepCount; i++) {
    const nextFrequencies = {};
    Object.keys(currFrequencies).forEach(pair => {
      const frequency = currFrequencies[pair];
      const newPair1 = pair[0] + setup.pairInsertionRules[pair];
      const newPair2 = setup.pairInsertionRules[pair] + pair[1];
      nextFrequencies[newPair1] = frequency + (nextFrequencies[newPair1] || 0);
      nextFrequencies[newPair2] = frequency + (nextFrequencies[newPair2] || 0);
    });
    currFrequencies = nextFrequencies;
  }

  const finalElementFrequencies = {
    [lastElementInPolymer]: 1,
  };
  Object.keys(currFrequencies).forEach(pair => {
    const element = pair[0];
    const frequency = currFrequencies[pair];
    finalElementFrequencies[element] = frequency + (finalElementFrequencies[element] || 0);
  });
  return Math.max(...Object.values(finalElementFrequencies)) - Math.min(...Object.values(finalElementFrequencies));
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2,

  parseLinesIntoSetup,
  getElementQuantityDifferenceAfterSeveralSteps,
};
