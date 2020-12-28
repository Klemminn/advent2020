const fs = require('fs');

const input = fs.readFileSync('day10input.txt', 'utf8').split('\n').map((line) => Number(line));
input.pop()

const testInput = [
    28,
33,
18,
42,
31,
14,
46,
20,
48,
47,
24,
23,
49,
45,
19,
38,
39,
11,
1,
32,
25,
35,
8,
17,
7,
9,
4,
2,
34,
10,
3
]

const shortInput = [16,
    10,
    15,
    5,
    1,
    11,
    7,
    19,
    6,
    12,
    4]

const findJoltDifference = (array) => {
    array.sort((a, b) => a > b ? 1 : -1)
    const withDevice = [0, ...array, array[array.length - 1] + 3]
    const difference = withDevice.map((line, idx) => withDevice[idx + 1] - line)
    const numOfOnes = difference.filter((line) => line === 1).length
    const numOfThrees = difference.filter((line) => line === 3).length
    return numOfOnes * numOfThrees
}
// 22 & 10 = 19208
// 69 & 36 = 
// console.log(findJoltDifference(input))

const onesToArrangements = [1, 1, 2, 4, 7]

const findNumberOfArrangements = (array) => {
    array.sort((a, b) => a > b ? 1 : -1)
    const withDevice = [0, ...array, array[array.length - 1] + 3]
    const difference = withDevice.map((line, idx) => withDevice[idx + 1] - line)
    const oneCounts = [0]
    difference.forEach((diff) => {
        const end = oneCounts[oneCounts.length - 1]
        if (diff === 3) {
            if (end !== 0) {
                oneCounts.push(0)
            }
        } else if (diff === 1) {
            oneCounts[oneCounts.length - 1] = end + 1
        }
    })
    const arrangement = oneCounts.map((num) => onesToArrangements[num])
    const reduced = arrangement.reduce((multi, current) => multi * current, 1)
    return reduced
}

console.log(findNumberOfArrangements(shortInput))
console.log(findNumberOfArrangements(testInput))
console.log(findNumberOfArrangements(input))