import fetch from "node-fetch";

export const getInputByDay = (day) =>
  fetch(`https://adventofcode.com/2021/day/${day}/input`, {
    method: "GET",
    headers: {
      cookie:
        "_ga=GA1.2.869596651.1638286901; _gid=GA1.2.1204119135.1638286901; session=53616c7465645f5f66345e6e3c5d3a18432314bd2de58f51d1fd77ea2ecd8ecb14c8c3a8dd678bb3640d6c7ef840c133",
    },
  }).then((res) => res.text());

export class Grid2D {
  constructor(string) {
    this.grid = string
      .trim()
      .split("\n")
      .map((line) => line.split(""));

    for (const y in this.grid) {
      for (const x in this.grid[0]) {
        this.grid[+y][+x] = { x: +x, y: +y, v: +this.grid[y][x] };
      }
    }
  }

  getXY(x, y) {
    return this.grid[+y]?.[+x];
  }

  getCardinalAdj(x, y) {
    return [
      this.getXY(x + 1, y),
      this.getXY(x - 1, y),
      this.getXY(x, y + 1),
      this.getXY(x, y - 1),
    ].filter((x) => x !== undefined);
  }

  getAllAdj(x, y) {
    return [
      this.getXY(x - 1, y - 1),
      this.getXY(x + 1, y + 1),
      this.getXY(x - 1, y),
      this.getXY(x + 1, y),
      this.getXY(x, y - 1),
      this.getXY(x, y + 1),
      this.getXY(x + 1, y - 1),
      this.getXY(x - 1, y + 1),
    ].filter((v) => v);
  }

  get maxX() {
    return this.grid[0].length - 1;
  }

  get maxY() {
    return this.grid.length - 1;
  }
}
