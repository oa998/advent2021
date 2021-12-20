const i = `1163751742
1381373672
2136511328`;
// 3694931569
// 7463417111
// 1319128137
// 1359912421
// 3125421639
// 1293138521
// 2311944581`;

export default function expandDimensions(originalString, dimensions = 5) {
  const plusx = (input, x) =>
    input.replace(/(\d)/g, (...[_, m]) =>
      (+m + x > 9 ? +m + x - 9 : +m + x).toString()
    );

  let horizontal = originalString
    .split("\n")
    .map((row) =>
      Array(dimensions)
        .fill()
        .map((_, i) => plusx(row, i))
        .join("")
    )
    .join("\n");

  return Array(dimensions)
    .fill()
    .map((_, i) => plusx(horizontal, i))
    .join("\n");
}

// console.log(expandDimensions(i));
