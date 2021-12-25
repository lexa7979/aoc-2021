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

  const highestMonadNumber = [5, 9, 6, 9, 2, 9, 9, 4, 9, 9, 4, 9, 9, 8];
  const result = runMainProgramOnInput(highestMonadNumber);
  if (!result.error) {
    return highestMonadNumber.join("");
  }
}

function getSolutionPart2() {
  const lines = Helpers.parseInputData();
  const setup = parseLinesIntoSetup(lines);

  const lowestMonadNumber = [1, 6, 1, 8, 1, 1, 1, 1, 6, 4, 1, 5, 2, 1];
  const result = runMainProgramOnInput(lowestMonadNumber);
  if (!result.error) {
    return lowestMonadNumber.join("");
  }
}

function parseLinesIntoSetup(lines) {
  const setup = {
    programBlocksByInput: [],
  };

  let currSubRoutine = null;
  let nextId = 1;

  lines.forEach(text => {
    if (!text) {
      return;
    }

    const match1 = /^inp (\w)$/.exec(text);
    if (match1) {
      currSubRoutine = [];
      setup.programBlocksByInput.push({ id: nextId++, inputArg: match1[1], subRoutine: currSubRoutine });
      return;
    }

    if (currSubRoutine == null) {
      throw new Error("Expect program to begin with inp-statement.");
    }

    const match2 = /^(add|mul|div|mod|eql) (\w) (-?\w+)$/.exec(text);
    if (match2) {
      currSubRoutine.push({
        command: match2[1],
        arg1: match2[2],
        arg2: String(parseInt(match2[3], 10)) === match2[3] ? parseInt(match2[3], 10) : match2[3],
      });
      return;
    }

    throw new Error(`Invalid input-line: ${text}`);
  });

  return setup;
}
function runSubroutineChangingStateInPlace({ program, state }) {
  const _readArg2 = arg2 => {
    if (typeof arg2 === "number") {
      return arg2;
    } else if (Object.keys(state).includes(arg2)) {
      return state[arg2];
    } else {
      throw new Error(`Unsupported arg2 (${arg2})`);
    }
  };

  for (let i = 0; i < program.length; i++) {
    const { command, arg1, arg2 } = program[i];
    switch (command) {
      case "add":
        state[arg1] += _readArg2(arg2);
        break;

      case "mul":
        state[arg1] *= _readArg2(arg2);
        break;

      case "div": {
        const divisor = _readArg2(arg2);
        if (divisor === 0) {
          return { error: "Division by zero", ...program[i], state };
        }
        const division = state[arg1] / divisor;
        state[arg1] = division < 0 ? Math.ceil(division) : Math.floor(division);
        break;
      }
      case "mod": {
        const divisor = _readArg2(arg2);
        if (state[arg1] < 0 || divisor <= 0) {
          return { error: "Invalid modulo operation", ...program[i], state };
        }
        state[arg1] %= divisor;
        break;
      }
      case "eql":
        state[arg1] = state[arg1] === _readArg2(arg2) ? 1 : 0;
        break;
    }
  }

  return { error: null };
}

function runProgramOnInputWorkingWithCacheInPlace({ setup, inputs, cache }) {
  const { programBlocksByInput } = setup;

  let state = { w: 0, x: 0, y: 0, z: 0 };
  const KNOWN_VARIABLES = ["w", "x", "y", "z"];

  const _readArg2 = arg2 => {
    if (typeof arg2 === "number") {
      return arg2;
    } else if (Object.keys(state).includes(arg2)) {
      return state[arg2];
    } else {
      throw new Error(`Unsupported arg2 (${arg2})`);
    }
  };

  if (inputs.length !== programBlocksByInput.length) {
    throw new Error(`Expected inputs to have length ${programBlocksByInput.length}: ${JSON.stringify(inputs)}`);
  }

  for (let i = 0; i < programBlocksByInput.length; i++) {
    const { id, inputArg, subRoutine } = programBlocksByInput[i];

    state[inputArg] = inputs[i];
    const stateString = KNOWN_VARIABLES.map(key => String(state[key])).join(",");

    const cached = cache.find(item => item.id === id && item.firstStateString === stateString);
    if (cached) {
      state = { ...cached.lastState };
    } else {
      runSubroutineChangingStateInPlace({ program: subRoutine, state });
      cache.push({ id, firstStateString: stateString, lastState: state });
    }
  }

  return state;
}

function runMainProgramOnInput(inputs) {
  const _inputs = typeof inputs === "string" ? inputs.split("").map(item => parseInt(item, 10)) : inputs;

  const lines = Helpers.parseInputData();
  const setup = parseLinesIntoSetup(lines);
  const cache = [];
  return runProgramOnInputWorkingWithCacheInPlace({ setup, inputs: _inputs, cache });
}

function shuffle(list) {
  const result = list.map(item => ({ item, pos: Math.random() }));
  result.sort((a, b) => a.pos - b.pos);
  return result.map(({ item }) => item);
}

function findHighestMonadNumber2() {
  const lines = Helpers.parseInputData();
  const setup = parseLinesIntoSetup(lines);

  let result;

  const _traverse = ({ nextInput, number = "", currSubRoutineIndex = 0, state = null }) => {
    if (result) {
      return;
    }
    if (currSubRoutineIndex >= setup.programBlocksByInput.length) {
      if (state.z === 0) {
        result = number;
      }
      return;
    }
    if (currSubRoutineIndex === 8) {
      console.log(number);
    }

    const { inputArg, subRoutine } = setup.programBlocksByInput[currSubRoutineIndex];

    const newState = state ? { ...state } : { w: 0, x: 0, y: 0, z: 0 };
    newState[inputArg] = nextInput;

    runSubroutineChangingStateInPlace({ program: subRoutine, state: newState });

    const newIndex = currSubRoutineIndex + 1;
    const newNumber = `${number}${nextInput}`;

    shuffle([9, 8, 7, 6, 5, 4, 3, 2, 1]).forEach(nextInput =>
      _traverse({ nextInput, number: newNumber, currSubRoutineIndex: newIndex, state: newState })
    );
  };

  shuffle([9, 8, 7, 6, 5, 4, 3, 2, 1]).forEach(nextInput => _traverse({ nextInput }));

  return result;
}

function findHighestMonadNumber() {
  const lines = Helpers.parseInputData();
  const setup = parseLinesIntoSetup(lines);

  const cache = [];

  for (let number = 99999999999999; number >= 10000000000000; number--) {
    if (number % 100000 === 0) {
      console.log(number);
    }
    if (!String(number).includes("0")) {
      // const result = runProgramOnInput({ setup, inputs: String(number).split("") });
      const result = runProgramOnInputWorkingWithCacheInPlace({ setup, inputs: String(number).split(""), cache });
      if (!result.error) {
        if (result.z === 0) {
          return number;
        }
      }
    }
  }
}

function findLowestMonadNumber() {
  const lines = Helpers.parseInputData();
  const setup = parseLinesIntoSetup(lines);

  const cache = [];

  for (let number = 11111111111111; number <= 99999999999999; number++) {
    // for (let number = 99999999999999; number >= 10000000000000; number--) {
    if (number % 100000 === 0) {
      console.log(number);
    }
    if (!String(number).includes("0")) {
      // const result = runProgramOnInput({ setup, inputs: String(number).split("") });
      const result = runProgramOnInputWorkingWithCacheInPlace({ setup, inputs: String(number).split(""), cache });
      if (!result.error) {
        if (result.z === 0) {
          return number;
        }
      }
    }
  }
}

module.exports = {
  getSolutionPart1,
  getSolutionPart2,

  parseLinesIntoSetup,
  runProgramOnInputWorkingWithCacheInPlace,
  runSubroutineChangingStateInPlace,
  runMainProgramOnInput,
};
