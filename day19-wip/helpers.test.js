const Helpers = require("./helpers");

describe.skip("getArrayRange", () => {
  const { getArrayRange } = Helpers;
  it("works as expected", () => {
    expect(getArrayRange(3, 6)).toEqual([3, 4, 5, 6]);
    expect(getArrayRange(7, 6)).toEqual([7, 6]);
    expect(getArrayRange(5, 5)).toEqual([5]);
  });
});

describe.skip("parseInputData", () => {
  const { parseInputData, setParseOptions } = Helpers;

  it("- when not using transformMatch and asInteger - works as expected", () => {
    setParseOptions({ transformMatch: null, asInteger: false });
    const result = parseInputData(["forward 12", "up 7"]);
    expect(result).toEqual(["forward 12", "up 7"]);
  });

  it("- when not using transformMatch, but asInteger - works as expected", () => {
    setParseOptions({ transformMatch: null, asInteger: true });
    const result = parseInputData(["12", "7"]);
    expect(result).toEqual([12, 7]);
  });

  it("- when using transformMatch and asInteger - works as expected", () => {
    setParseOptions({ transformMatch: /^(\d+),(\d+)$/, asInteger: true });
    const result = parseInputData(["79,12", "54,7"]);
    expect(result).toEqual([
      [79, 12],
      [54, 7],
    ]);
  });

  it("- when using transformMatch and asInteger is an array - works as expected", () => {
    setParseOptions({ transformMatch: /^(\w+) (\d+)$/, asInteger: [2] });
    const result = parseInputData(["forward 12", "up 7"]);
    expect(result).toEqual([
      ["forward", 12],
      ["up", 7],
    ]);
  });

  it("- when using transformMath - FAILS if matching fails", () => {
    setParseOptions({ transformMatch: /^(\w+) (\d+)$/, asInteger: false });
    expect(() => parseInputData(["forward 12", "up 7", "down w/o number"])).toThrow("Failed to parse line");
  });
});
