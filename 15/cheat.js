import fs from "fs";
import pathz from "path";
// import dijkstra from "dijkstrajs";

// const readFileLines = () =>
//   fs
//     .readFileSync(pathz.join(pathz.resolve(), "15", "output", "original.txt"))
//     .toString("UTF8")
//     .split("\n");

// var input = readFileLines();
// input = input.map((s, ind) => s.split("").map((c) => parseInt(c)));
// var startingTile = [...input];

// function goUp(grid) {
//   grid = grid.map((s) => {
//     return s.map((y) => {
//       y += 1;
//       if (y > 9) y = 1;
//       return y;
//     });
//   });

//   return grid;
// }
// function goUpTimes(grid, times) {
//   for (var i = 0; i < times; i++) {
//     grid = goUp(grid);
//   }
//   return grid;
// }

// //for 4 times
// for (var i = 1; i < 5; i++) {
//   var tile = goUpTimes(startingTile, i);
//   input = input.map((s, ind) => s.concat(tile[ind]));
// }
// var alsoStartingTile = [...input];

// for (var i = 1; i < 5; i++) {
//   var tile = goUpTimes(alsoStartingTile, i);
//   tile.forEach((element) => {
//     input.push(element);
//   });
// }

// function toObj(grid) {
//   var obj = {};
//   for (var y = 0; y < input.length; y++) {
//     var row = input[y];
//     for (var x = 0; x < row.length; x++) {
//       var value = input[y][x];
//       obj[y + "," + x] = {};
//       var adjacent = [];

//       if (y > 0) adjacent.push({ x: x, y: y - 1 });
//       if (y < input.length - 1) adjacent.push({ x: x, y: y + 1 });
//       if (x > 0) adjacent.push({ x: x - 1, y: y });
//       if (x < row.length - 1) adjacent.push({ x: x + 1, y: y });
//       for (var f = 0; f < adjacent.length; f++) {
//         var a = adjacent[f];
//         var adjNode = input[a.y][a.x];
//         obj[y + "," + x][adjacent[f].y + "," + adjacent[f].x] = adjNode;
//       }
//     }
//   }
//   return obj;
// }
// var path = dijkstra.find_path(
//   toObj(input),
//   "0,0",
//   `${input.length - 1},${input[0].length - 1}`
// );

// //sum values of path
// var sum = 0;
// path.forEach((element) => {
//   element = element.split(",").map(Number);
//   sum += input[element[0]][element[1]];
// });
// console.log(sum - 1);

//-----------------------

const map = fs
  .readFileSync(pathz.join(pathz.resolve(), "15", "output", "original.txt"), {
    encoding: "utf-8",
  })
  .trim()
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .split("\n") // Split on newline
  .map((x) => [...x].map(Number)); // Parse each line into a number

function coordinatesToIndex({ x, y }, map) {
  return x + y * map.length;
}

function indexToCoordinates(index, map) {
  const x = index % map.length;
  const y = (index - x) / map.length;
  return {
    x,
    y,
  };
}

function getNeighbors(index, map) {
  const { x, y } = indexToCoordinates(index, map);
  const list = [
    { x: x - 1, y },
    { x: x + 1, y },
    { x, y: y - 1 },
    { x, y: y + 1 },
  ].filter(({ x, y }) => x >= 0 && y >= 0 && x < map.length && y < map.length);
  return list;
}

function solve(map) {
  const target = { x: map.length - 1, y: map.length - 1 };
  const targetIndex = coordinatesToIndex(target, map);

  const dist = Array(map.length * map.length).fill(Infinity);
  const Q = new Set(
    Array(map.length * map.length)
      .fill(0)
      .map((x, index) => index)
  );

  dist[0] = 0;

  while (Q.size > 0) {
    let min = Infinity;
    let minIndex = 0;

    for (const value of Q) {
      if (dist[value] < min) {
        min = dist[value];
        minIndex = value;
      }
    }

    const u = minIndex;
    Q.delete(u);

    if (u === targetIndex) break;

    const neighbors = getNeighbors(u, map);

    for (const neighbor of neighbors) {
      const neighborIndex = coordinatesToIndex(neighbor, map);
      const alt = dist[u] + map[neighbor.y][neighbor.x];

      if (alt < dist[neighborIndex]) {
        dist[neighborIndex] = alt;
      }
    }
  }

  console.log(dist[coordinatesToIndex(target, map)]);
}

solve(map);

const biggerMap = Array(5 * map.length)
  .fill(0)
  .map((_, y) =>
    Array(5 * map.length)
      .fill(0)
      .map((_, x) => {
        const originalX = x % map.length;
        const originalY = y % map.length;
        const offset = Math.floor(x / map.length) + Math.floor(y / map.length);
        const value = map[originalY][originalX] + offset;
        return value > 9 ? value - 9 : value;
      })
  );

// console.log(biggerMap.map((v) => v.join("")).join`\n`);

solve(biggerMap);
