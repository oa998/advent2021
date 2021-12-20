import { getInputByDay, Grid2D } from "../util.js";
import gridTimes5 from "./util/play.js";
import fs from "fs";
import pathz from "path";

function prettyGrid(grid) {
  return grid
    .map((row) =>
      row
        .map((c) => c.cost.toString().padStart(3, " ").padEnd(4, " "))
        .join(" ")
    )
    .join("\n");
}

async function part1(grid, part) {
  const startTime = Date.now();
  // const start = grid.getXY(0, 0);
  // const end = grid.getXY(grid.maxX, grid.maxY);

  const memo = Array(grid.maxY + 1)
    .fill()
    .map(() => Array(grid.maxX + 1).fill(0));

  // first one costs nothing
  memo[0][0] = { parent: null, self: grid.getXY(0, 0), cost: 0 };

  // first row and column are known best answers because they have 1 neighbor
  for (let y = 1; y < grid.maxY + 1; y++) {
    memo[y][0] = {
      self: grid.getXY(0, y),
      parent: grid.getXY(0, y - 1),
      cost: memo[y - 1][0].cost + grid.getXY(0, y).v,
    };
  }

  // first row and column are known best answers because they have 1 neighbor
  for (let x = 1; x < grid.maxX + 1; x++) {
    memo[0][x] = {
      self: grid.getXY(x, 0),
      parent: grid.getXY(x - 1, 0),
      cost: memo[0][x - 1].cost + grid.getXY(x, 0).v,
    };
  }

  for (let y = 1; y < grid.maxY + 1; y++) {
    for (let x = 1; x < grid.maxX + 1; x++) {
      const min =
        memo[y - 1][x].cost < memo[y][x - 1].cost
          ? memo[y - 1][x]
          : memo[y][x - 1];
      memo[y][x] = {
        self: grid.getXY(x, y),
        parent: min.self,
        cost: grid.getXY(x, y).v + min.cost,
      };
    }
  }

  const path = [];
  let node = memo[grid.maxY][grid.maxX];
  while (node.parent) {
    path.push(node.self);
    node = memo[node.parent.y][node.parent.x];
    if (!node.parent) {
      path.push(node.self);
      break;
    }
  }

  console.log({
    SOLUTION_FROM_PATH: path.reduce((a, { v }) => a + v, 0),
    SOLUTION: memo[grid.maxY][grid.maxX].cost,
    lastMemo: memo[grid.maxY][grid.maxX],
    duration: `${Date.now() - startTime} ms`,
  });

  // console.log("path ends: ", [...path.slice(0, 2), ...path.slice(-2)]);

  // let s = "";
  // for (let y = 0; y < grid.maxY + 1; y++) {
  //   for (let x = 0; x < grid.maxX + 1; x++) {
  //     const match = path.find((p) => p.x === x && p.y === y);
  //     if (match) {
  //       s += match.v;
  //     } else {
  //       s += ".";
  //     }
  //   }
  //   s += "\n";
  // }
  fs.writeFileSync(
    pathz.join(pathz.resolve(), "15", "output", `costs_${part}.txt`),
    prettyGrid(memo)
  );
}

(async () => {
  const input = await getInputByDay(15);
  const grid1 = new Grid2D(input);
  console.log("part 1");
  await part1(grid1, 1);

  const grid2 = new Grid2D(gridTimes5(input.trim()));
  console.log("part 2");
  await part1(grid2, 2); // 2593 too low, // 2650 too low // 3068 not right // 3063 is right....
})();

// min(a, z) = min(a, b) + min(b, z);
