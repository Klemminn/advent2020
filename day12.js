const fs = require('fs');

const input = fs.readFileSync('day12input.txt', 'utf8').split('\n');
input.pop()

const testInput = [
    'F10',
    'N3',
    'F7',
    'R90',
    'R90',
    'R90',
    'R90',
    'R90',
    'F11'
]

const directions = ['N', 'E', 'S', 'W']

const getNewDirection = (current, symb, degrees) => {
    const sign = symb === 'L' ? 1 : -1
    const val = sign * (degrees / 90)
    const currentIndex = directions.findIndex((d) => d === current)
    const newIndex = currentIndex - val
    return directions[newIndex > -1 ? (newIndex % directions.length) : directions.length + newIndex]
}

const findManhattanDistance = (array) => {
    const parsed = array.map((line) => [line.substr(0, 1), Number(line.substr(1))])
    let x = 0
    let y = 0
    let direction = 'E'
    parsed.forEach((line) => {
        let [action, value] = line
        if (['L', 'R'].includes(action)) {
            direction = getNewDirection(direction, action, value)
        }
        if (action === 'F') {
            action = direction
        }
        if (action === 'N') {
            y += value
        } else if (action === 'S') {
            y -= value
        } else if (action === 'E') {
            x += value
        } else if (action === 'W') {
            x -= value
        }
    })
    return Math.abs(x) + Math.abs(y)
}

// console.log(findManhattanDistance(input))

const rotateWaypoint = (waypoints, symb, degrees) => {
    if (degrees === 180) {
        return waypoints.map((w) => -w)
    } 
    if (symb === 'L') {
        degrees = degrees === 90 ? 270 : 90
    }
    const times = degrees / 90
    let loop = 0
    let newWaypoints = waypoints
    while (loop < times) {
        const [positiveX, positiveY] = newWaypoints.map((w) => w >= 0)
        newWaypoints = newWaypoints.map((w) => Math.abs(w))
        if (positiveX && positiveY) {
            newWaypoints = [newWaypoints[1], -newWaypoints[0]]
        } else if (positiveX && !positiveY) {
            newWaypoints = [-newWaypoints[1], -newWaypoints[0]]
        } else if (!positiveX && !positiveY) {
            newWaypoints = [-newWaypoints[1], newWaypoints[0]]
        } else if (!positiveX && positiveY) {
            newWaypoints = [newWaypoints[1], newWaypoints[0]]
        }
        loop++
    }
    return newWaypoints
}

const withNewInstructions = (array) => {
    const parsed = array.map((line) => [line.substr(0, 1), Number(line.substr(1))])
    let waypointX = 10
    let waypointY = 1
    let shipX = 0
    let shipY = 0
    parsed.forEach((line) => {
        let [action, value] = line
        if (action === 'N') {
            waypointY += value
        } else if (action === 'S') {
            waypointY -= value
        } else if (action === 'E') {
            waypointX += value
        } else if (action === 'W') {
            waypointX -= value
        } else if (action === 'F') {
            shipX += waypointX * value
            shipY += waypointY * value
        } else if (['L', 'R'].includes(action)) {
            [waypointX, waypointY] = rotateWaypoint([waypointX, waypointY], action, value)
        }
    })
    return Math.abs(shipX) + Math.abs(shipY)
}

console.log(withNewInstructions(input))