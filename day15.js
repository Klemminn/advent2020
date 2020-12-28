const fs = require('fs');

const input = fs.readFileSync('day15input.txt', 'utf8').split('\n');
input.pop()

const testInput = [
    0, 3, 6
]

const findNumber = (array, magicNumber) => {
    const indexObject = {}
    array.forEach((num, idx) => {
        indexObject[num] = [idx, -1]
    })
    let loop = array.length
    let lastNumber = array[array.length - 1]
    while (loop < magicNumber) {
        const [before, beforeThat] = indexObject[lastNumber]
        lastNumber = beforeThat < 0 ? 0 : before - beforeThat
        indexObject[lastNumber] = [loop, (indexObject[lastNumber] || [-1])[0]]
        loop++
        if (loop % 1000000 < 1) {
            console.log(loop)
        }
    }
    return lastNumber
}

console.log(findNumber(input, 30000000))