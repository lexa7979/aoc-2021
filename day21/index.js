// @ts-check

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
  const result = runGameWithDeterministicDice(setup);
  return result.losingScore * result.rollCount;
}

function getSolutionPart2() {
  const lines = Helpers.parseInputData();
  const setup = parseLinesIntoSetup(lines);
  const result = runGameWithQuantumDie(setup);
  return Math.max(result.player1, result.player2);
}

function parseLinesIntoSetup(lines) {
  const setup = {
    startPosition: {},
  };

  lines.forEach(text => {
    const match = /^Player (\d) starting position: (\d+)$/.exec(text);
    if (match) {
      setup.startPosition[`player${match[1]}`] = parseInt(match[2], 10);
    }
  });

  return setup;
}

function runGameWithDeterministicDice(setup) {
  let dice = 1;
  let rollCount = 0;
  const _rollDice = () => {
    const result = dice;
    dice = (dice + 1) % 100 || 100;
    rollCount++;
    return result;
  };

  let currPlayer = "player1";
  const positions = { ...setup.startPosition };
  const scores = { player1: 0, player2: 0 };

  while (scores.player1 < 1000 && scores.player2 < 1000) {
    const turn = _rollDice() + _rollDice() + _rollDice();
    positions[currPlayer] = (positions[currPlayer] + turn) % 10 || 10;
    scores[currPlayer] += positions[currPlayer];
    currPlayer = currPlayer === "player1" ? "player2" : "player1";
  }

  return { scores, losingScore: Math.min(...Object.values(scores)), rollCount };
}

function getTrippleQuantumRollStats() {
  const trippleRolls = [];
  for (let i = 0; i < 27; i++) {
    trippleRolls.push([Math.floor(i / 9) + 1, (Math.floor(i / 3) % 3) + 1, (i % 3) + 1]);
  }

  const frequencyBySum = [];
  trippleRolls.forEach(rolls => {
    const sum = rolls[0] + rolls[1] + rolls[2];
    const index = frequencyBySum.findIndex(item => item.sum === sum);
    if (index >= 0) {
      frequencyBySum[index].frequency++;
    } else {
      frequencyBySum.push({ sum, frequency: 1 });
    }
  });

  return { trippleRolls, frequencyBySum };
}

function runGameWithQuantumDie(setup) {
  const winCount = { player1: 0, player2: 0 };

  const { frequencyBySum } = getTrippleQuantumRollStats();

  const _traverse = (game, nextTrippleRollSum, universeCount) => {
    const { positions, scores } = { positions: { ...game.positions }, scores: { ...game.scores } };

    positions[game.currPlayer] = (positions[game.currPlayer] + nextTrippleRollSum) % 10 || 10;
    scores[game.currPlayer] += positions[game.currPlayer];

    if (scores[game.currPlayer] < 21) {
      const newGameState = { currPlayer: game.currPlayer === "player1" ? "player2" : "player1", positions, scores };
      frequencyBySum.forEach(item => _traverse(newGameState, item.sum, universeCount * item.frequency));
    } else {
      winCount[game.currPlayer] += universeCount;
    }
  };

  const firstGameState = { currPlayer: "player1", positions: setup.startPosition, scores: { player1: 0, player2: 0 } };
  frequencyBySum.forEach(({ sum, frequency }) => _traverse(firstGameState, sum, frequency));

  return winCount;
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2,

  parseLinesIntoSetup,
  runGameWithDeterministicDice,
  getTrippleQuantumRollStats,
  runGameWithQuantumDie,
};
