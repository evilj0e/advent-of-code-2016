/*
--- Day 2: Bathroom Security ---

You finally arrive at the bathroom (it's a several minute walk from the lobby so visitors can behold the many fancy conference rooms and water coolers on this floor) and go to punch in the code. Much to your bladder's dismay, the keypad is not at all like you imagined it. Instead, you are confronted with the result of hundreds of man-hours of bathroom-keypad-design meetings:

    1
  2 3 4
5 6 7 8 9
  A B C
    D
You still start at "5" and stop when you're at an edge, but given the same instructions as above, the outcome is very different:

You start at "5" and don't move at all (up and left are both edges), ending at 5.
Continuing from "5", you move right twice and down three times (through "6", "7", "B", "D", "D"), ending at D.
Then, from "D", you move five more times (through "D", "B", "C", "C", "B"), ending at B.
Finally, after five more moves, you end at 3.
So, given the actual keypad layout, the code would be 5DB3.

Using the same instructions in your puzzle input, what is the correct bathroom code?
*/
'use strict';

const fs = require('fs');

const DATA_SOURCE = `${__dirname}/data.txt`;
const DIRECTIONS = {
    U: {
        axis: 'x',
        offset: -1
    },
    R: {
        axis: 'y',
        offset: 1
    },
    D: {
        axis: 'x',
        offset: 1
    },
    L: {
        axis: 'y',
        offset: -1
    }
};
const KEYPAD = {
    data: [
        [ ' ', ' ', '1', ' ', ' ' ],
        [ ' ', '2', '3', '4', ' ' ],
        [ '5', '6', '7', '8', '9' ],
        [ ' ', 'A', 'B', 'C', ' ' ],
        [ ' ', ' ', 'D', ' ', ' ' ]
    ],
    dimensions: {
        x: 4,
        y: 4
    },
    middle: 2
};
const state = {
    code: [],
    position: {
        x: 2,
        y: 0
    }
};

if (!fs.statSync(DATA_SOURCE)) {
    console.error('Data file does not exist');
    return;
}

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');
const lines = data.split('\n');

const getNewPosition = (position, {axis, offset}) => {
    const coord = position[axis] + offset;
    const oppositeAxis = axis === 'x' ? 'y' : 'x'
    let boundedCoord = coord;

    if (coord < 0) {
        boundedCoord = Math.max(0, coord);
    } else {
        offset = getOffset(position[oppositeAxis], axis);

        if (coord <= offset.start) {
            boundedCoord = offset.start;
        } else if (coord >= offset.end) {
            boundedCoord = offset.end;
        }
    }

    return Object.assign({}, position, { [axis]: boundedCoord });
}

const getOffset = (delta, axis) => {
    delta = Math.abs(KEYPAD.middle - delta);
    
    return { 
        start: delta,
        end: KEYPAD.dimensions[axis] - delta
    }
};

lines.forEach(line => {
    state.position = line
        .split('')
        .reduce((position, direction) => {
            return getNewPosition(position, DIRECTIONS[direction]);
        }, state.position);

    state.code.push(KEYPAD.data[state.position.x][state.position.y])
});

console.log(state.code.join(''));
