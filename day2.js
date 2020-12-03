const fs = require('fs');

const input = fs.readFileSync('day2input.txt', 'utf8').split('\n');

const countValid = (array) => {
    const parsed = array.map((p) => p.replace(':', '').split(' '))
    const numValid = parsed.filter((line) => {
        const [min, max] = line[0].split('-').map((l) => Number(l))
        const letter = line[1]
        const password = line[2]
        if (!password) return false
        const occurrances = password.split(letter).length - 1
        return occurrances >= min && occurrances <= max
    }).length
    return numValid
}

console.log(countValid(input))

const countValid2 = (array) => {
    const parsed = array.map((p) => p.replace(':', '').split(' '))
    const numValid = parsed.filter((line) => {
        const [firstIndex, secondIndex] = line[0].split('-').map((l) => Number(l))
        const letter = line[1]
        const password = line[2]
        if (!password) return false
        const firstCheck = password[firstIndex - 1] === letter ? 1 : 0
        const secondCheck = password[secondIndex - 1] === letter ? 1 : 0
        return firstCheck + secondCheck === 1
    }).length
    return numValid
}

console.log(countValid2(input))