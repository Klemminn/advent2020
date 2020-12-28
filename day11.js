const fs = require('fs');

const input = fs.readFileSync('day11input.txt', 'utf8').split('\n');
input.pop()

const testInput = [
'L.LL.LL.LL',
'LLLLLLL.LL',
'L.L.L..L..',
'LLLL.LL.LL',
'L.LL.LL.LL',
'L.LLLLL.LL',
'..L.L.....',
'LLLLLLLLLL',
'L.LLLLLL.L',
'L.LLLLL.LL',
]

const countAdjacent = (array, x, y) => {
    let count = 0
    const line = array[y]
    if (x > 0 && line[x - 1]) count++
    if (line[x + 1]) count++
    if (y > 0) {
        const upperLine = array[y-1]
        if (upperLine[x - 1]) count++
        if (upperLine[x]) count++
        if (upperLine[x + 1]) count++
    }
    if (array[y + 1]) {
        const lowerLine = array[y + 1]
        if (lowerLine[x - 1]) count++
        if (lowerLine[x]) count++
        if (lowerLine[x + 1]) count++
    }
    return count
}

const setSeats = (array) => {
    const parsed = array.map((line) => line.split('').map((char) => {
        if (char === 'L') return 0
        if (char === '.') return null
    }))
    const rowLength = array[0].length
    const rowCount = array.length
    let lastIteration = parsed
    while (true) {
        let current = JSON.parse(JSON.stringify(lastIteration))
        
        for (let x = 0; x < rowLength; x++) {
            for (let y = 0; y < rowCount; y++) {
                const seatStatus = lastIteration[y][x]
                if (seatStatus !== null) {
                    const adjacentCount = countAdjacent(lastIteration, x, y)
                    if (!seatStatus && adjacentCount === 0) {
                        current[y][x] = 1
                    } else if (seatStatus && adjacentCount >= 4) {
                        current[y][x] = 0
                    }
                }
            }
        }
        if (JSON.stringify(current) === JSON.stringify(lastIteration)) {
            break
        } else {
            lastIteration = current
        }
    }
    return lastIteration.reduce((sum, current) => {
        const occupiedRowSeats = current.reduce((rowsum, seat) => rowsum + (seat ? 1 : 0), 0)
        return sum + occupiedRowSeats
    }, 0)
}

// console.log(setSeats(input))

const countSeeOccupiedSeats = (array, x0, y0) => {
    let count = 0
    const line = array[y0]
    const rowLength = line.length
    const rowCount = array.length
    
    let x1 = x0 - 1
    while (x1 >= 0) {
        let seat = array[y0][x1]
        if (seat !== null) {
            count += seat
            break
        } else {
            x1--
        }
    }
    x1 = x0 + 1
    while (x1 < rowLength) {
        let seat = array[y0][x1]
        if (seat !== null) {
            count += seat
            break
        } else {
            x1++
        }
    }
    let y1 = y0 - 1
    while (y1 >= 0) {
        let seat = array[y1][x0]
        if (seat !== null) {
            count += seat
            break
        } else {
            y1--
        }
    }
    y1 = y0 + 1
    while (y1 < rowCount) {
        let seat = array[y1][x0]
        if (seat !== null) {
            count += seat
            break
        } else {
            y1++
        }
    }
    y1 = y0 - 1
    x1 = x0 - 1
    while (y1 >= 0 && x1 >= 0) {
        let seat = array[y1][x1]
        if (seat !== null) {
            count += seat
            break
        } else {
            y1--
            x1--
        }
    }
    y1 = y0 + 1
    x1 = x0 - 1
    while (y1 < rowCount && x1 >= 0) {
        let seat = array[y1][x1]
        if (seat !== null) {
            count += seat
            break
        } else {
            y1++
            x1--
        }
    }
    y1 = y0 + 1
    x1 = x0 + 1
    while (y1 < rowCount && x1 < rowLength) {
        let seat = array[y1][x1]
        if (seat !== null) {
            count += seat
            break
        } else {
            y1++
            x1++
        }
    }
    y1 = y0 - 1
    x1 = x0 + 1
    while (y1 >= 0 && x1 < rowLength) {
        let seat = array[y1][x1]
        if (seat !== null) {
            count += seat
            break
        } else {
            y1--
            x1++
        }
    }
    return count
}

const setSeats2 = (array) => {
    const parsed = array.map((line) => line.split('').map((char) => {
        if (char === 'L') return 0
        if (char === '.') return null
    }))
    const rowLength = array[0].length
    const rowCount = array.length
    let lastIteration = parsed
    while (true) {
        let current = JSON.parse(JSON.stringify(lastIteration))
        
        for (let x = 0; x < rowLength; x++) {
            for (let y = 0; y < rowCount; y++) {
                const seatStatus = lastIteration[y][x]
                if (seatStatus !== null) {
                    const occupiedWithinSight = countSeeOccupiedSeats(lastIteration, x, y)
                    if (!seatStatus && occupiedWithinSight === 0) {
                        current[y][x] = 1
                    } else if (seatStatus && occupiedWithinSight >= 5) {
                        current[y][x] = 0
                    }
                }
            }
        }
        if (JSON.stringify(current) === JSON.stringify(lastIteration)) {
            break
        } else {
            lastIteration = current
        }
        // console.log(lastIteration)
    }
    return lastIteration.reduce((sum, current) => {
        const occupiedRowSeats = current.reduce((rowsum, seat) => rowsum + (seat ? 1 : 0), 0)
        return sum + occupiedRowSeats
    }, 0)
}

console.log(setSeats2(input))