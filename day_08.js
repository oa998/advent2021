import { getInputByDay } from "./util.js";
import Solver from "./08_digitalNumberSolver.js";

// 1, 3, 4, 7
async function part1(input) {
  const words = input
    .split("\n")
    .flatMap((line) => line.split("|").slice(1))
    .flatMap((line) => line.trim().split(/\s+/g))
    .filter((w) => [2, 3, 4, 7].includes(w.length));
  console.log("part 1:", words.length);
}

async function part2(input) {
  const ans = input
    .split("\n")
    .filter((x) => x)
    .map((x) => new Solver(x).solve())
    .reduce((a, n) => a + n, 0);
  console.log("part 2:", ans);
}

(async () => {
  const input = await getInputByDay(8);
  await part1(input);
  await part2(input);
})();
