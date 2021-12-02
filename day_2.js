import { getInputByDay } from './util.js';


// part 1
async function part1() {
  let depth = 0, horiz = 0;
  let input = (await getInputByDay(2)).split('\n');
  input.filter(x=>x).forEach(i => {
    const num = +/(\d+)/.exec(i)[1];
    if(/forward/.test(i)) horiz += num;
    if(/down/.test(i)) depth += num;
    if(/up/.test(i)) depth -= num;
  })
  console.log(depth * horiz); // 1714680
}

async function part2() {
  let input = (await getInputByDay(2)).split('\n');
  let depth = 0, horiz = 0, aim = 0;
  input.filter(x=>x).forEach(i => {
    const num = +/(\d+)/.exec(i)[1];
    if(/forward/.test(i)) {
      horiz += num;
      depth += (aim * num);
    }
    if(/down/.test(i)) aim += num;
    if(/up/.test(i)) aim -= num;
  })
  console.log(depth * horiz); // 1963088820
}

(async() => {
  // await part1();
  await part2();
})()
