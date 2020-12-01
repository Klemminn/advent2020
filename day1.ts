const fs = require('fs');

const input = fs.readFileSync('day1input.txt', 'utf8').split('\n').map((str) => Number(str));

const findDoubleSum = (num) => {
    let first
    let second

    for (let i = 0; i <= input.length; i++) {
        first = input[i]
        for (let j = i; j <= input.length; j++) {
            second = input[j]
            if (first + second === num) {
                return first * second
            }
        }
    }
}
const firstAnswer = findDoubleSum(2020)
console.log('answer 1', firstAnswer)

const findTripleSum = (num) => {
    let first
    let second
    let third

    for (let i = 0; i <= input.length; i++) {
        first = input[i]
        for (let j = i; j <= input.length; j++) {
            second = input[j]
            for (let k = j; k <= input.length; k++) {
                third = input[k]
                if (first + second + third === num) {
                    return first * second * third
                }
            }
        }
    }
}
const secondAnswer = findTripleSum(2020)
console.log('answer 2', secondAnswer)