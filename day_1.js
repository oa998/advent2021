import { getInputByDay } from './util.js';


// part 1
async function part1() {
  let input = (await getInputByDay(1)).split('\n').map(Number);
  let count = 0;
  for (const i in input.slice(1)) {
    if(input[i] > input[i-1]) count++;
  }
  console.log(count); // 1482
}

async function part2() {
  let input = (await getInputByDay(1)).split('\n').map(Number);
  let count = 0;
  let lastSum = input.slice(0,3).reduce((s,i) => s+i, 0);
  for (let i = 1; i < input.length-2; i++) {
    const sum = input.slice(i, i+3).reduce((s, j) => s+j, 0)
    if(sum > lastSum) count++;
    lastSum = sum;
  }
  console.log(count); // 1518
}

(async() => {
  // await part1();
  await part2();
})()
