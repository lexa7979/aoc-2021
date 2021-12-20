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
  return countPixelsAfterDoubleEnhancement(setup);
}

function getSolutionPart2() {
  const lines = Helpers.parseInputData();
  const setup = parseLinesIntoSetup(lines);
  return countPixelsAfterSeveralDoubleEnhancements(setup, 25);
}

function parseLinesIntoSetup(lines) {
  const setup = {
    enhancement: null,
    lightPixelsByRow: {},
  };

  let nextRow = null;
  lines.forEach(text => {
    if (nextRow == null) {
      if (text.length === 512) {
        setup.enhancement = text;
        nextRow = 0;
      }
    } else if (text !== "") {
      if (!setup.lightPixelsByRow[nextRow]) {
        setup.lightPixelsByRow[nextRow] = [];
      }
      for (let currCol = 0; currCol < text.length; currCol++) {
        if (text[currCol] === "#") {
          setup.lightPixelsByRow[nextRow].push(currCol);
        }
      }
      nextRow++;
    }
  });

  return setup;
}

function isLightPixel(setup, pixelX, pixelY) {
  return setup.lightPixelsByRow[pixelY] && setup.lightPixelsByRow[pixelY].includes(pixelX);
}

function getImageDimension(setup) {
  let minX = null;
  let maxX = null;
  let minY = null;
  let maxY = null;

  const allRowNumbers = Object.keys(setup.lightPixelsByRow).map(text => parseInt(text, 10));
  for (let i = 0; i < allRowNumbers.length; i++) {
    const currY = allRowNumbers[i];
    const currRow = setup.lightPixelsByRow[currY];
    for (let k = 0; k < currRow.length; k++) {
      const currX = currRow[k];
      if (minX == null || currX < minX) {
        minX = currX;
      }
      if (maxX == null || currX > maxX) {
        maxX = currX;
      }
      if (minY == null || currY < minY) {
        minY = currY;
      }
      if (maxY == null || currY > maxY) {
        maxY = currY;
      }
    }
  }

  return { minX, maxX, minY, maxY };
}

function getEnhancement(setup, pixelX, pixelY) {
  const bits = [
    isLightPixel(setup, pixelX + 1, pixelY + 1),
    isLightPixel(setup, pixelX, pixelY + 1),
    isLightPixel(setup, pixelX - 1, pixelY + 1),
    isLightPixel(setup, pixelX + 1, pixelY),
    isLightPixel(setup, pixelX, pixelY),
    isLightPixel(setup, pixelX - 1, pixelY),
    isLightPixel(setup, pixelX + 1, pixelY - 1),
    isLightPixel(setup, pixelX, pixelY - 1),
    isLightPixel(setup, pixelX - 1, pixelY - 1),
  ];

  let value = 0;
  let bitValue = 1;
  bits.forEach(isOne => {
    if (isOne) {
      value += bitValue;
    }
    bitValue = bitValue << 1;
  });

  return setup.enhancement[value] === "#";
}

function getDoubleEnhancement(setup, pixelX, pixelY) {
  const bits = [
    getEnhancement(setup, pixelX + 1, pixelY + 1),
    getEnhancement(setup, pixelX, pixelY + 1),
    getEnhancement(setup, pixelX - 1, pixelY + 1),
    getEnhancement(setup, pixelX + 1, pixelY),
    getEnhancement(setup, pixelX, pixelY),
    getEnhancement(setup, pixelX - 1, pixelY),
    getEnhancement(setup, pixelX + 1, pixelY - 1),
    getEnhancement(setup, pixelX, pixelY - 1),
    getEnhancement(setup, pixelX - 1, pixelY - 1),
  ];

  let value = 0;
  let bitValue = 1;
  bits.forEach(isOne => {
    if (isOne) {
      value += bitValue;
    }
    bitValue = bitValue << 1;
  });

  return setup.enhancement[value] === "#";
}

function countPixelsAfterDoubleEnhancement(setup) {
  const { minX, maxX, minY, maxY } = getImageDimension(setup);

  let result = 0;
  for (let x = minX - 2; x <= maxX + 2; x++) {
    for (let y = minY - 2; y <= maxY + 2; y++) {
      if (getDoubleEnhancement(setup, x, y)) {
        result++;
      }
    }
  }
  return result;
}

function countPixelsAfterSeveralDoubleEnhancements(setup, numDoubleEnhancements) {
  const _setup = { ...setup };

  for (let i = 0; i < numDoubleEnhancements; i++) {
    const { minX, maxX, minY, maxY } = getImageDimension(_setup);

    const lightPixelsByRow = {};
    for (let x = minX - 2; x <= maxX + 2; x++) {
      for (let y = minY - 2; y <= maxY + 2; y++) {
        if (getDoubleEnhancement(_setup, x, y)) {
          if (!lightPixelsByRow[y]) {
            lightPixelsByRow[y] = [x];
          } else {
            lightPixelsByRow[y].push(x);
          }
        }
      }
    }

    _setup.lightPixelsByRow = lightPixelsByRow;
  }

  let result = 0;
  Object.values(_setup.lightPixelsByRow).forEach(pixelsInRow => {
    result += pixelsInRow.length;
  });
  return result;
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2,

  parseLinesIntoSetup,
  getImageDimension,
  getEnhancement,
  getDoubleEnhancement,
  countPixelsAfterDoubleEnhancement,
  countPixelsAfterSeveralDoubleEnhancements,
};
