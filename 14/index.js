import { getInputByDay } from "../util.js";

class CountMap {
  constructor() {
    this.cmap = {};
  }
  add(key, v = 1) {
    this.cmap[key] = (this.cmap[key] || 0) + v;
  }
  getMap() {
    return this.cmap;
  }
}

async function part1(start, instructions) {
  let rounds = 0;
  let str = start.split("");
  while (rounds < 10) {
    for (let i = str.length - 2; i >= 0; i--) {
      str.splice(i + 1, 0, instructions[str.slice(i, i + 2).join("")]);
    }
    rounds++;
  }
  const strMap = str.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
  const entries = Object.entries(strMap).sort((a, b) => b[1] - a[1]);
  const max = entries[0];
  const min = entries.slice(-1)[0];
  console.log({ max, min, diff: max[1] - min[1] });
}

async function part2(start, instructions) {
  // initialize the map of pairs
  const str = start.split("");
  let pairs = new CountMap();
  for (let i = str.length - 2; i >= 0; i--) {
    const pair = str.slice(i, i + 2).join("");
    pairs.add(pair);
  }

  let nextPairs;
  let rounds = 0;
  while (rounds < 40) {
    nextPairs = new CountMap();
    Object.entries(pairs.getMap()).forEach(([pair, count]) => {
      const n = instructions[pair];
      const pair1 = `${pair[0]}${n}`;
      const pair2 = `${n}${pair[1]}`;
      nextPairs.add(pair1, count);
      nextPairs.add(pair2, count);
    });
    pairs = nextPairs;
    rounds++;
  }

  const sums = Object.entries(pairs.getMap()).reduce((acc, [pair, count]) => {
    const [left, right] = pair.split("");
    acc.add(left, count);
    acc.add(right, count);
    return acc;
  }, new CountMap());

  // { max: [ 'N', 3200 ], min: [ 'C', 651 ], diff: 2549 }
  const sorted = Object.entries(sums.getMap()).sort((a, b) => b[1] - a[1]);
  const minLetter = sorted.slice(-1)[0][0];
  const maxLetter = sorted[0][0];
  const min = Math.floor(sorted.slice(-1)[0][1] / 2);
  const max = Math.floor(sorted[0][1] / 2);
  const diff = max - min;
  console.log("part 2:", {
    start,
    min,
    max,
    diff,
    minLetter,
    maxLetter,
  });
}

(async () => {
  const input = (await getInputByDay(14)).split("\n").filter((x) => x);

  //   const input = `NNCB

  // CH -> B
  // HH -> N
  // CB -> H
  // NH -> C
  // HB -> C
  // HC -> B
  // HN -> C
  // NN -> C
  // BH -> H
  // NC -> B
  // NB -> B
  // BN -> B
  // BB -> N
  // BC -> B
  // CC -> N
  // CN -> C;`
  //     .split("\n")
  //     .filter((x) => x);

  const start = input[0].trim();
  const instructions = input.slice(1).reduce((acc, line) => {
    const [_, left, right] = /(\w\w) -> (\w)/.exec(line);
    acc[left] = right;
    return acc;
  }, {});
  // console.log(instructions);
  // await part1(start, instructions);
  await part2(start, instructions);
})();
