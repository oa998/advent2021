import { getInputByDay } from "../util.js";
import fs from "fs";
import path from "path";

async function part1(lines) {
  const matrix = Array(1000)
    .fill()
    .map(() => Array(1000).fill(0));
  lines
    .map((line) => {
      const [x1, y1, x2, y2] = /(\d+),(\d+)\D+(\d+),(\d+)/
        .exec(line)
        .slice(1, 6)
        .map(Number);
      return { x1, y1, x2, y2 };
    })
    .forEach(({ x1, y1, x2, y2 }) => {
      if (x1 === x2) {
        const start = Math.min(y1, y2);
        const end = Math.max(y1, y2);
        for (let y = start; y <= end; y++) {
          matrix[y][x1]++;
        }
      }
      if (y1 === y2) {
        const start = Math.min(x1, x2);
        const end = Math.max(x1, x2);
        for (let x = start; x <= end; x++) {
          matrix[y1][x]++;
        }
      }
    });

  let c = 0;
  matrix.forEach((row) =>
    row.forEach((cell) => {
      if (cell > 1) c++;
    })
  );

  const m = matrix
    .map((row) => row.map((r) => (r === 0 ? "." : Math.min(r, 9))).join(""))
    .join("\n");
  fs.writeFileSync(
    path.join(path.resolve(), "05", "output", "mat1.md"),
    "```\n" + m + "\n```"
  );

  console.log("part 1:", c);
}

async function part2(lines) {
  const matrix = Array(1000)
    .fill()
    .map(() => Array(1000).fill(0));
  lines
    .map((line) => {
      const [x1, y1, x2, y2] = /(\d+),(\d+)\D+(\d+),(\d+)/
        .exec(line)
        .slice(1, 6)
        .map(Number);
      return { x1, y1, x2, y2 };
    })
    .forEach(({ x1, y1, x2, y2 }) => {
      if (x1 === x2) {
        const start = Math.min(y1, y2);
        const end = Math.max(y1, y2);
        for (let y = start; y <= end; y++) {
          matrix[y][x1]++;
        }
      } else if (y1 === y2) {
        const start = Math.min(x1, x2);
        const end = Math.max(x1, x2);
        for (let x = start; x <= end; x++) {
          matrix[y1][x]++;
        }
      } else {
        // Handle diagonals
        for (let x = x1, y = y1; ; ) {
          matrix[y][x]++;
          if (x === x2) break;
          if (x < x2) x++;
          else x--;
          if (y < y2) y++;
          else y--;
        }
      }
    });

  let c = 0;
  matrix.forEach((row) =>
    row.forEach((cell) => {
      if (cell > 1) c++;
    })
  );

  const m = matrix
    .map((row) => row.map((r) => (r === 0 ? "." : Math.min(r, 9))).join(""))
    .join("\n");
  fs.writeFileSync(
    path.join(path.resolve(), "05", "output", "mat2.md"),
    "```\n" + m + "\n```"
  );

  console.log("part 1:", c);
}

(async () => {
  const input = (await getInputByDay(5)).split("\n").filter((x) => x);
  await part1(input);
  await part2(input);
})();
