const fs = require('fs');

const input = fs.readFileSync('day14input.txt', 'utf8').split('\n');
input.pop()

const testInput = [
    'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
    'mem[8] = 11',
    'mem[7] = 101',
    'mem[8] = 0'
]

const testInput2 = [
    'mask = 000000000000000000000000000000X1001X',
    'mem[42] = 100',
    'mask = 00000000000000000000000000000000X0XX',
    'mem[26] = 1'
]

const getMemorySum = (array) => {
    const changed = {}
    let mask = []
    array.forEach((line) => {
        if (line.startsWith('mask')) {
            mask = line.split('mask = ')[1].split('')
        } else {
            const address = line.split('mem[')[1].split(']')[0]
            const value = Number(line.split(' = ')[1])
            let binaryValue = value.toString(2).padStart(36, '0')
            mask.forEach((letter, idx) => {
                if (letter !== 'X') {
                    binaryValue = binaryValue.substring(0, idx) + letter + binaryValue.substring(idx + 1)
                }
            })
            changed[address] = binaryValue
        }
    })
    let sum = 0
    for (let key in changed) {
        sum += parseInt(changed[key], 2)
    }
    return sum
}

// console.log(getMemorySum(input))

const getMemorySumFloat = (array) => {
    const changed = {}
    let mask = []
    array.forEach((line) => {
        if (line.startsWith('mask')) {
            mask = line.split('mask = ')[1].split('')
        } else {
            const value = Number(line.split(' = ')[1])
            const address = Number(line.split('mem[')[1].split(']')[0])
            let binaryAddress = address.toString(2).padStart(36, '0')
            mask.forEach((letter, idx) => {
                if (letter !== '0') {
                    binaryAddress = binaryAddress.substring(0, idx) + letter + binaryAddress.substring(idx + 1)
                }
                
            })
            const addresses = [binaryAddress]
            while (true) {
                let xExists = false
                addresses.forEach((add, tmpIdx) => {
                    const xIndex = add.indexOf('X')
                    if (xIndex > -1) {
                        addresses.splice(tmpIdx, 1)
                        addresses.push(add.substring(0, xIndex) + '0' + add.substring(xIndex + 1))
                        addresses.push(add.substring(0, xIndex) + '1' + add.substring(xIndex + 1))
                        xExists = true
                    }
                })
                if (!xExists) break
            }
            addresses.forEach((add) => {
                changed[add] = value
            })
        }
    })
    let sum = 0
    for (let key in changed) {
        sum += changed[key]
    }
    return sum
}

console.log(getMemorySumFloat(input))