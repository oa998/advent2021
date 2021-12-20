import { getInputByDay, Grid2D } from "../util.js";

function greedyPath(grid) {
  const start = grid.getXY(0, 0);
  const end = grid.getXY(grid.maxX, grid.maxY);
  // assumes start is top left and finish is bottom right
  let curr = start;
  let path = [curr];
  while (curr.x !== end.x || curr.y !== end.y) {
    let best = { x: -1, y: -1, v: Number.MAX_SAFE_INTEGER };
    const neighbors = grid
      .getCardinalAdj(curr.x, curr.y)
      .filter(({ x, y }) => x > curr.x || y > curr.y);
    for (const n of neighbors) {
      if (n.v <= best.v) {
        best = n;
      }
    }
    curr = best;
    path.push(curr);
  }
  const greedyWeight = path.reduce((acc, { v }) => v + acc, 0);
  console.log({ greedyWeight });
  return greedyWeight;
}

function point(source, dest) {
  if (source.x === dest.x) {
    if (source.y > dest.y) return "S";
    return "N";
  }
  if (source.x > dest.x) {
    return "E";
  }
  return "W";
}

async function part1(grid) {
  const startTime = Date.now();
  let pruned = 0;
  // let greedyWeight = greedyPath(grid);
  // console.log("actual greedy", greedyWeight);
  // greedyWeight *= 0.15;
  let greedyWeight = 980;
  console.log("target greedy", greedyWeight);
  const start = grid.getXY(0, 0);
  const end = grid.getXY(grid.maxX, grid.maxY);
  const validPaths = [];

  let visits = 0;
  const visit = (x, y, weightSoFar, pathSoFar) => {
    visits++;
    const self = grid.getXY(x, y);
    if (weightSoFar + self.v >= greedyWeight) {
      // keep strictly better, not equal
      if (++pruned % 500000 === 0) console.log({ pruned });
      return;
    }

    if (self.x === end.x && self.y === end.y) {
      const thisPath = pathSoFar.concat(self);
      validPaths.push(thisPath);
      const bestSoFar = thisPath.reduce((acc, p) => p.v + acc, -start.v);
      greedyWeight = bestSoFar;
      const origin = thisPath[0];
      console.log("valid path found", { bestSoFar, origin });
    }

    const neighbors = grid
      .getCardinalAdj(x, y)
      .filter(
        (to) => !pathSoFar.find((from) => to.x == from.x && to.y == from.y)
      );

    // if (
    //   neighbors.some((to) =>
    //     pathSoFar.some((from) => to.x == from.x || to.y == from.y)
    //   )
    // ) {
    //   console.log("me", { x, y });
    //   console.log({ neighbors });
    //   console.log({ pathSoFar });
    //   console.log(neighbors);
    //   console.log("----");
    //   return;
    // }

    // .filter((to) => pathSoFar.every((from) => to.x !== from.x && to.y !== from.y));
    // console.log({ neighbors });

    for (const n of neighbors) {
      visit(
        n.x,
        n.y,
        weightSoFar + self.v,
        pathSoFar.concat({ ...self, pointer: point(self, n) })
      );
    }
  };

  visit(0, 0, -1, []);

  console.log("part 1:", { visits, greedyWeight }); // 232221
  console.log("duration", (Date.now() - startTime) / 1000, "seconds");

  validPaths.forEach((p) => {
    console.log(p);
  });
}

async function part2(grid) {
  console.log("part 2:");
}

(async () => {
  const input = await getInputByDay(15);
  //   const input = `1163751742
  // 1381373672
  // 2136511328
  // 3694931569
  // 7463417111
  // 1319128137
  // 1359912421
  // 3125421639
  // 1293138521
  // 2311944581`;
  const grid = new Grid2D(input);
  await part1(grid);
  // await part2(input);
})();

// min(a, z) = min(a, b) + min(b, z);
