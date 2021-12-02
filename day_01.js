import { getInputByDay } from './util.js';


// part 1
async function part1(input) {
  let count = 0;
  for (const i in input.slice(1)) {
    if(input[i] > input[i-1]) count++;
  }
  console.log('part 1:', count); // 1482
}

async function part2(input) {
  let count = 0;
  let lastSum = input.slice(0,3).reduce((s,i) => s+i, 0);
  for (let i = 1; i < input.length-2; i++) {
    const sum = input.slice(i, i+3).reduce((s, j) => s+j, 0)
    if(sum > lastSum) count++;
    lastSum = sum;
  }
  console.log('part 2:', count); // 1518
}

(async() => {
  const input = (await getInputByDay(1));
  const numbers = input.split('\n').map(Number);
  await part1(numbers);
  await part2(numbers);
})();