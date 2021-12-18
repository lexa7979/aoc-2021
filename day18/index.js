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
  const sum = getSumOfListOfSnailfishNumbers(lines);
  return getMagnitudeOfSnailfishNumber(sum);
}

function getSolutionPart2() {
  const lines = Helpers.parseInputData();
  return getMaximumMagnitudeWhenAddingTwoSnailfishNumbers(lines);
}

function getSnailfishNumberStats(text) {
  let maxDepth = 0;
  let currDepth = -1;
  for (let pos = 0; pos < text.length; pos++) {
    if (text[pos] === "[") {
      currDepth += 1;
      if (currDepth > maxDepth) {
        maxDepth = currDepth;
      }
    } else if (text[pos] === "]") {
      currDepth -= 1;
    }
  }

  const maxValue = Math.max(...[...text.matchAll(/\d+/g)].map(match => parseInt(match[0], 10)));

  return { maxDepth, maxValue };
}

function checkIfSnailfishNumberIsReduced(text) {
  const stats = getSnailfishNumberStats(text);
  if (stats.maxDepth > 4) {
    throw new Error("Missing support for pair-depth greater than 4.");
  }
  return stats.maxDepth < 4 && stats.maxValue < 10;
}

function tryToExplodeOnePairInSnailfishNumber(text) {
  let currDepth = 0;
  let startPos = null;
  let endPos = null;
  for (let pos = 0; pos < text.length; pos++) {
    if (text[pos] === "[") {
      currDepth += 1;
      if (startPos != null) {
        return null;
      }
      if (currDepth === 5) {
        startPos = pos;
      }
    } else if (text[pos] === "]") {
      currDepth -= 1;
      if (startPos != null) {
        endPos = pos;
        break;
      }
    }
  }

  if (startPos == null || endPos == null) {
    return null;
  }

  const [leftValue, rightValue] = /^\[(\d+),(\d+)\]$/
    .exec(text.slice(startPos, endPos + 1))
    .slice(1)
    .map(item => parseInt(item, 10));

  const newPrefix = text
    .slice(0, startPos)
    .replace(/(\d+)(\D+)$/, (match, value, padding) => `${parseInt(value, 10) + leftValue}${padding}`);
  const newSuffix = text
    .slice(endPos + 1)
    .replace(/^(\D+)(\d+)/, (match, padding, value) => `${padding}${parseInt(value, 10) + rightValue}`);

  return `${newPrefix}0${newSuffix}`;
}

function tryToSplitOneValueInSnailfishNumber(text) {
  if (!/\d\d+/.test(text)) {
    return null;
  }
  return text.replace(
    /\d\d+/,
    match => `[${Math.floor(parseInt(match, 10) / 2)},${Math.ceil(parseInt(match, 10) / 2)}]`
  );
}

function getSumOfListOfSnailfishNumbers(lines) {
  const result = [...lines];

  while (result.length > 1) {
    const text1 = result.shift();
    const text2 = result.shift();

    let newText = `[${text1},${text2}]`;
    while (!checkIfSnailfishNumberIsReduced(newText)) {
      let changed = newText;
      while (changed) {
        changed = tryToExplodeOnePairInSnailfishNumber(changed);
        if (changed) {
          newText = changed;
        }
      }

      changed = tryToSplitOneValueInSnailfishNumber(newText);
      if (changed) {
        newText = changed;
      }
    }

    result.unshift(newText);
  }

  return result[0];
}

function getMagnitudeOfSnailfishNumber(text) {
  let currText = text;
  while (true) {
    const newText = currText.replace(/\[(\d+),(\d+)\]/, (match, left, right) =>
      String(3 * parseInt(left, 10) + 2 * parseInt(right, 10))
    );
    if (newText === currText) {
      break;
    }
    currText = newText;
  }

  if (currText === "" || /\D/.test(currText)) {
    throw new Error(`Failed to calculate magnitude for "${text}"`);
  }

  return parseInt(currText, 10);
}

function getMaximumMagnitudeWhenAddingTwoSnailfishNumbers(lines) {
  let maxMagnitude = 0;

  for (let i = 0; i < lines.length; i++) {
    for (let k = 0; k < lines.length; k++) {
      if (i !== k) {
        const sum = getSumOfListOfSnailfishNumbers([lines[i], lines[k]]);
        const magnitude = getMagnitudeOfSnailfishNumber(sum);
        if (magnitude > maxMagnitude) {
          maxMagnitude = magnitude;
        }
      }
    }
  }

  return maxMagnitude;
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2,

  checkIfSnailfishNumberIsReduced,
  getSnailfishNumberStats,
  tryToExplodeOnePairInSnailfishNumber,
  tryToSplitOneValueInSnailfishNumber,
  getSumOfListOfSnailfishNumbers,
  getMagnitudeOfSnailfishNumber,
};
