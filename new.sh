n=$(printf %02d $1)
cat <<EOT >> "day_$n".js
import { getInputByDay } from './util.js';


// part 1
async function part1(input) {

  console.log('part 1:');
}

// part 2
async function part2(input) {
  
  console.log('part 2:');
}

(async() => {
  const input = await getInputByDay($1);
  await part1(input);
  await part2(input);
})();

EOT