// @ts-check

const Constants = require("./constants");

describe("AnyPathBetweenTwoPositions", () => {
  const { AnyPathBetweenTwoPositions } = Constants;
  it("has expected content", () => {
    expect(AnyPathBetweenTwoPositions).toEqual({
      "hall-1": {
        "hall-2": ["hall-1", "hall-2"],
        "hall-3": ["hall-1", "hall-2", null, "hall-3"],
        "hall-4": ["hall-1", "hall-2", null, "hall-3", null, "hall-4"],
        "hall-5": ["hall-1", "hall-2", null, "hall-3", null, "hall-4", null, "hall-5"],
        "hall-6": ["hall-1", "hall-2", null, "hall-3", null, "hall-4", null, "hall-5", null, "hall-6"],
        "hall-7": ["hall-1", "hall-2", null, "hall-3", null, "hall-4", null, "hall-5", null, "hall-6", "hall-7"],
        "room-1": ["hall-1", "hall-2", null, "room-1-door", "room-1"],
        "room-1-door": ["hall-1", "hall-2", null, "room-1-door"],
        "room-2": ["hall-1", "hall-2", null, "hall-3", null, "room-2-door", "room-2"],
        "room-2-door": ["hall-1", "hall-2", null, "hall-3", null, "room-2-door"],
        "room-3": ["hall-1", "hall-2", null, "hall-3", null, "hall-4", null, "room-3-door", "room-3"],
        "room-3-door": ["hall-1", "hall-2", null, "hall-3", null, "hall-4", null, "room-3-door"],
        "room-4": ["hall-1", "hall-2", null, "hall-3", null, "hall-4", null, "hall-5", null, "room-4-door", "room-4"],
        "room-4-door": ["hall-1", "hall-2", null, "hall-3", null, "hall-4", null, "hall-5", null, "room-4-door"],
      },
      "hall-2": {
        "hall-1": ["hall-2", "hall-1"],
        "hall-3": ["hall-2", null, "hall-3"],
        "hall-4": ["hall-2", null, "hall-3", null, "hall-4"],
        "hall-5": ["hall-2", null, "hall-3", null, "hall-4", null, "hall-5"],
        "hall-6": ["hall-2", null, "hall-3", null, "hall-4", null, "hall-5", null, "hall-6"],
        "hall-7": ["hall-2", null, "hall-3", null, "hall-4", null, "hall-5", null, "hall-6", "hall-7"],
        "room-1": ["hall-2", null, "room-1-door", "room-1"],
        "room-1-door": ["hall-2", null, "room-1-door"],
        "room-2": ["hall-2", null, "hall-3", null, "room-2-door", "room-2"],
        "room-2-door": ["hall-2", null, "hall-3", null, "room-2-door"],
        "room-3": ["hall-2", null, "hall-3", null, "hall-4", null, "room-3-door", "room-3"],
        "room-3-door": ["hall-2", null, "hall-3", null, "hall-4", null, "room-3-door"],
        "room-4": ["hall-2", null, "hall-3", null, "hall-4", null, "hall-5", null, "room-4-door", "room-4"],
        "room-4-door": ["hall-2", null, "hall-3", null, "hall-4", null, "hall-5", null, "room-4-door"],
      },
      "hall-3": {
        "hall-1": ["hall-3", null, "hall-2", "hall-1"],
        "hall-2": ["hall-3", null, "hall-2"],
        "hall-4": ["hall-3", null, "hall-4"],
        "hall-5": ["hall-3", null, "hall-4", null, "hall-5"],
        "hall-6": ["hall-3", null, "hall-4", null, "hall-5", null, "hall-6"],
        "hall-7": ["hall-3", null, "hall-4", null, "hall-5", null, "hall-6", "hall-7"],
        "room-1": ["hall-3", null, "room-1-door", "room-1"],
        "room-1-door": ["hall-3", null, "room-1-door"],
        "room-2": ["hall-3", null, "room-2-door", "room-2"],
        "room-2-door": ["hall-3", null, "room-2-door"],
        "room-3": ["hall-3", null, "hall-4", null, "room-3-door", "room-3"],
        "room-3-door": ["hall-3", null, "hall-4", null, "room-3-door"],
        "room-4": ["hall-3", null, "hall-4", null, "hall-5", null, "room-4-door", "room-4"],
        "room-4-door": ["hall-3", null, "hall-4", null, "hall-5", null, "room-4-door"],
      },
      "hall-4": {
        "hall-1": ["hall-4", null, "hall-3", null, "hall-2", "hall-1"],
        "hall-2": ["hall-4", null, "hall-3", null, "hall-2"],
        "hall-3": ["hall-4", null, "hall-3"],
        "hall-5": ["hall-4", null, "hall-5"],
        "hall-6": ["hall-4", null, "hall-5", null, "hall-6"],
        "hall-7": ["hall-4", null, "hall-5", null, "hall-6", "hall-7"],
        "room-1": ["hall-4", null, "hall-3", null, "room-1-door", "room-1"],
        "room-1-door": ["hall-4", null, "hall-3", null, "room-1-door"],
        "room-2": ["hall-4", null, "room-2-door", "room-2"],
        "room-2-door": ["hall-4", null, "room-2-door"],
        "room-3": ["hall-4", null, "room-3-door", "room-3"],
        "room-3-door": ["hall-4", null, "room-3-door"],
        "room-4": ["hall-4", null, "hall-5", null, "room-4-door", "room-4"],
        "room-4-door": ["hall-4", null, "hall-5", null, "room-4-door"],
      },
      "hall-5": {
        "hall-1": ["hall-5", null, "hall-4", null, "hall-3", null, "hall-2", "hall-1"],
        "hall-2": ["hall-5", null, "hall-4", null, "hall-3", null, "hall-2"],
        "hall-3": ["hall-5", null, "hall-4", null, "hall-3"],
        "hall-4": ["hall-5", null, "hall-4"],
        "hall-6": ["hall-5", null, "hall-6"],
        "hall-7": ["hall-5", null, "hall-6", "hall-7"],
        "room-1": ["hall-5", null, "hall-4", null, "hall-3", null, "room-1-door", "room-1"],
        "room-1-door": ["hall-5", null, "hall-4", null, "hall-3", null, "room-1-door"],
        "room-2": ["hall-5", null, "hall-4", null, "room-2-door", "room-2"],
        "room-2-door": ["hall-5", null, "hall-4", null, "room-2-door"],
        "room-3": ["hall-5", null, "room-3-door", "room-3"],
        "room-3-door": ["hall-5", null, "room-3-door"],
        "room-4": ["hall-5", null, "room-4-door", "room-4"],
        "room-4-door": ["hall-5", null, "room-4-door"],
      },
      "hall-6": {
        "hall-1": ["hall-6", null, "hall-5", null, "hall-4", null, "hall-3", null, "hall-2", "hall-1"],
        "hall-2": ["hall-6", null, "hall-5", null, "hall-4", null, "hall-3", null, "hall-2"],
        "hall-3": ["hall-6", null, "hall-5", null, "hall-4", null, "hall-3"],
        "hall-4": ["hall-6", null, "hall-5", null, "hall-4"],
        "hall-5": ["hall-6", null, "hall-5"],
        "hall-7": ["hall-6", "hall-7"],
        "room-1": ["hall-6", null, "hall-5", null, "hall-4", null, "hall-3", null, "room-1-door", "room-1"],
        "room-1-door": ["hall-6", null, "hall-5", null, "hall-4", null, "hall-3", null, "room-1-door"],
        "room-2": ["hall-6", null, "hall-5", null, "hall-4", null, "room-2-door", "room-2"],
        "room-2-door": ["hall-6", null, "hall-5", null, "hall-4", null, "room-2-door"],
        "room-3": ["hall-6", null, "hall-5", null, "room-3-door", "room-3"],
        "room-3-door": ["hall-6", null, "hall-5", null, "room-3-door"],
        "room-4": ["hall-6", null, "room-4-door", "room-4"],
        "room-4-door": ["hall-6", null, "room-4-door"],
      },
      "hall-7": {
        "hall-1": ["hall-7", "hall-6", null, "hall-5", null, "hall-4", null, "hall-3", null, "hall-2", "hall-1"],
        "hall-2": ["hall-7", "hall-6", null, "hall-5", null, "hall-4", null, "hall-3", null, "hall-2"],
        "hall-3": ["hall-7", "hall-6", null, "hall-5", null, "hall-4", null, "hall-3"],
        "hall-4": ["hall-7", "hall-6", null, "hall-5", null, "hall-4"],
        "hall-5": ["hall-7", "hall-6", null, "hall-5"],
        "hall-6": ["hall-7", "hall-6"],
        "room-1": ["hall-7", "hall-6", null, "hall-5", null, "hall-4", null, "hall-3", null, "room-1-door", "room-1"],
        "room-1-door": ["hall-7", "hall-6", null, "hall-5", null, "hall-4", null, "hall-3", null, "room-1-door"],
        "room-2": ["hall-7", "hall-6", null, "hall-5", null, "hall-4", null, "room-2-door", "room-2"],
        "room-2-door": ["hall-7", "hall-6", null, "hall-5", null, "hall-4", null, "room-2-door"],
        "room-3": ["hall-7", "hall-6", null, "hall-5", null, "room-3-door", "room-3"],
        "room-3-door": ["hall-7", "hall-6", null, "hall-5", null, "room-3-door"],
        "room-4": ["hall-7", "hall-6", null, "room-4-door", "room-4"],
        "room-4-door": ["hall-7", "hall-6", null, "room-4-door"],
      },
      "room-1": {
        "hall-1": ["room-1", "room-1-door", null, "hall-2", "hall-1"],
        "hall-2": ["room-1", "room-1-door", null, "hall-2"],
        "hall-3": ["room-1", "room-1-door", null, "hall-3"],
        "hall-4": ["room-1", "room-1-door", null, "hall-3", null, "hall-4"],
        "hall-5": ["room-1", "room-1-door", null, "hall-3", null, "hall-4", null, "hall-5"],
        "hall-6": ["room-1", "room-1-door", null, "hall-3", null, "hall-4", null, "hall-5", null, "hall-6"],
        "hall-7": ["room-1", "room-1-door", null, "hall-3", null, "hall-4", null, "hall-5", null, "hall-6", "hall-7"],
        "room-1-door": ["room-1", "room-1-door"],
        "room-2": ["room-1", "room-1-door", null, "hall-3", null, "room-2-door", "room-2"],
        "room-2-door": ["room-1", "room-1-door", null, "hall-3", null, "room-2-door"],
        "room-3": ["room-1", "room-1-door", null, "hall-3", null, "hall-4", null, "room-3-door", "room-3"],
        "room-3-door": ["room-1", "room-1-door", null, "hall-3", null, "hall-4", null, "room-3-door"],
        "room-4": [
          "room-1",
          "room-1-door",
          null,
          "hall-3",
          null,
          "hall-4",
          null,
          "hall-5",
          null,
          "room-4-door",
          "room-4",
        ],
        "room-4-door": ["room-1", "room-1-door", null, "hall-3", null, "hall-4", null, "hall-5", null, "room-4-door"],
      },
      "room-1-door": {
        "hall-1": ["room-1-door", null, "hall-2", "hall-1"],
        "hall-2": ["room-1-door", null, "hall-2"],
        "hall-3": ["room-1-door", null, "hall-3"],
        "hall-4": ["room-1-door", null, "hall-3", null, "hall-4"],
        "hall-5": ["room-1-door", null, "hall-3", null, "hall-4", null, "hall-5"],
        "hall-6": ["room-1-door", null, "hall-3", null, "hall-4", null, "hall-5", null, "hall-6"],
        "hall-7": ["room-1-door", null, "hall-3", null, "hall-4", null, "hall-5", null, "hall-6", "hall-7"],
        "room-1": ["room-1-door", "room-1"],
        "room-2": ["room-1-door", null, "hall-3", null, "room-2-door", "room-2"],
        "room-2-door": ["room-1-door", null, "hall-3", null, "room-2-door"],
        "room-3": ["room-1-door", null, "hall-3", null, "hall-4", null, "room-3-door", "room-3"],
        "room-3-door": ["room-1-door", null, "hall-3", null, "hall-4", null, "room-3-door"],
        "room-4": ["room-1-door", null, "hall-3", null, "hall-4", null, "hall-5", null, "room-4-door", "room-4"],
        "room-4-door": ["room-1-door", null, "hall-3", null, "hall-4", null, "hall-5", null, "room-4-door"],
      },
      "room-2": {
        "hall-1": ["room-2", "room-2-door", null, "hall-3", null, "hall-2", "hall-1"],
        "hall-2": ["room-2", "room-2-door", null, "hall-3", null, "hall-2"],
        "hall-3": ["room-2", "room-2-door", null, "hall-3"],
        "hall-4": ["room-2", "room-2-door", null, "hall-4"],
        "hall-5": ["room-2", "room-2-door", null, "hall-4", null, "hall-5"],
        "hall-6": ["room-2", "room-2-door", null, "hall-4", null, "hall-5", null, "hall-6"],
        "hall-7": ["room-2", "room-2-door", null, "hall-4", null, "hall-5", null, "hall-6", "hall-7"],
        "room-1": ["room-2", "room-2-door", null, "hall-3", null, "room-1-door", "room-1"],
        "room-1-door": ["room-2", "room-2-door", null, "hall-3", null, "room-1-door"],
        "room-2-door": ["room-2", "room-2-door"],
        "room-3": ["room-2", "room-2-door", null, "hall-4", null, "room-3-door", "room-3"],
        "room-3-door": ["room-2", "room-2-door", null, "hall-4", null, "room-3-door"],
        "room-4": ["room-2", "room-2-door", null, "hall-4", null, "hall-5", null, "room-4-door", "room-4"],
        "room-4-door": ["room-2", "room-2-door", null, "hall-4", null, "hall-5", null, "room-4-door"],
      },
      "room-2-door": {
        "hall-1": ["room-2-door", null, "hall-3", null, "hall-2", "hall-1"],
        "hall-2": ["room-2-door", null, "hall-3", null, "hall-2"],
        "hall-3": ["room-2-door", null, "hall-3"],
        "hall-4": ["room-2-door", null, "hall-4"],
        "hall-5": ["room-2-door", null, "hall-4", null, "hall-5"],
        "hall-6": ["room-2-door", null, "hall-4", null, "hall-5", null, "hall-6"],
        "hall-7": ["room-2-door", null, "hall-4", null, "hall-5", null, "hall-6", "hall-7"],
        "room-1": ["room-2-door", null, "hall-3", null, "room-1-door", "room-1"],
        "room-1-door": ["room-2-door", null, "hall-3", null, "room-1-door"],
        "room-2": ["room-2-door", "room-2"],
        "room-3": ["room-2-door", null, "hall-4", null, "room-3-door", "room-3"],
        "room-3-door": ["room-2-door", null, "hall-4", null, "room-3-door"],
        "room-4": ["room-2-door", null, "hall-4", null, "hall-5", null, "room-4-door", "room-4"],
        "room-4-door": ["room-2-door", null, "hall-4", null, "hall-5", null, "room-4-door"],
      },
      "room-3": {
        "hall-1": ["room-3", "room-3-door", null, "hall-4", null, "hall-3", null, "hall-2", "hall-1"],
        "hall-2": ["room-3", "room-3-door", null, "hall-4", null, "hall-3", null, "hall-2"],
        "hall-3": ["room-3", "room-3-door", null, "hall-4", null, "hall-3"],
        "hall-4": ["room-3", "room-3-door", null, "hall-4"],
        "hall-5": ["room-3", "room-3-door", null, "hall-5"],
        "hall-6": ["room-3", "room-3-door", null, "hall-5", null, "hall-6"],
        "hall-7": ["room-3", "room-3-door", null, "hall-5", null, "hall-6", "hall-7"],
        "room-1": ["room-3", "room-3-door", null, "hall-4", null, "hall-3", null, "room-1-door", "room-1"],
        "room-1-door": ["room-3", "room-3-door", null, "hall-4", null, "hall-3", null, "room-1-door"],
        "room-2": ["room-3", "room-3-door", null, "hall-4", null, "room-2-door", "room-2"],
        "room-2-door": ["room-3", "room-3-door", null, "hall-4", null, "room-2-door"],
        "room-3-door": ["room-3", "room-3-door"],
        "room-4": ["room-3", "room-3-door", null, "hall-5", null, "room-4-door", "room-4"],
        "room-4-door": ["room-3", "room-3-door", null, "hall-5", null, "room-4-door"],
      },
      "room-3-door": {
        "hall-1": ["room-3-door", null, "hall-4", null, "hall-3", null, "hall-2", "hall-1"],
        "hall-2": ["room-3-door", null, "hall-4", null, "hall-3", null, "hall-2"],
        "hall-3": ["room-3-door", null, "hall-4", null, "hall-3"],
        "hall-4": ["room-3-door", null, "hall-4"],
        "hall-5": ["room-3-door", null, "hall-5"],
        "hall-6": ["room-3-door", null, "hall-5", null, "hall-6"],
        "hall-7": ["room-3-door", null, "hall-5", null, "hall-6", "hall-7"],
        "room-1": ["room-3-door", null, "hall-4", null, "hall-3", null, "room-1-door", "room-1"],
        "room-1-door": ["room-3-door", null, "hall-4", null, "hall-3", null, "room-1-door"],
        "room-2": ["room-3-door", null, "hall-4", null, "room-2-door", "room-2"],
        "room-2-door": ["room-3-door", null, "hall-4", null, "room-2-door"],
        "room-3": ["room-3-door", "room-3"],
        "room-4": ["room-3-door", null, "hall-5", null, "room-4-door", "room-4"],
        "room-4-door": ["room-3-door", null, "hall-5", null, "room-4-door"],
      },
      "room-4": {
        "hall-1": ["room-4", "room-4-door", null, "hall-5", null, "hall-4", null, "hall-3", null, "hall-2", "hall-1"],
        "hall-2": ["room-4", "room-4-door", null, "hall-5", null, "hall-4", null, "hall-3", null, "hall-2"],
        "hall-3": ["room-4", "room-4-door", null, "hall-5", null, "hall-4", null, "hall-3"],
        "hall-4": ["room-4", "room-4-door", null, "hall-5", null, "hall-4"],
        "hall-5": ["room-4", "room-4-door", null, "hall-5"],
        "hall-6": ["room-4", "room-4-door", null, "hall-6"],
        "hall-7": ["room-4", "room-4-door", null, "hall-6", "hall-7"],
        "room-1": [
          "room-4",
          "room-4-door",
          null,
          "hall-5",
          null,
          "hall-4",
          null,
          "hall-3",
          null,
          "room-1-door",
          "room-1",
        ],
        "room-1-door": ["room-4", "room-4-door", null, "hall-5", null, "hall-4", null, "hall-3", null, "room-1-door"],
        "room-2": ["room-4", "room-4-door", null, "hall-5", null, "hall-4", null, "room-2-door", "room-2"],
        "room-2-door": ["room-4", "room-4-door", null, "hall-5", null, "hall-4", null, "room-2-door"],
        "room-3": ["room-4", "room-4-door", null, "hall-5", null, "room-3-door", "room-3"],
        "room-3-door": ["room-4", "room-4-door", null, "hall-5", null, "room-3-door"],
        "room-4-door": ["room-4", "room-4-door"],
      },
      "room-4-door": {
        "hall-1": ["room-4-door", null, "hall-5", null, "hall-4", null, "hall-3", null, "hall-2", "hall-1"],
        "hall-2": ["room-4-door", null, "hall-5", null, "hall-4", null, "hall-3", null, "hall-2"],
        "hall-3": ["room-4-door", null, "hall-5", null, "hall-4", null, "hall-3"],
        "hall-4": ["room-4-door", null, "hall-5", null, "hall-4"],
        "hall-5": ["room-4-door", null, "hall-5"],
        "hall-6": ["room-4-door", null, "hall-6"],
        "hall-7": ["room-4-door", null, "hall-6", "hall-7"],
        "room-1": ["room-4-door", null, "hall-5", null, "hall-4", null, "hall-3", null, "room-1-door", "room-1"],
        "room-1-door": ["room-4-door", null, "hall-5", null, "hall-4", null, "hall-3", null, "room-1-door"],
        "room-2": ["room-4-door", null, "hall-5", null, "hall-4", null, "room-2-door", "room-2"],
        "room-2-door": ["room-4-door", null, "hall-5", null, "hall-4", null, "room-2-door"],
        "room-3": ["room-4-door", null, "hall-5", null, "room-3-door", "room-3"],
        "room-3-door": ["room-4-door", null, "hall-5", null, "room-3-door"],
        "room-4": ["room-4-door", "room-4"],
      },
    });
  });
});
