import { getInputByDay } from "../util.js";

async function part1(input) {
  let depth = 0,
    horiz = 0;
  input
    .split("\n")
    .filter((x) => x)
    .forEach((i) => {
      const num = +/(\d+)/.exec(i)[1];
      if (/forward/.test(i)) horiz += num;
      if (/down/.test(i)) depth += num;
      if (/up/.test(i)) depth -= num;
    });
  console.log("part 1:", depth * horiz); // 1714680
}

async function part2(input) {
  let depth = 0,
    horiz = 0,
    aim = 0;
  input
    .split("\n")
    .filter((x) => x)
    .forEach((i) => {
      const num = +/(\d+)/.exec(i)[1];
      if (/forward/.test(i)) {
        horiz += num;
        depth += aim * num;
      }
      if (/down/.test(i)) aim += num;
      if (/up/.test(i)) aim -= num;
    });
  console.log("part 2:", depth * horiz); // 1963088820
}

(async () => {
  const input = await getInputByDay(2);
  await part1(input);
  await part2(input);
})();
