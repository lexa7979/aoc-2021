// @ts-check

const Constants = require("./constants");

describe("AnyPathBetweenTwoPositions", () => {
  const { AnyPathBetweenTwoPositions, Positions } = Constants;
  it("has expected content", () => {
    expect(Object.keys(AnyPathBetweenTwoPositions)).toEqual(Object.values(Positions));
    expect(AnyPathBetweenTwoPositions[Positions.HALLWAY_LEFT_SIDE]).toEqual({
      "hall-1": ["hall-2", "hall-1"],
      "hall-3": ["hall-2", null, "hall-3"],
      "hall-4": ["hall-2", null, "hall-3", null, "hall-4"],
      "hall-5": ["hall-2", null, "hall-3", null, "hall-4", null, "hall-5"],
      "hall-6": ["hall-2", null, "hall-3", null, "hall-4", null, "hall-5", null, "hall-6"],
      "hall-7": ["hall-2", null, "hall-3", null, "hall-4", null, "hall-5", null, "hall-6", "hall-7"],
      "room-1-door": ["hall-2", null, "room-1-door"],
      "room-1-window": ["hall-2", null, "room-1-door", "room-1-window"],
      "room-2-door": ["hall-2", null, "hall-3", null, "room-2-door"],
      "room-2-window": ["hall-2", null, "hall-3", null, "room-2-door", "room-2-window"],
      "room-3-door": ["hall-2", null, "hall-3", null, "hall-4", null, "room-3-door"],
      "room-3-window": ["hall-2", null, "hall-3", null, "hall-4", null, "room-3-door", "room-3-window"],
      "room-4-door": ["hall-2", null, "hall-3", null, "hall-4", null, "hall-5", null, "room-4-door"],
      "room-4-window": ["hall-2", null, "hall-3", null, "hall-4", null, "hall-5", null, "room-4-door", "room-4-window"],
    });
    expect(AnyPathBetweenTwoPositions[Positions.ROOM_3_DOOR]).toEqual({
      "hall-1": ["room-3-door", null, "hall-4", null, "hall-3", null, "hall-2", "hall-1"],
      "hall-2": ["room-3-door", null, "hall-4", null, "hall-3", null, "hall-2"],
      "hall-3": ["room-3-door", null, "hall-4", null, "hall-3"],
      "hall-4": ["room-3-door", null, "hall-4"],
      "hall-5": ["room-3-door", null, "hall-5"],
      "hall-6": ["room-3-door", null, "hall-5", null, "hall-6"],
      "hall-7": ["room-3-door", null, "hall-5", null, "hall-6", "hall-7"],
      "room-1-door": ["room-3-door", null, "hall-4", null, "hall-3", null, "room-1-door"],
      "room-1-window": ["room-3-door", null, "hall-4", null, "hall-3", null, "room-1-door", "room-1-window"],
      "room-2-door": ["room-3-door", null, "hall-4", null, "room-2-door"],
      "room-2-window": ["room-3-door", null, "hall-4", null, "room-2-door", "room-2-window"],
      "room-3-window": ["room-3-door", "room-3-window"],
      "room-4-door": ["room-3-door", null, "hall-5", null, "room-4-door"],
      "room-4-window": ["room-3-door", null, "hall-5", null, "room-4-door", "room-4-window"],
    });
  });
});

describe("AnyPathBetweenTwoPositionsExtended", () => {
  const { AnyPathBetweenTwoPositionsExtended, Positions, AdditionalPositions } = Constants;
  it("has expected content", () => {
    expect(Object.keys(AnyPathBetweenTwoPositionsExtended)).toEqual([
      ...Object.values(Positions),
      ...Object.values(AdditionalPositions),
    ]);
    expect(AnyPathBetweenTwoPositionsExtended[AdditionalPositions.ROOM_4_BEHIND_DOOR]).toEqual({
      "hall-1": ["room-4-1", "room-4-door", null, "hall-5", null, "hall-4", null, "hall-3", null, "hall-2", "hall-1"],
      "hall-2": ["room-4-1", "room-4-door", null, "hall-5", null, "hall-4", null, "hall-3", null, "hall-2"],
      "hall-3": ["room-4-1", "room-4-door", null, "hall-5", null, "hall-4", null, "hall-3"],
      "hall-4": ["room-4-1", "room-4-door", null, "hall-5", null, "hall-4"],
      "hall-5": ["room-4-1", "room-4-door", null, "hall-5"],
      "hall-6": ["room-4-1", "room-4-door", null, "hall-6"],
      "hall-7": ["room-4-1", "room-4-door", null, "hall-6", "hall-7"],
      "room-1-1": [
        "room-4-1",
        "room-4-door",
        null,
        "hall-5",
        null,
        "hall-4",
        null,
        "hall-3",
        null,
        "room-1-door",
        "room-1-1",
      ],
      "room-1-2": [
        "room-4-1",
        "room-4-door",
        null,
        "hall-5",
        null,
        "hall-4",
        null,
        "hall-3",
        null,
        "room-1-door",
        "room-1-1",
        "room-1-2",
      ],
      "room-1-door": ["room-4-1", "room-4-door", null, "hall-5", null, "hall-4", null, "hall-3", null, "room-1-door"],
      "room-1-window": [
        "room-4-1",
        "room-4-door",
        null,
        "hall-5",
        null,
        "hall-4",
        null,
        "hall-3",
        null,
        "room-1-door",
        "room-1-1",
        "room-1-2",
        "room-1-window",
      ],
      "room-2-1": ["room-4-1", "room-4-door", null, "hall-5", null, "hall-4", null, "room-2-door", "room-2-1"],
      "room-2-2": [
        "room-4-1",
        "room-4-door",
        null,
        "hall-5",
        null,
        "hall-4",
        null,
        "room-2-door",
        "room-2-1",
        "room-2-2",
      ],
      "room-2-door": ["room-4-1", "room-4-door", null, "hall-5", null, "hall-4", null, "room-2-door"],
      "room-2-window": [
        "room-4-1",
        "room-4-door",
        null,
        "hall-5",
        null,
        "hall-4",
        null,
        "room-2-door",
        "room-2-1",
        "room-2-2",
        "room-2-window",
      ],
      "room-3-1": ["room-4-1", "room-4-door", null, "hall-5", null, "room-3-door", "room-3-1"],
      "room-3-2": ["room-4-1", "room-4-door", null, "hall-5", null, "room-3-door", "room-3-1", "room-3-2"],
      "room-3-door": ["room-4-1", "room-4-door", null, "hall-5", null, "room-3-door"],
      "room-3-window": [
        "room-4-1",
        "room-4-door",
        null,
        "hall-5",
        null,
        "room-3-door",
        "room-3-1",
        "room-3-2",
        "room-3-window",
      ],
      "room-4-2": ["room-4-1", "room-4-2"],
      "room-4-door": ["room-4-1", "room-4-door"],
      "room-4-window": ["room-4-1", "room-4-window"],
    });
  });
});
