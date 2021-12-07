import { getInputByDay } from "./util.js";

async function part1(input) {
  const max = Math.max(...input);
  const min = Math.min(...input);
  const costByDepth = {};
  for (let i = min; i <= max; i++) {
    const cost = input.reduce((a, crab) => a + Math.abs(crab - i), 0);
    costByDepth[i] = cost;
  }
  let best = [-1, Number.MAX_SAFE_INTEGER];
  Object.entries(costByDepth).forEach(([depth, cost]) => {
    if (cost < best[1]) best = [depth, cost];
  });
  console.log("part 1:", best);
}

function incrementalSum(n) {
  return (n * (n + 1)) / 2;
}

async function part2(input) {
  const max = Math.max(...input);
  const min = Math.min(...input);
  const costByDepth = {};
  for (let i = min; i <= max; i++) {
    const cost = input.reduce(
      (a, crab) => a + incrementalSum(Math.abs(crab - i)),
      0
    );
    costByDepth[i] = cost;
  }
  let best = [-1, Number.MAX_SAFE_INTEGER];
  Object.entries(costByDepth).forEach(([depth, cost]) => {
    if (cost < best[1]) best = [depth, cost];
  });
  console.log("part 2:", best);
}

(async () => {
  const input = (await getInputByDay(7)).split(",").map(Number);
  // const input = `16,1,2,0,4,2,7,1,2,14`.split(",").map(Number);
  await part1(input);
  await part2(input);
})();
