import { getInputByDay } from "../util.js";

function removeDuplicates(points) {
  return [...new Set(points.map(JSON.stringify))].map(JSON.parse);
}

function fold(points, { axis, number }) {
  let unchangedPoints;
  let changedPoints;
  if (axis === "x") {
    unchangedPoints = points.filter(({ x }) => x <= number);
    changedPoints = points
      .filter(({ x }) => x > number)
      .map(({ x, y }) => {
        const dist = x - number;
        return { x: x - dist * 2, y };
      });
  } else {
    unchangedPoints = points.filter(({ y }) => y <= number);
    changedPoints = points
      .filter(({ y }) => y > number)
      .map(({ x, y }) => {
        const dist = y - number;
        return { x, y: y - dist * 2 };
      });
  }
  return removeDuplicates(unchangedPoints.concat(changedPoints));
}

function show(points) {
  const grid = Array(10)
    .fill()
    .map(() => Array(50).fill(" "));
  points.forEach(({ x, y }) => (grid[y][x] = "#"));
  console.log(grid.map((row) => row.join("")).join("\n"));
}

async function part1(points, firstFold) {
  const updated = fold(points, firstFold);
  console.log("part 1:", updated.length);
}

async function part2(points, allFolds) {
  let updated = points;
  allFolds.forEach((singleFold, i) => {
    updated = fold(updated, singleFold);
  });
  show(updated);
  /*
    #### ###  #  # #### #    ###  ###  ###            
    #    #  # #  # #    #    #  # #  # #  #           
    ###  #  # #  # ###  #    #  # ###  #  #           
    #    ###  #  # #    #    ###  #  # ###            
    #    #    #  # #    #    #    #  # # #            
    #### #     ##  #### #### #    ###  #  # 
  */
}

(async () => {
  const input = await getInputByDay(13);
  const points = input
    .split("\n")
    .filter((x) => /\d+,\d+/g.test(x))
    .map((pt) => {
      const [x, y] = pt.split(",").map(Number);
      return { x, y };
    });

  const folds = input
    .split("\n")
    .filter((x) => /fold along/g.test(x))
    .map((fold) => {
      const [_, axis, number] = /([xy])=(\d+)/.exec(fold);
      return { axis, number: +number };
    });

  await part1(points, folds[0]);
  await part2(points, folds);
})();
