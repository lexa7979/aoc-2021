const Import = require("./index");
const Helpers = require("./helpers");

const testData = [
  //
  "1163751742",
  "1381373672",
  "2136511328",
  "3694931569",
  "7463417111",
  "1319128137",
  "1359912421",
  "3125421639",
  "1293138521",
  "2311944581",
];

const testSetup = [
  [1, 1, 6, 3, 7, 5, 1, 7, 4, 2],
  [1, 3, 8, 1, 3, 7, 3, 6, 7, 2],
  [2, 1, 3, 6, 5, 1, 1, 3, 2, 8],
  [3, 6, 9, 4, 9, 3, 1, 5, 6, 9],
  [7, 4, 6, 3, 4, 1, 7, 1, 1, 1],
  [1, 3, 1, 9, 1, 2, 8, 1, 3, 7],
  [1, 3, 5, 9, 9, 1, 2, 4, 2, 1],
  [3, 1, 2, 5, 4, 2, 1, 6, 3, 9],
  [1, 2, 9, 3, 1, 3, 8, 5, 2, 1],
  [2, 3, 1, 1, 9, 4, 4, 5, 8, 1],
];

const testSetup2 = [
  [1, 1, 9, 1, 1, 1],
  [3, 1, 8, 1, 9, 1],
  [1, 2, 9, 1, 9, 1],
  [1, 1, 1, 1, 9, 1],
];

const adaptedTestSetup = [
  "11637517422274862853338597396444961841755517295286",
  "13813736722492484783351359589446246169155735727126",
  "21365113283247622439435873354154698446526571955763",
  "36949315694715142671582625378269373648937148475914",
  "74634171118574528222968563933317967414442817852555",
  "13191281372421239248353234135946434524615754563572",
  "13599124212461123532357223464346833457545794456865",
  "31254216394236532741534764385264587549637569865174",
  "12931385212314249632342535174345364628545647573965",
  "23119445813422155692453326671356443778246755488935",
  "22748628533385973964449618417555172952866628316397",
  "24924847833513595894462461691557357271266846838237",
  "32476224394358733541546984465265719557637682166874",
  "47151426715826253782693736489371484759148259586125",
  "85745282229685639333179674144428178525553928963666",
  "24212392483532341359464345246157545635726865674683",
  "24611235323572234643468334575457944568656815567976",
  "42365327415347643852645875496375698651748671976285",
  "23142496323425351743453646285456475739656758684176",
  "34221556924533266713564437782467554889357866599146",
  "33859739644496184175551729528666283163977739427418",
  "35135958944624616915573572712668468382377957949348",
  "43587335415469844652657195576376821668748793277985",
  "58262537826937364893714847591482595861259361697236",
  "96856393331796741444281785255539289636664139174777",
  "35323413594643452461575456357268656746837976785794",
  "35722346434683345754579445686568155679767926678187",
  "53476438526458754963756986517486719762859782187396",
  "34253517434536462854564757396567586841767869795287",
  "45332667135644377824675548893578665991468977611257",
  "44961841755517295286662831639777394274188841538529",
  "46246169155735727126684683823779579493488168151459",
  "54698446526571955763768216687487932779859814388196",
  "69373648937148475914825958612593616972361472718347",
  "17967414442817852555392896366641391747775241285888",
  "46434524615754563572686567468379767857948187896815",
  "46833457545794456865681556797679266781878137789298",
  "64587549637569865174867197628597821873961893298417",
  "45364628545647573965675868417678697952878971816398",
  "56443778246755488935786659914689776112579188722368",
  "55172952866628316397773942741888415385299952649631",
  "57357271266846838237795794934881681514599279262561",
  "65719557637682166874879327798598143881961925499217",
  "71484759148259586125936169723614727183472583829458",
  "28178525553928963666413917477752412858886352396999",
  "57545635726865674683797678579481878968159298917926",
  "57944568656815567976792667818781377892989248891319",
  "75698651748671976285978218739618932984172914319528",
  "56475739656758684176786979528789718163989182927419",
  "67554889357866599146897761125791887223681299833479",
];

describe.skip("parseLinesIntoSetup", () => {
  const { parseLinesIntoSetup } = Import;
  it("- when used with test-data - works as expected", () => {
    const lines = Helpers.parseInputData(testData);
    const setup = parseLinesIntoSetup(lines);
    expect(setup).toEqual(testSetup);
  });
});

describe.skip("adaptSetupForPart2", () => {
  const { adaptSetupForPart2 } = Import;
  it("works as expected", () => {
    const result = adaptSetupForPart2(testSetup);
    expect(result.map(row => row.join(""))).toEqual(adaptedTestSetup);
  });
});

describe.skip("getLowestRiskLevel3", () => {
  const { getLowestRiskLevel3 } = Import;
  it("- when used with test-setup - works as expected", () => {
    const result = getLowestRiskLevel3(testSetup);
    expect(result).toBe(40);
  });
  it("- when used with adapted test-setup - works as expected", () => {
    const setup2 = Import.adaptSetupForPart2(testSetup);
    const result = getLowestRiskLevel3(setup2);
    expect(result).toBe(315);
  });
});

describe("getLowestRiskLevelWithDijkstra2", () => {
  const { getLowestRiskLevelWithDijkstra2 } = Import;
  it("- when used with test-setup - works as expected", () => {
    const result = getLowestRiskLevelWithDijkstra2(testSetup);
    expect(result).toBe(40);
  });
  it("- when used with different test-setup - works as expected", () => {
    const result = getLowestRiskLevelWithDijkstra2(testSetup2);
    expect(result).toBe(15);
  });
  it("- when used with adapted test-setup - works as expected", () => {
    const setup2 = Import.adaptSetupForPart2(testSetup);
    const result = getLowestRiskLevelWithDijkstra2(setup2);
    expect(result).toBe(315);
  });
});

describe.skip("getLowestRiskLevel", () => {
  const { getLowestRiskLevel } = Import;
  it("- when used with test-setup - works as expected", () => {
    expect(getLowestRiskLevel(testSetup)).toBe(40);
  });
  it("- when used with adapted test-setup - works as expected", () => {
    const setup2 = Import.adaptSetupForPart2(testSetup);
    expect(getLowestRiskLevel(setup2)).toBe(315);
  });
});

describe.skip("getFinalPositionsWithLowestRiskLevelsAfterGivenSteps", () => {
  const { getFinalPositionsWithLowestRiskLevelsAfterGivenSteps } = Import;
  it("- when using start-position - works as expected", () => {
    const state = { entryX: 0, entryY: 0, entryRiskLevel: 0, steps: 10 };
    const result = getFinalPositionsWithLowestRiskLevelsAfterGivenSteps(testSetup, state);
    expect(result).toEqual([
      { finalX: 1, finalY: 9, riskLevel: 24 },
      { finalX: 8, finalY: 2, riskLevel: 25 },
      { finalX: 5, finalY: 5, riskLevel: 25 },
      { finalX: 7, finalY: 3, riskLevel: 26 },
      { finalX: 3, finalY: 7, riskLevel: 26 },
      { finalX: 6, finalY: 4, riskLevel: 28 },
      { finalX: 2, finalY: 8, riskLevel: 30 },
      { finalX: 4, finalY: 6, riskLevel: 34 },
      { finalX: 9, finalY: 1, riskLevel: 38 },
    ]);
    expect(
      result.every(
        item =>
          item.finalX >= state.entryX &&
          item.finalY >= state.entryY &&
          item.finalX - state.entryX + item.finalY - state.entryY === state.steps
      )
    ).toBe(true);
  });

  it("- when using position in between - works as expected", () => {
    const state = { entryX: 3, entryY: 2, entryRiskLevel: 0, steps: 3 };
    expect(getFinalPositionsWithLowestRiskLevelsAfterGivenSteps(testSetup, { ...state, steps: 1 })).toEqual([
      { finalX: 3, finalY: 3, riskLevel: 4 },
      { finalX: 4, finalY: 2, riskLevel: 5 },
    ]);
    const result = getFinalPositionsWithLowestRiskLevelsAfterGivenSteps(testSetup, state);
    expect(result).toEqual([
      { finalX: 6, finalY: 2, riskLevel: 7 },
      { finalX: 5, finalY: 3, riskLevel: 9 },
      { finalX: 4, finalY: 4, riskLevel: 11 },
      { finalX: 3, finalY: 5, riskLevel: 16 },
    ]);
    expect(
      result.every(
        item =>
          item.finalX >= state.entryX &&
          item.finalY >= state.entryY &&
          item.finalX - state.entryX + item.finalY - state.entryY === state.steps
      )
    ).toBe(true);
  });
});

describe("getSolutionPart1", () => {
  const { getSolutionPart1 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart1();
    expect(result).not.toBe(418);
    expect(result).toBe(373);
  });
});

describe("getSolutionPart2", () => {
  const { getSolutionPart2 } = Import;
  it("- when used with real data - works as expected", () => {
    const result = getSolutionPart2();
    expect(result).not.toBe(1869);
    expect(result).not.toBe(2893);
    expect(result).not.toBe(2874);
    expect(result).toBe(2868);
  });
});
