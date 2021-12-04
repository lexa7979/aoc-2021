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
  const setup = parseBingoSetup(inputDataLines());
  return playBingoAndGetWinningBoardAndNumber(setup);
}

function getSolutionPart2() {
  const setup = parseBingoSetup(inputDataLines());
  return playBingoAndGetLosingBoardAndNumber(setup);
}

function parseBingoSetup(lines) {
  const _turnIntoNumber = text => parseInt(text, 10);
  const _handleZeroValues = number => (number === 0 ? 100 : number);
  const result = { draws: null, boards: [] };
  let currentBoard = null;
  lines.forEach(text => {
    if (text.includes(",")) {
      result.draws = text.trim().split(",").map(_turnIntoNumber).map(_handleZeroValues);
      return;
    }
    if (!text.trim()) {
      currentBoard = [];
      return;
    }
    if (currentBoard && /\d+\s+\d+/.test(text)) {
      currentBoard.push(text.trim().split(/\s+/).map(_turnIntoNumber).map(_handleZeroValues));
      if (currentBoard.length === 5) {
        result.boards.push(currentBoard);
        currentBoard = null;
      }
    }
  });
  return result;
}

function playBingoAndGetWinningBoardAndNumber({ draws, boards }) {
  for (let i = 0; i < draws.length; i++) {
    const currentDraw = draws[i];
    boards.forEach(currentBoard => markCurrentDraw({ currentBoard, currentDraw }));
    const winningBoard = boards.find(checkIfBoardHasWon);
    if (winningBoard) {
      return calculateScore({ winningBoard, currentDraw });
    }
  }
  throw new Error("Nobody won!");
}

function playBingoAndGetLosingBoardAndNumber({ draws, boards }) {
  const _notNull = value => value != null;
  for (let i = 0; i < draws.length; i++) {
    const currentDraw = draws[i];
    const allIndexesOfStillPlayingBoards = boards.map((item, index) => (item == null ? null : index)).filter(_notNull);
    allIndexesOfStillPlayingBoards.forEach(index => markCurrentDraw({ currentBoard: boards[index], currentDraw }));
    const allIndexesOfJustWinningBoards = boards
      .map((item, index) => (item && checkIfBoardHasWon(item) ? index : null))
      .filter(_notNull);
    if (allIndexesOfJustWinningBoards.length === allIndexesOfStillPlayingBoards.length) {
      return calculateScore({ winningBoard: boards[allIndexesOfJustWinningBoards[0]], currentDraw });
    }
    allIndexesOfJustWinningBoards.forEach(index => {
      boards[index] = null;
    });
  }
  throw new Error("Nobody lost!");
}

function markCurrentDraw({ currentBoard, currentDraw }) {
  for (let row = 0; row < currentBoard.length; row++) {
    for (let col = 0; col < currentBoard[row].length; col++) {
      if (currentBoard[row][col] === currentDraw) {
        currentBoard[row][col] = -currentDraw;
      }
    }
  }
}

function checkIfBoardHasWon(board) {
  return [0, 1, 2, 3, 4].some(
    i =>
      Math.max(board[i][0], board[i][1], board[i][2], board[i][3], board[i][4]) < 0 ||
      Math.max(board[0][i], board[1][i], board[2][i], board[3][i], board[4][i]) < 0 ||
      Math.max(board[0][0], board[1][1], board[2][2], board[3][3], board[4][4]) < 0
  );
}

function calculateScore({ winningBoard, currentDraw }) {
  let sum = 0;
  winningBoard.forEach(row => {
    row.forEach(number => {
      if (number > 0) {
        sum += number;
      }
    });
  });
  return sum * currentDraw;
}

function inputDataLines(filename = "input.txt", asInteger = false) {
  const lines = fs.readFileSync(filename).toString().trim().split("\n");
  return asInteger ? lines.map(x => parseInt(x)) : lines;
}

module.exports = {
  parseBingoSetup,
  playBingoAndGetWinningBoardAndNumber,
  playBingoAndGetLosingBoardAndNumber,
  getSolutionPart1,
  getSolutionPart2,
  inputDataLines,
};
