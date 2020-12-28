const fs = require('fs');

const input = fs.readFileSync('day6input.txt', 'utf8').split('\n\n');
input.pop()

const countAnswers = (array) => {
    const parsedArray = array.map((group) => group.replace(/\s/g,''))
    const duplicatesRemoved = parsedArray.map((group) => [...new Set(group.split(''))].join(''))
    return duplicatesRemoved.reduce((sum, group) => (sum + group.length), 0)
}

const countAnswers2 = (array) => {
    const parsedArray = array.map((group) => group.split(/\s/))
    let count = 0
    for (let i = 0; i < parsedArray.length; i++) {
        const group = parsedArray[i]
        const last = group.pop()
        const allIncludeNum = last.split('').filter((letter) => group.every((str) => str.includes(letter))).length
        count += allIncludeNum
    }
    return count
}

console.log('answer 2', countAnswers2(input))