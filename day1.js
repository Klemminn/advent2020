const fs = require('fs');

const input = fs.readFileSync('day1input.txt', 'utf8').split('\n').map((str) => Number(str));

const findDoubleSum = (array, sumToMatch) => {
    let first
    let second

    for (let i = 0; i <= array.length; i++) {
        first = array[i]
        for (let j = i + 1; j <= array.length; j++) {
            second = array[j]
            if (first + second === sumToMatch) {
                return first * second
            }
        }
    }
}
console.log('answer 1', findDoubleSum(input, 2020))

const findTripleSum = (array, sumToMatch) => {
    let first
    let second
    let third

    for (let i = 0; i <= array.length; i++) {
        first = array[i]
        for (let j = i + 1; j <= array.length; j++) {
            second = array[j]
            for (let k = j + 1; k <= array.length; k++) {
                third = array[k]
                if (first + second + third === sumToMatch) {
                    return first * second * third
                }
            }
        }
    }
}
console.log('answer 2', findTripleSum(input, 2020))

// Recursive answer...
const logSum = (array, sumToMatch, numItems) => {
    const initialIndexes = [array.length - numItems - 1]
    while (initialIndexes.length < numItems) {
        initialIndexes.push(initialIndexes[initialIndexes.length - 1] + 1)
    }
    const recurs = (indexes) => {
        const sum = indexes.reduce((sum, index) => array[index] + sum, 0)
        if (sum === sumToMatch) {
            console.log(indexes.reduce((multi, index) => array[index] * multi, 1))
            return
        }
        let checkIndex = 0
        while (true) {
            const checkNum = indexes[checkIndex]
            if (checkIndex === numItems) {
                console.log('No combination matches the request')
                return
            }
            if (checkNum > 0) {
                indexes[checkIndex] -= 1
                return process.nextTick(() => recurs(indexes))
            } else {
                indexes[checkIndex] = indexes[checkIndex + 1] - 1
                checkIndex += 1
            }
        }
    }
    return recurs(initialIndexes)
}
logSum(input, 2020, 3)