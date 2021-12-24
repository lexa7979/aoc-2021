const fs = require("fs");

const Global = {
  parseOptions: { transformMatch: null, asInteger: false },
};

function setParseOptions({ transformMatch, asInteger }) {
  Global.parseOptions = { transformMatch, asInteger };
}

function parseInputData(lines = null) {
  const { transformMatch, asInteger } = Global.parseOptions;
  const _lines = lines || _getInputFile();
  if (transformMatch) {
    const matchedLines = _lines.map(text => transformMatch.exec(text));
    if (matchedLines.some(match => !match)) {
      throw new Error(`Failed to parse line "${_lines[matchedLines.findIndex(match => !match)]}"`);
    }
    if (Array.isArray(asInteger)) {
      return matchedLines.map(match =>
        match.slice(1).map((text, index) => (asInteger.includes(index + 1) ? parseInt(text, 10) : text))
      );
    }
    return asInteger
      ? matchedLines.map(match => match.slice(1).map(text => parseInt(text, 10)))
      : matchedLines.map(match => match.slice(1));
  }
  return asInteger ? _lines.map(text => parseInt(text, 10)) : _lines;
}

function _getInputFile() {
  return fs.readFileSync("input.txt").toString().trim().split("\n");
}

function getArrayRange(first, last) {
  if (first <= last) {
    return Array(last - first + 1)
      .fill()
      .map((_, index) => first + index);
  }
  return Array(first - last + 1)
    .fill()
    .map((_, index) => first - index);
}

module.exports = {
  setParseOptions,
  parseInputData,
  getArrayRange,
};
