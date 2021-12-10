import { getInputByDay } from "../util.js";
import fs from "fs";
import path from "path";

async function part1(input) {
  const grid = input.split("\n").map((line) => line.split(""));
  const w = grid[0].length;

  const get = (x, y) => {
    return grid[y]?.[x];
  };

  const lows = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < w; x++) {
      const self = get(x, y);
      const neighbors = [
        get(x + 1, y),
        get(x - 1, y),
        get(x, y + 1),
        get(x, y - 1),
      ].filter((x) => x !== undefined);
      if (neighbors.every((n) => n > self)) lows.push(+self);
    }
  }

  console.log(
    "part 1:",
    lows.reduce((a, d) => a + d + 1, 0)
  );
}

async function part2(input) {
  const grid = input.split("\n").map((line) => line.split(""));
  const w = grid[0].length;

  const valid = new Set(
    Array(9)
      .fill()
      .map((_, i) => i + "")
  );

  const get = (x, y) => {
    return grid[y]?.[x];
  };

  const set = (x, y) => {
    grid[y][x] = ".";
  };

  let visited = 0;

  // dfs
  function visit(x, y) {
    const v = get(x, y);
    if (valid.has(v)) {
      visited++;
      set(x, y);
      visit(x, y + 1);
      visit(x, y - 1);
      visit(x + 1, y);
      visit(x - 1, y);
    }
  }

  const basins = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < w; x++) {
      visit(x, y);
      if (visited > 0) {
        basins.push(visited);
        visited = 0;
      }
    }
  }

  fs.writeFileSync(
    path.join(path.resolve(), "09", "output", "basins.md"),
    "```\n" + grid.map((row) => row.join("")).join("\n") + "\n```"
  );

  console.log(
    "part 2:",
    basins
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((a, n) => a * n, 1)
  );
}

(async () => {
  const input = await getInputByDay(9);
  await part1(input);
  await part2(input);
})();
