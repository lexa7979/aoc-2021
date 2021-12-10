const Helpers = require("./helpers");

Helpers.setParseOptions({
  transformMatch: null,
  asInteger: false,
});

const CHUNK_CLASSES = [
  { id: 1, opening: "(", closing: ")", sytnaxErrorScore: 3, missingCharacterScore: 1 },
  { id: 2, opening: "[", closing: "]", sytnaxErrorScore: 57, missingCharacterScore: 2 },
  { id: 3, opening: "{", closing: "}", sytnaxErrorScore: 1197, missingCharacterScore: 3 },
  { id: 4, opening: "<", closing: ">", sytnaxErrorScore: 25137, missingCharacterScore: 4 },
];

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
  return getSumOfSyntaxErrorScores(lines);
}

function getSolutionPart2() {
  const lines = Helpers.parseInputData();
  return getMiddleScoreOfMissingClosingCharacters(lines);
}

function getSumOfSyntaxErrorScores(lines) {
  return lines.reduce((acc, curr) => acc + getScoreOfFirstIllegalCharacter(curr), 0);
}

function getScoreOfFirstIllegalCharacter(line) {
  const openedChunkIds = [];
  const mapOpeningTagToChunkId = {};
  const mapClosingTagToChunkId = {};
  const mapChunkIdToSyntaxErrorScore = {};
  CHUNK_CLASSES.forEach(({ id, opening, closing, sytnaxErrorScore }) => {
    mapOpeningTagToChunkId[opening] = id;
    mapClosingTagToChunkId[closing] = id;
    mapChunkIdToSyntaxErrorScore[id] = sytnaxErrorScore;
  });
  for (let i = 0; i < line.length; i++) {
    if (mapOpeningTagToChunkId[line[i]]) {
      openedChunkIds.unshift(mapOpeningTagToChunkId[line[i]]);
    } else if (mapClosingTagToChunkId[line[i]]) {
      if (openedChunkIds[0] === mapClosingTagToChunkId[line[i]]) {
        openedChunkIds.shift();
      } else {
        return mapChunkIdToSyntaxErrorScore[mapClosingTagToChunkId[line[i]]];
      }
    }
  }
  return 0;
}

function getMiddleScoreOfMissingClosingCharacters(lines) {
  const scores = lines.map(getScoreOfMissingClosingCharacters).filter(score => score > 0);
  scores.sort((a, b) => a - b);
  return scores[Math.floor(scores.length / 2)];
}

function getScoreOfMissingClosingCharacters(line) {
  const openedChunkIds = [];
  const mapOpeningTagToChunkId = {};
  const mapClosingTagToChunkId = {};
  const mapChunkIdToMissingCharacterScore = {};
  CHUNK_CLASSES.forEach(({ id, opening, closing, missingCharacterScore }) => {
    mapOpeningTagToChunkId[opening] = id;
    mapClosingTagToChunkId[closing] = id;
    mapChunkIdToMissingCharacterScore[id] = missingCharacterScore;
  });
  for (let i = 0; i < line.length; i++) {
    if (mapOpeningTagToChunkId[line[i]]) {
      openedChunkIds.unshift(mapOpeningTagToChunkId[line[i]]);
    } else if (mapClosingTagToChunkId[line[i]]) {
      if (openedChunkIds[0] === mapClosingTagToChunkId[line[i]]) {
        openedChunkIds.shift();
      } else {
        return 0;
      }
    }
  }
  let score = 0;
  for (let i = 0; i < openedChunkIds.length; i++) {
    score = 5 * score + mapChunkIdToMissingCharacterScore[openedChunkIds[i]];
  }
  return score;
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2,

  getScoreOfFirstIllegalCharacter,
  getSumOfSyntaxErrorScores,
  getScoreOfMissingClosingCharacters,
  getMiddleScoreOfMissingClosingCharacters,
};
