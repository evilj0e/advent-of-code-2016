/*
--- Day 2: Bathroom Security ---

You arrive at Easter Bunny Headquarters under cover of darkness. However, you left in such a rush that you forgot to use the bathroom! Fancy office buildings like this one usually have keypad locks on their bathrooms, so you search the front desk for the code.
"In order to improve security," the document you find says, "bathroom codes will no longer be written down. Instead, please memorize and follow the procedure below to access the bathrooms."
The document goes on to explain that each button to be pressed can be found by starting on the previous button and moving to adjacent buttons on the keypad: U moves up, D moves down, L moves left, and R moves right. Each line of instructions corresponds to one button, starting at the previous button (or, for the first line, the "5" button); press whatever button you're on at the end of each line. If a move doesn't lead to a button, ignore it.

You can't hold it much longer, so you decide to figure out the code as you walk to the bathroom. You picture a keypad like this:
1 2 3
4 5 6
7 8 9

Suppose your instructions are:
ULL
RRDDD
LURDL
UUUUD

You start at "5" and move up (to "2"), left (to "1"), and left (you can't, and stay on "1"), so the first button is 1.
Starting from the previous button ("1"), you move right twice (to "3") and then down three times (stopping at "9" after two moves and ignoring the third), ending up with 9.
Continuing from "9", you move left, up, right, down, and left, ending with 8.
Finally, you move up four times (stopping at "2"), then down once, ending with 5.
So, in this example, the bathroom code is 1985.

Your puzzle input is the instructions from the document you found at the front desk. What is the bathroom code?
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
const KEYPAD_DIMENSIONS = {
    x: 2,
    y: 2
};
const state = {
    code: [],
    position: {
        x: 1,
        y: 1
    }
};

if (!fs.statSync(DATA_SOURCE)) {
    console.error('Data file does not exist');
    return;
}

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');
const lines = data.split('\n');

function getNewPosition(position, {axis, offset}) {
    const coord = position[axis] + offset;
    const boundedCoord = Number(coord <= 0 && Math.max(0, coord) || coord > 0 && Math.min(KEYPAD_DIMENSIONS[axis], coord));

    return Object.assign({}, position, { [axis]: boundedCoord });
}

lines.forEach(line => {
    state.position = line
        .split('')
        .reduce((position, direction) => {
            return getNewPosition(position, DIRECTIONS[direction]);
        }, state.position);

    state.code.push(state.position.x * (KEYPAD_DIMENSIONS.x + 1) + state.position.y + 1);
});

console.log(state.code.join(''));
