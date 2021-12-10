import { getInputByDay } from "../util.js";

function isCorrupt(chars) {
  let charsCopy = [...chars];
  const lefts = ["{", "(", "[", "<"];
  const rights = ["}", ")", "]", ">"];
  const stack = [];
  while (charsCopy.length) {
    const next = charsCopy.shift();
    if (lefts.includes(next)) stack.push(next);
    else {
      const mate = lefts[rights.indexOf(next)];
      if (!stack.slice(-1).includes(mate)) return next;
      stack.pop();
    }
  }
  return false;
}

function complete(chars) {
  const lefts = ["{", "(", "[", "<"];
  const rights = ["}", ")", "]", ">"];
  const stack = [];
  while (chars.length) {
    const next = chars.shift();
    if (lefts.includes(next)) stack.push(next);
    else {
      const mate = lefts[rights.indexOf(next)];
      if (stack.slice(-1).includes(mate)) stack.pop();
    }
  }
  stack.reverse();
  return stack.map((left) => rights[lefts.indexOf(left)]);
}

async function part1(linesOfChars) {
  const mapping = {
    "}": 1197,
    ")": 3,
    "]": 57,
    ">": 25137,
  };
  const total = linesOfChars
    .map((chars) => {
      const val = isCorrupt(chars);
      if (val) return mapping[val];
      return 0;
    })
    .reduce((a, v) => a + v, 0);
  console.log("part 1:", total);
}

async function part2(linesOfChars) {
  const mapping = {
    "}": 3,
    ")": 1,
    "]": 2,
    ">": 4,
  };
  const incomplete = linesOfChars
    .filter((chars) => !isCorrupt(chars))
    .map(complete)
    .map((chars) => chars.reduce((a, c) => a * 5 + mapping[c], 0));

  incomplete.sort((a, b) => a - b); // ascending
  const midpoint = Math.round(incomplete.length / 2) - 1; // rounds up

  console.log("part 2:", incomplete[midpoint]);
}

(async () => {
  const input = (await getInputByDay(10))
    .split("\n")
    .filter((x) => x)
    .map((line) => line.split(""));
  await part1(input);
  await part2(input);
})();
