const fs = require('fs');

const input = fs.readFileSync('day8input.txt', 'utf8').split('\n');
input.pop()

const findInfiniteLoopAccumulator = (array) => {
    let accumulator = 0
    const previousStates = []
    let index = 0
    const mappedArray = array.map((line) => {
        const lineSplit = line.split(' ')
        lineSplit[1] = Number(lineSplit[1])
        return lineSplit
    })
    while (true) {
        if (previousStates.includes(index)) return accumulator
        previousStates.push(index)
        const [action, value] = mappedArray[index]
        if (action === 'acc') {
            accumulator += value
            index++
        } else if (action === 'jmp') {
            index += value
        } else if (action === 'nop') {
            index++
        }
    }
}

// console.log(findInfiniteLoopAccumulator(input))

const fixInfiniteLoopAndReturnAccumulator = (array) => {
    
    let accumulator = 0
    let previousStates = []
    let index = 0
    const mappedArray = array.map((line) => {
        const lineSplit = line.split(' ')
        lineSplit[1] = Number(lineSplit[1])
        return lineSplit
    })
    let clonedArray = JSON.parse(JSON.stringify(mappedArray))
    let changedIndex = -1
    let outOfNops = false
    while (index < mappedArray.length) {
        if (previousStates.includes(index)) {
            clonedArray = JSON.parse(JSON.stringify(mappedArray))
            previousStates = []
            accumulator = 0
            index = 0
            if (!outOfNops) {
                changedIndex = clonedArray.findIndex((line, idx) => idx > changedIndex && line[0] === 'nop')
                if (changedIndex === -1) {
                    outOfNops = true
                } else {
                    clonedArray[changedIndex][0] = 'jmp'
                }
            }
            if (outOfNops) {
                changedIndex = clonedArray.findIndex((line, idx) => idx > changedIndex && line[0] === 'jmp')
                clonedArray[changedIndex][0] = 'nop'
            }
        }
        previousStates.push(index)
        const [action, value] = clonedArray[index]
        if (action === 'acc') {
            accumulator += value
            index++
        } else if (action === 'jmp') {
            index += value
        } else if (action === 'nop') {
            index++
        }
    }
    return accumulator
}

console.log(fixInfiniteLoopAndReturnAccumulator(input))