/*
--- Day 3: Squares With Three Sides ---

Now that you can think clearly, you move deeper into the labyrinth of hallways and office furniture that makes up this part of Easter Bunny HQ. This must be a graphic design department; the walls are covered in specifications for triangles.
Or are they?

The design document gives the side lengths of each triangle it describes, but... 5 10 25? Some of these aren't triangles. You can't help but mark the impossible ones.
In a valid triangle, the sum of any two sides must be larger than the remaining side. For example, the "triangle" given above is impossible, because 5 + 10 is not larger than 25.

In your puzzle input, how many of the listed triangles are possible?
*/
'use strict';

const fs = require('fs');

const DATA_SOURCE = `${__dirname}/data.txt`;

if (!fs.statSync(DATA_SOURCE)) {
    console.error('Data file does not exist');
    return;
}

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');
const triangle = data.split('\n');

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

const total = triangle.reduce((count, side) => {
    const sides = side.match(/\d+/g);

    if (sides.length !== 3) {
        return count;
    }

    return count + isPossibleTriangle(sides);
}, 0);

console.log(total);
