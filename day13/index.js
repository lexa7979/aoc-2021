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
  const setup = parseLinesIntoFoldingSetup(lines);
  return getNumberOfDotsAfterFirstFolding(setup);
}

function getSolutionPart2() {
  const lines = Helpers.parseInputData();
  const setup = parseLinesIntoFoldingSetup(lines);
  const dots = getDotsAfterAllFolding(setup);
  return paintDots(dots);
}

function parseLinesIntoFoldingSetup(lines) {
  const setup = {
    dots: [],
    foldings: [],
  };
  lines.forEach(text => {
    const match1 = /^(\d+),(\d+)$/.exec(text);
    if (match1) {
      setup.dots.push([parseInt(match1[1], 10), parseInt(match1[2], 10)]);
      return;
    }
    const match2 = /^fold along (\w)=(\d+)$/.exec(text);
    if (match2) {
      setup.foldings.push([match2[1], parseInt(match2[2])]);
    }
  });
  return setup;
}

function getNumberOfDotsAfterFirstFolding(setup) {
  const { foldings } = setup;
  let dots = [...setup.dots];
  const [axisDirection, axisPosition] = foldings[0];
  if (axisDirection === "x") {
    dots.forEach(([x, y], index) => {
      if (x > axisPosition) {
        dots[index] = [axisPosition - (x - axisPosition), y];
      }
    });
  }
  if (axisDirection === "y") {
    dots.forEach(([x, y], index) => {
      if (y > axisPosition) {
        dots[index] = [x, axisPosition - (y - axisPosition)];
      }
    });
  }
  dots = dots.filter(([x, y], index) => dots.findIndex(item => item[0] === x && item[1] === y) === index);
  return dots.length;
}

function getDotsAfterAllFolding(setup) {
  const { foldings } = setup;
  let dots = [...setup.dots];
  foldings.forEach(([axisDirection, axisPosition]) => {
    if (axisDirection === "x") {
      dots.forEach(([x, y], index) => {
        if (x > axisPosition) {
          dots[index] = [axisPosition - (x - axisPosition), y];
        }
      });
    }
    if (axisDirection === "y") {
      dots.forEach(([x, y], index) => {
        if (y > axisPosition) {
          dots[index] = [x, axisPosition - (y - axisPosition)];
        }
      });
    }
    const newDots = dots.filter(([x, y], index) => dots.findIndex(item => item[0] === x && item[1] === y) === index);
    dots = newDots;
  });
  return dots;
}

function paintDots(dots) {
  const sizeX = Math.max(...dots.map(item => item[0]));
  const sizeY = Math.max(...dots.map(item => item[1]));
  const rows = [];
  for (let row = 0; row <= sizeY; row++) {
    let rowContent = "";
    for (let col = 0; col <= sizeX; col++) {
      if (dots.some(item => item[0] === col && item[1] === row)) {
        rowContent += "#";
      } else {
        rowContent += " ";
      }
    }
    rows.push(rowContent);
  }
  return "\n> " + rows.join("\n> ");
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2,

  parseLinesIntoFoldingSetup,
  getNumberOfDotsAfterFirstFolding,
};
