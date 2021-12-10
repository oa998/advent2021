import { getInputByDay } from "../util.js";

async function part1(input, maxDays = 80) {
  let fishCount = input.reduce((a, f) => {
    a[f] = a[f] + 1 || 1;
    return a;
  }, Array(9).fill(0));

  let i;
  for (let day = 1; day <= maxDays; day++) {
    let nextGeneration = [];
    for (i = 9; i > 0; i--) {
      nextGeneration[i - 1] = fishCount[i] || 0;
    }
    nextGeneration[8] = fishCount[0];
    nextGeneration[6] += fishCount[0];
    fishCount = nextGeneration.slice(0);
    if (day === maxDays) {
      console.log(
        { day },
        { fishCount: fishCount.reduce((a, b) => a + b, 0) },
        "\n----"
      );
    }
  }
}

async function part2(input) {
  part1(input, 256);
}

(async () => {
  const input = (await getInputByDay(6)).split(",").map(Number);
  // const input = `3,4,3,1,2`.split(",").map(Number);
  console.log("part 1:");
  await part1(input);
  console.log("part 2:");
  await part2(input);
})();
