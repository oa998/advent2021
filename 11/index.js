import { getInputByDay } from "../util.js";

async function part1(input) {
  const grid2D = input.split("\n").map((line, y) =>
    line.split("").map((n, x) => ({
      n: Number(n),
      f: false,
      x,
      y,
    }))
  );
  let gridFlat = grid2D.flatMap((row) => row);
  let w = grid2D[0].length;

  const getNeighbors = (x, y) => {
    return [
      grid2D[y - 1]?.[x - 1],
      grid2D[y + 1]?.[x + 1],
      grid2D[y]?.[x - 1],
      grid2D[y]?.[x + 1],
      grid2D[y - 1]?.[x],
      grid2D[y + 1]?.[x],
      grid2D[y - 1]?.[x + 1],
      grid2D[y + 1]?.[x - 1],
    ].filter((v) => v);
  };

  let step = 0;
  while (step < 100) {
    step++;
    gridFlat.forEach((cell) => {
      cell.n += 1;
      cell.f = false; // Nothing has flashed yet
    });
    // Must be cell references, not destructured
    let toFlash = gridFlat.filter((cell) => cell.n > 9 && !cell.f);
    while (toFlash.length) {
      // Flash them all
      toFlash.forEach((cell) => {
        cell.f = true;
        getNeighbors(cell.x, cell.y).forEach((cell) => {
          cell.n++;
        });
      });
      toFlash = gridFlat.filter((cell) => cell.n > 9 && !cell.f);
    }
    gridFlat.forEach((cell) => {
      if (cell.n > 9) {
        cell.n = 0;
      }
      if (cell.f) {
        cell.f = false;
      }
    });
    const output = grid2D
      .map((row) => row.map(({ n }) => n).join(""))
      .join("\n");
    if (step === 100) {
      console.log("part 1:", { output, step });
    }
  }
}

async function part2(input) {
  const grid2D = input.split("\n").map((line, y) =>
    line.split("").map((n, x) => ({
      n: Number(n),
      f: false,
      x,
      y,
    }))
  );
  let gridFlat = grid2D.flatMap((row) => row);
  let w = grid2D[0].length;

  const getNeighbors = (x, y) => {
    return [
      grid2D[y - 1]?.[x - 1],
      grid2D[y + 1]?.[x + 1],
      grid2D[y]?.[x - 1],
      grid2D[y]?.[x + 1],
      grid2D[y - 1]?.[x],
      grid2D[y + 1]?.[x],
      grid2D[y - 1]?.[x + 1],
      grid2D[y + 1]?.[x - 1],
    ].filter((v) => v);
  };

  let step = 0;
  // Run until condition met
  while (step < 20000) {
    step++;
    gridFlat.forEach((cell) => {
      cell.n += 1;
      cell.f = false; // Nothing has flashed yet
    });
    // Must be cell references, not destructured
    let toFlash = gridFlat.filter((cell) => cell.n > 9 && !cell.f);
    while (toFlash.length) {
      // Flash them all
      toFlash.forEach((cell) => {
        cell.f = true;
        getNeighbors(cell.x, cell.y).forEach((cell) => {
          cell.n++;
        });
      });
      toFlash = gridFlat.filter((cell) => cell.n > 9 && !cell.f);
    }

    gridFlat.forEach((cell) => {
      if (cell.n > 9) {
        cell.n = 0;
      }
      if (cell.f) {
        cell.f = false;
      }
    });

    // End when all 0's
    if (gridFlat.filter(({ n }) => n === 0).length === gridFlat.length) {
      console.log("part 2: all flashed at:", { step });
      return; // quit
    }
  }
}

// function test() {
//   const input = `5483143223
// 2745854711
// 5264556173
// 6141336146
// 6357385478
// 4167524645
// 2176841721
// 6882881134
// 4846848554
// 5283751526`;

//   part2(input);
// }

(async () => {
  const input = await getInputByDay(11);
  await part1(input);
  await part2(input);
  // test();
})();
