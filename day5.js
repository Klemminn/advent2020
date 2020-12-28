const fs = require('fs');

const input = fs.readFileSync('day5input.txt', 'utf8').split('\n').filter((l) => l);
input.pop()

const reducer = (sequence, lowerSymbol) => {
    const sequenceSplit = sequence.split('').map((s) => s === lowerSymbol ? 0 : 1).join('')
    return parseInt(sequenceSplit, 2)
}

const getSeatId = (row, seat) => {
    return row * 8 + seat
}

const parseSeat = (sequence) => {
    const rowSequence = sequence.substr(0, 7)
    const seatSequence = sequence.substr(7)
    const row = reducer(rowSequence, 'F')
    const seat = reducer(seatSequence, 'L')
    const seatId = getSeatId(row, seat)
    return seatId
}

const getSeatIds = (array) => array.map((sequence) => parseSeat(sequence))

const getMaxSeatId = (array) => {
    return Math.max(...getSeatIds(array))
}

console.log('max seatId', getMaxSeatId(input))

const getMissingId = (array) => {
    const seatIds = getSeatIds(array).sort()
    for (let i = 1; i < seatIds.length; i++) {
        if (seatIds[i] !== seatIds[i+1] - 1) return seatIds[i] + 1
    }
}

console.log('get missing seatId', getMissingId(input))