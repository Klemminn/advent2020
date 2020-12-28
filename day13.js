const fs = require('fs');

const input = fs.readFileSync('day13input.txt', 'utf8').split('\n');
input.pop()

const testInput = [
    "939",
    "67,7,x,59,61"
]

const findNextBus = (array) => {
    const timestamp = Number(array[0])
    const busses = array[1].split(',').map((bus) => Number(bus)).filter((bus) => !isNaN(bus))
    let bestBus
    let bestDifference = 100000
    busses.forEach((bus) => {
        let busStamp = 0
        while (true) {
            busStamp += bus
            let difference = busStamp - timestamp
            if (difference >= 0) {
                if (difference < bestDifference) {
                    bestDifference = difference
                    bestBus = bus
                }
                break
            }
        }
    })
    return bestBus * bestDifference
}

// console.log(findNextBus(input))

const findFirstOccurance = (array) => {
    const busses = array[1].split(',').map((bus, idx) => ({ id: Number(bus), offset: idx, current: 100000000000000 })).filter((bus) => !isNaN(bus.id))
    const firstBus = busses[0]
    let checkIndex = 1
    while (true) {
        const bus = busses[checkIndex]
        const difference = bus.current - firstBus.current
        if (difference > 0) {
            if (difference === bus.offset) {
                checkIndex++
            } else {
                firstBus.current += (Math.floor(bus.id / firstBus.id) + 1) * firstBus.id
                checkIndex = 1
            }
        } else {
            bus.current += bus.id
        }
        if (checkIndex === busses.length) {
            break
        }
    }
    return firstBus.current
}

console.log(findFirstOccurance(input))