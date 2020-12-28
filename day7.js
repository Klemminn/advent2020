const fs = require('fs');

const input = fs.readFileSync('day7input.txt', 'utf8').split('\n');
input.pop()

const countBagOptions = (array, bagType) => {
    const splitter = ' bags contain '
    const arrayWithSplit = array.map((line) => line.split(splitter))
    let bagTypes = [bagType]
    let noFilterBagTypes = []
    while (bagTypes.length) {
        const currentBagType = bagTypes.pop()
        const includeCurrentBagtype = arrayWithSplit.filter((line) => line[1].includes(currentBagType)).map((line) => line[0])
        bagTypes = [...bagTypes, ...includeCurrentBagtype]
        noFilterBagTypes = [...noFilterBagTypes, ...includeCurrentBagtype]
    }
    
    return [...new Set(noFilterBagTypes)].length
}
// console.log('answer 1', countBagOptions(input, 'shiny gold'))


const bagsDescriptionToArray = (bagsDescription) => {
    if (bagsDescription.includes('no other bags')) return undefined
    const strippedDescription = bagsDescription.replace(/ bags/g, '').replace(/ bag/g, '').replace('.', '')
    const split = strippedDescription.split(', ')
    
    return split.map((t) => [Number(t.substr(0, 2)), t.substr(2)])
}



const countBags = (array, bagType) => {
    const bagTypes = {}
    array.forEach((line) => {
        const splitter = ' bags contain '
        const lineSplit = line.split(splitter)
        bagTypes[lineSplit[0]] = bagsDescriptionToArray(lineSplit[1])
    })

    const recurs = (bagtype) => {
        const current = bagTypes[bagtype]
        return !current ? 0 : current.reduce((previous, bt) => previous + bt[0] + bt[0] * recurs(bt[1]), 0)
    }

    return recurs(bagType)
}

console.log(countBags(input, 'shiny gold'))