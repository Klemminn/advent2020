const fs = require('fs');

const input = fs.readFileSync('day9input.txt', 'utf8').split('\n').map((line) => Number(line));
input.pop()

const getAllSums = (array) => {
    const sums = []
    for (let i = 0; i < array.length; i++) {
        for (j = i + 1; j < array.length; j++) {
            if (array[i] !== array[j]) {
                sums.push(array[i] + array[j])
            }
        }
    }
    return sums
}

const findWrongNumber = (array, number) => {
    for (let i = number; i < array.length; i++) {
        const allSums = getAllSums(array.slice(i - number, i))
        if (!allSums.includes(array[i])) {
            console.log(allSums)
            return array[i]
        }
    }
}

const findContiguousSet = (array, number) => {
    let currentStartIndex = 0
    let currentIndex = 1
    let currentSum = 0
    let numbers = []
    const wrongNumber = findWrongNumber(array, number)
    while (currentSum !== wrongNumber) {
        numbers.push(array[currentIndex])
        currentSum = numbers.reduce((a, b) => a + b, 0)
        if (currentSum > wrongNumber) {
            currentStartIndex++
            numbers = [array[currentStartIndex]]
            currentIndex = currentStartIndex + 1
        } else {
            currentIndex++
        }
    }
    return Math.min(...numbers) + Math.max(...numbers)
}

console.log(findContiguousSet(input, 25))