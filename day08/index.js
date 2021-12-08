const Helpers = require("./helpers");

const MAP_DIGIT_TO_REAL_WIRES = [
  "abcefg",
  "cf",
  "acdeg",
  "acdfg",
  "bcdf",
  "abdfg",
  "abdefg",
  "acf",
  "abcdefg",
  "abcdfg",
];

const MAP_SEGMENTS_COUNT_TO_POSSIBLE_DIGITS = {
  2: [1],
  3: [7],
  4: [4],
  5: [2, 3, 5],
  6: [0, 6, 9],
  7: [8],
};

Helpers.setParseOptions({
  transformMatch: /^(\w[^|]+\w) \| (\w[^|]+\w)$/,
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
  const setup = Helpers.parseInputData();
  return countNumberOfDigitsWithUniqueAmountOfSegments(setup);
}

function getSolutionPart2() {
  const setup = parseAndSortAllSegmentLetters(Helpers.parseInputData());
  return getSumOfAllAnalysedFourDigitOutputs(setup);
}

function countNumberOfDigitsWithUniqueAmountOfSegments(lines) {
  let count = 0;
  lines.forEach(parts => {
    const fourDigitOutput = parts[1].split(" ");
    if (fourDigitOutput.length !== 4) {
      throw new Error(`Invalid four-digit-output (${parts[1]})`);
    }
    fourDigitOutput.forEach(digit => {
      if (MAP_SEGMENTS_COUNT_TO_POSSIBLE_DIGITS[digit.length].length === 1) {
        count++;
      }
    });
  });
  return count;
}

function parseAndSortAllSegmentLetters(lines) {
  const _sortSegment = segment => segment.split("").sort().join("");
  return lines.map(parts => {
    const newPart1 = parts[0]
      .split(" ")
      .map(_sortSegment)
      .sort((itemA, itemB) => itemA.length - itemB.length);
    return [newPart1, parts[1].split(" ").map(_sortSegment)];
  });
}

function getSumOfAllAnalysedFourDigitOutputs(linesWithParsedSegments) {
  let sum = 0;
  linesWithParsedSegments.forEach(parts => {
    const analsis = analyseTenDigitOutput(parts[0]);
    const number = applyAnalysisToFourDigitOutput(parts[1], analsis);
    sum += number;
  });
  return sum;
}

function analyseTenDigitOutput(part1) {
  const segmentsByLength = { 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] };
  part1.forEach(text => segmentsByLength[text.length].push(text));

  const segments = Array(10);
  segments[1] = segmentsByLength[2][0];
  segments[7] = segmentsByLength[3][0];
  segments[4] = segmentsByLength[4][0];
  segments[8] = segmentsByLength[7][0];

  const mapRealToMixedSegment = {
    a: getDiffLetterFromTwoMixedSegments({ shorterSegment: segments[1], longerSegment: segments[7] }),
    d: getUniqueLetterFromSeveralMixedSegments({ segments: [segments[4], ...segmentsByLength[5]] }),
    f: getUniqueLetterFromSeveralMixedSegments({ segments: [segments[1], ...segmentsByLength[6]] }),
  };
  mapRealToMixedSegment.b = getDiffLetterFromTwoMixedSegments({
    shorterSegment: segments[1],
    longerSegment: segments[4],
    ignore: mapRealToMixedSegment.d,
  });
  mapRealToMixedSegment.c = getUniqueLetterFromSeveralMixedSegments({
    segments: [segments[1]],
    ignore: mapRealToMixedSegment.f,
  });
  mapRealToMixedSegment.g = getUniqueLetterFromSeveralMixedSegments({
    segments: segmentsByLength[5],
    ignore: mapRealToMixedSegment.a + mapRealToMixedSegment.d,
  });
  mapRealToMixedSegment.e = getUniqueLetterFromSeveralMixedSegments({
    segments: [segments[8]],
    ignore: Object.values(mapRealToMixedSegment).join(""),
  });

  [0, 2, 3, 5, 6, 9].forEach(digit => {
    segments[digit] = MAP_DIGIT_TO_REAL_WIRES[digit]
      .split("")
      .map(letter => mapRealToMixedSegment[letter])
      .sort()
      .join("");
  });

  const analysis = {};
  for (let i = 0; i < segments.length; i++) {
    if (segments[i]) {
      analysis[segments[i]] = i;
    }
  }
  return analysis;
}

function getDiffLetterFromTwoMixedSegments({ shorterSegment, longerSegment, ignore = "" }) {
  const shorterSegmentLetters = shorterSegment.split("");
  const diff = longerSegment
    .split("")
    .filter(letter => !shorterSegmentLetters.includes(letter) && !ignore.includes(letter));
  if (diff.length !== 1) {
    throw new Error(`Expected only one different (${shorterSegment}, ${longerSegment})`);
  }
  return diff[0];
}

function getUniqueLetterFromSeveralMixedSegments({ segments, ignore = "" }) {
  const uniqueLetters = "abcdefg"
    .split("")
    .filter(letter => segments.every(text => text.includes(letter)) && !ignore.includes(letter));
  if (uniqueLetters.length !== 1) {
    throw new Error(`Expected only one unique letter (${segments.join(", ")})`);
  }
  return uniqueLetters[0];
}

function applyAnalysisToFourDigitOutput(part2, analysis) {
  const listOfNumbers = part2.map(segments => analysis[segments]);
  if (listOfNumbers.some(item => item == null)) {
    throw new Error(`Can't apply analysis on ${part2.join(",")}`);
  }
  return 1000 * listOfNumbers[0] + 100 * listOfNumbers[1] + 10 * listOfNumbers[2] + listOfNumbers[3];
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2,

  countNumberOfDigitsWithUniqueAmountOfSegments,
  parseAndSortAllSegmentLetters,
  getDiffLetterFromTwoMixedSegments,
  getUniqueLetterFromSeveralMixedSegments,
  getSumOfAllAnalysedFourDigitOutputs,
  analyseTenDigitOutput,
  applyAnalysisToFourDigitOutput,
};
