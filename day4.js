const fs = require('fs');

const input = fs.readFileSync('day4input.txt', 'utf8').split('\n\n');

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

const hasAllRequired = (passport) => {
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i]
        if (!passport.includes(field)) return false
    }
    return true
}

const countValid = (array) => {
    return array.filter((passport) => hasAllRequired(passport)).length
}

const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']

const countValid2 = (array) => {
    return array.filter((passport) => {
        if (!hasAllRequired(passport)) return false
        const split = passport.split(/\s+/)
        for (let i = 0; i < split.length; i++) {
            const [field, value] = split[i].split(':')
            if (field === 'byr' && (Number(value) < 1920 || (Number(value) > 2002))) return false
            if (field === 'iyr' && (Number(value) < 2010 || (Number(value) > 2020))) return false
            if (field === 'eyr' && (Number(value) < 2020 || (Number(value) > 2030))) return false
            if (field === 'hgt') {
                if (!['cm', 'in'].includes(value.substr(-2))) return false
                if (value.substr(-2) === 'cm') {
                    const cm = Number(value.substr(0, 3))
                    if (isNaN(cm) || cm < 150 || cm > 193) return false
                } else if (value.substr(-2) === 'in') {
                    const inch = Number(value.substr(0, 2))
                    if (isNaN(inch) || inch < 59 || inch > 76) return false
                }
            }
            if (field === 'hcl' && !/^#[0-9A-F]{6}$/i.test(value)) return false
            if (field === 'ecl' && !eyeColors.includes(value)) return false
            if (field === 'pid' && value.replace(/[^0-9]/g, '').length !== 9) return false
        }
        return true
    }).length
}

console.log(countValid2(input))