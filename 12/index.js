import { getInputByDay } from "../util.js";

function getAdj(input) {
  return input
    .split("\n")
    .map((row) => row.split("-"))
    .reduce((acc, [left, right]) => {
      acc[left] = (acc[left] || []).concat(right);
      acc[right] = (acc[right] || []).concat(left);
      return acc;
    }, {});
}

async function part1(input) {
  let part1Count = 0;

  function dfs(adj) {
    const START = "start";
    adj[START].forEach((n) => visit(n, adj, [START], [START]));
  }

  function visit(next, adj, visited, currPath) {
    if (next === "end") {
      part1Count++;
      return;
    }

    const neighbors = adj[next].filter((n) => !visited.includes(n));
    // visit lowercases once
    const updatedVisited =
      next.toLowerCase() === next ? visited.concat(next) : [...visited];
    const updatedCurrPath = currPath.concat(next);
    neighbors.forEach((n) => visit(n, adj, updatedVisited, updatedCurrPath));
  }

  dfs(getAdj(input));
  console.log("part 1:", part1Count);
}

async function part2(input) {
  let part2Count = 0;
  const START = "start";

  function dfs(adj) {
    adj[START].forEach((n) => visit(n, adj, [START], [START]));
  }

  function visit(next, adj, visited, currPath) {
    const countedVisits = visited.reduce((acc, v) => {
      acc[v] = (acc[v] || 0) + 1;
      return acc;
    }, {});

    const lcVisitedTwice = Object.values(countedVisits).some((c) => c > 1);

    if (
      lcVisitedTwice && // if any lower-case has been seen twice
      next.toLowerCase() === next && // and this is a lowercase
      currPath.includes(next) // and we've been here already
    ) {
      return; // then quit
    }

    if (next === "end") {
      part2Count++;
      return;
    }

    const ammendedVistedLocations = lcVisitedTwice ? [...visited] : [START];

    const neighbors = adj[next].filter(
      (n) => !ammendedVistedLocations.includes(n)
    );
    const updatedVisited =
      next.toLowerCase() === next ? visited.concat(next) : [...visited];
    const updatedCurrPath = currPath.concat(next);
    neighbors.forEach((n) => visit(n, adj, updatedVisited, updatedCurrPath));
  }

  dfs(getAdj(input));
  console.log("part 2:", part2Count);
}

(async () => {
  const input = await getInputByDay(12);
  await part1(input);
  await part2(input);
})();
