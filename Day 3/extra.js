/*
--- Day 3: Squares With Three Sides ---

Now that you've helpfully marked up their design documents, it occurs to you that triangles are specified in groups of three vertically. Each set of three numbers in a column specifies a triangle. Rows are unrelated.
For example, given the following specification, numbers with the same hundreds digit would be part of the same triangle:

101 301 501
102 302 502
103 303 503
201 401 601
202 402 602
203 403 603

In your puzzle input, and instead reading by columns, how many of the listed triangles are possible?
*/
'use strict';

const fs = require('fs');

const DATA_SOURCE = `${__dirname}/data.txt`;
const SIDES_COUNT = 3;

if (!fs.statSync(DATA_SOURCE)) {
    console.error('Data file does not exist');
    return;
}

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').match(/\d+/g);

const isPossibleTriangle = (sides) => {
    const max = sides.length;
    let flag = true;

    for (let i = 0; i < sides.length; i++) {
        const isSideOk = ~~sides[i] + ~~sides[(1 + i) % max] > ~~sides[(2 + i) % max];
        flag = flag && isSideOk;

        if (!flag) {
            break;
        }
    }
    
    return flag;
};

let total = 0;

for (let i = 0; i < data.length; i++) {
    const sides = [ data[i], data[i + SIDES_COUNT], data[i + SIDES_COUNT * 2] ];
    total += isPossibleTriangle(sides);
    
    if ((i + 1) % SIDES_COUNT === 0) {
        i += SIDES_COUNT * 2;
    }
}

console.log(total);
