import fetch from 'node-fetch';

export const getInputByDay = (day) => fetch(`https://adventofcode.com/2021/day/${day}/input`, {
    method: 'GET',
    headers: {
      'cookie': '_ga=GA1.2.869596651.1638286901; _gid=GA1.2.1204119135.1638286901; session=53616c7465645f5f66345e6e3c5d3a18432314bd2de58f51d1fd77ea2ecd8ecb14c8c3a8dd678bb3640d6c7ef840c133'
    }
  }).then((res) => res.text());
