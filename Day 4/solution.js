/*
--- Day 4: Security Through Obscurity ---

Finally, you come across an information kiosk with a list of rooms. Of course, the list is encrypted and full of decoy data, but the instructions to decode the list are barely hidden nearby. Better remove the decoy data first.
Each room consists of an encrypted name (lowercase letters separated by dashes) followed by a dash, a sector ID, and a checksum in square brackets.
A room is real (not a decoy) if the checksum is the five most common letters in the encrypted name, in order, with ties broken by alphabetization. For example:

aaaaa-bbb-z-y-x-123[abxyz] is a real room because the most common letters are a (5), b (3), and then a tie between x, y, and z, which are listed alphabetically.
a-b-c-d-e-f-g-h-987[abcde] is a real room because although the letters are all tied (1 of each), the first five are listed alphabetically.
not-a-real-room-404[oarel] is a real room.
totally-real-room-200[decoy] is not.
Of the real rooms from the list above, the sum of their sector IDs is 1514.

What is the sum of the sector IDs of the real rooms?
*/
'use strict';

const fs = require('fs');

const DATA_SOURCE = `${__dirname}/data.txt`;

if (!fs.statSync(DATA_SOURCE)) {
    console.error('Data file does not exist');
    return;
}

const rooms = fs.readFileSync(DATA_SOURCE, 'utf8').split('\n');

const getParsedRooms = rooms => rooms.map((room => {
    const mapping = /([a-z-]+)-(\d+)\[([a-z]+)\]/;
    const mappedRoom = (([, name, weight, hash ]) => {
        const repeats = getRepeats(name);

        return { 
            name, 
            weight: +weight, 
            hash,
            repeats,
            realhash: getRealHash(repeats)
        };
    })(room.match(mapping));

    return mappedRoom;
}));


const getRepeats = name => {
    const orderedLetters = name.replace(/-/g,'').split('').sort();

    return orderedLetters.reduce((repeats, letter) => {
        let found = false;
        
        for(let i = 0; i < repeats.length; i++) {
            if (repeats[i][0] === letter) {
                found = true;
                repeats[i] += letter;
                break;
            }
        }

        if (!found) {
            repeats.push(letter);
        }
        
        return repeats;
    }, []).sort((a, b) => {
        if (a.length > b.length) return -1;
        else if (a.length < b.length) return 1;
        else if (a[0] < b[0]) return -1;
        else if (a[0] > b[0]) return 1;
        else return 0;
    });
}

const getRealHash = repeats => repeats
    .slice(0, 5)
    .reduce((hash, letters) => 
        hash + letters[0]
    , '');

const getSum = rooms => rooms.reduce((sum, room) => {
    return room.hash == room.realhash ? 
        sum + room.weight :
        sum
}, 0);

const solve = rooms => {
    const parsedRooms = getParsedRooms(rooms);
    const sum = getSum(parsedRooms);
    
    return sum;
}

console.log(solve(rooms));
