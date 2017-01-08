/*
--- Day 1: No Time for a Taxicab ---

Then, you notice the instructions continue on the back of the Recruiting Document.
Easter Bunny HQ is actually at the first location you visit twice.

For example, if your instructions are R8, R4, R4, R8, the first location you visit twice is 4 blocks away, due East.

How many blocks away is the first location you visit twice?
*/
'use strict';

const fs = require('fs');

const DIRECTION = {
    N: 0,
    E: 1,
    S: 2,
    W: 3
};
const state = {
    direction: DIRECTION.N,
    distance: {
        x: 0,
        y: 0
    },
    path: ['0,0']
};
const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

const steps = data
    .split(', ')
    .map(step => ({
        direction: step[0] === 'R' ? 1 : -1,
        distance: parseInt(step.slice(1), 10)
    }));

const collision = (steps => {
    for (const step of steps) {
        state.direction = (state.direction + step.direction + 4) % 4;

        for (let i = 1; i <= step.distance; i++) {
            switch (state.direction) {
            case DIRECTION.N:
                state.distance.y++;
                break;
            case DIRECTION.S:
                state.distance.y--;
                break;
            case DIRECTION.E:
                state.distance.x++;
                break;
            case DIRECTION.W:
                state.distance.x--;
            }

            const point = `${state.distance.x},${state.distance.y}`;

            if (state.path.includes(point)) {
                return state;
            }
            state.path.push(point);
        }
    }

    return false;
})(steps);

console.log(Math.abs(collision.distance.x) + Math.abs(collision.distance.y));
