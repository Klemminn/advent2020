const fs = require('fs');

const input = fs.readFileSync('day5input.txt', 'utf8').split('\n');
input.pop()

const reducer = (sequence, lowerSymbol, upperLimit) => {
    const sequenceSplit = sequence.split('')
    return sequenceSplit.reduce((previous, current) => {
        const splitNumber = Math.abs(Math.floor((previous[0] - previous[1]) / 2))
        if (current === lowerSymbol) return [previous[0], previous[1] - splitNumber]
        return [previous[0] + splitNumber, previous[1]]
    }, [0, upperLimit])[0]
}

const getSeatId = (row, seat) => {
    return row * 8 + seat
}

const parseSeat = (sequence) => {
    const rowSequence = sequence.substr(0, 7)
    const seatSequence = sequence.substr(7)
    const row = reducer(rowSequence, 'F', 127)
    const seat = reducer(seatSequence, 'L', 7)
    const seatId = getSeatId(row, seat)
    return { row, seat, seatId }
}

const getSeatIds = (array) => array.map((sequence) => parseSeat(sequence).seatId)

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