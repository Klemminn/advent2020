const fs = require('fs');

const input = fs.readFileSync('day3input.txt', 'utf8').split('\n');

const countTrees = (array) => {
    array.shift()
    let x = 0
    const lineLength = array[0].length
    console.log(lineLength)
    let treeCount = 0
    array.forEach((line) => {
        x = (x + 3) % lineLength
        treeCount += line[x] === '#' ? 1 : 0
    })
    return treeCount    
}

const countTrees2 = (array, right, down) => {
    let x = 0
    const lineLength = array[0].length
    let treeCount = 0
    for (let i = down; i < array.length; i += down) {
        x = (x + right) % lineLength
        treeCount += array[i][x] === '#' ? 1 : 0
    }
    return treeCount    
}

const countMultipleRoutes = (routes, array) => {
    return routes.reduce((multi, route) => multi * countTrees2(array, route.right, route.down), 1)
}

const givenRoutes = [
    {
        right: 1,
        down: 1,
    },
    {
        right: 3,
        down: 1,
    },
    {
        right: 5,
        down: 1,
    },
    {
        right: 7,
        down: 1,
    },
    {
        right: 1,
        down: 2,
    }
]

console.log(countMultipleRoutes(givenRoutes, input))