/* matchList returns true if applying the typeof operator
    to each value in the sequence gives the pattern given,
    IF a match pattern value is undefined then it will match anything
    IF a match pattern is null then it only match null
    IF a match pattern value is an array then it check the array
    item is in the array
    IF a match pattern value is a function then it will call that function
    to test if the element matches
    IF a match pattern is '...' then it will skip until the amount
    of items remaining is the same as the number of items left in the array
    only one such pattern is allowed e.g. ['number', '...', 'function']
    allows for [2, x => x], [2, anything, x => x], [2, anything, anything, x => x] etc
*/

const typeofTypes = [
    'string',
    'number',
    'undefined',
    'object',
    'function',
    'symbol',
    'boolean',
]

/* eslint-disable complexity */
/* eslint-disable max-statements */
const validMatchTarget = (_match, topLevel=true) => {
    if (typeof _match === 'string' && _match.startsWith('+')) {
        return validMatchTarget(_match.slice(1))
    } else if (_match === undefined || _match === '' || _match === 'any') {
        return true
    } else if (_match === null) {
        return true
    } else if (typeof _match === 'function') {
        return true
    } else if (typeofTypes.includes(_match)) {
        /* simple type */
        return true
    } else if (_match === '...' && topLevel) {
        /* variadic any */
        return true
    } else if (typeof _match === 'string' && _match.endsWith('?')
    && typeofTypes.includes(_match.slice(0, -1))) {
        /* is type or undefined */
        return true
    } else if (typeof _match === 'string' && _match.endsWith('??')
    && typeofTypes.includes(_match.slice(0, -2))) {
        /* is type or undefined or null */
        return true
    } else if (typeof _match === 'string'
    && _match.startsWith('...')
    && typeofTypes.includes(_match.slice(3))) {
        /* variadic simple type */
        return topLevel
    } else if (_match instanceof Array) {
        if (!topLevel) {
            /* nested patterns shouldn't be arrays */
            return false
        } else if (_match[0] === '...') {
            /* check if the remaining elements are valid */
            return _match.slice(1).every(subMatch =>
                    validMatchTarget(subMatch, false)
                )
        } else {
            /* an array pattern is valid if all its
                elements are non-array patterns
            */
            return _match.every(subMatch => validMatchTarget(subMatch, false))
        }
    } else if (typeof _match === 'object') {
        for (const key of Object.getOwnPropertyNames(_match)) {
            if (!validMatchTarget(_match[key], false)) {
                return false
            }
        }
        for (const key of Object.getOwnPropertySymbols(_match)) {
            if (!validMatchTarget(_match[key], false)) {
                return false
            }
        }
        return true
    }
    return false
}
/* eslint-enable-complexity */
/* eslint-enable max-statements */

const isObject = (obj) => {
    return obj !== null && (
        typeof obj === 'function'
        || typeof obj === 'object'
    )
}

/* eslint-disable complexity */
/* eslint-disable max-statements */
const matchElement = (_match, item) => {
    if (_match === undefined || _match === 'any' || _match === '') {
        return true
    } else if (_match === null) {
        return item === null
    } else if (typeof _match === 'function') {
        try {
            return Boolean(_match(item))
        } catch (_) {
            return false
        }
    } else if (typeof _match ==='boolean') {
        return _match === item
    } else if (typeof _match === 'symbol') {
        return _match === item
    } else if (typeof _match === 'string' && _match.endsWith('??')) {
        return item == null || typeof item === _match.slice(0, -2)
    } else if (typeof _match === 'string' && _match.endsWith('?')) {
        return item === undefined || typeof item === _match.slice(0, -1)
    } else if (typeof _match === 'string' && typeof item === _match) {
        return true
    } else if (_match instanceof Array) {
        return _match.some(m2 => matchElement(m2, item))
    } else if (typeof _match === 'object') {
        if (!isObject(item)) {
            return false
        }
        for (const key of Object.getOwnPropertyNames(_match)) {
            if (!matchElement(_match[key], item[key])) {
                return false
            }
        }

        for (const sym of Object.getOwnPropertySymbols(_match)) {
            if (!matchElement(_match[sym], item[sym])) {
                return false
            }
        }
        return true
    }
    return false
}
/* eslint-enable complexity */
/* eslint-disable max-statements */

/* eslint-disable max-statements */
/* eslint-disable complexity */
export default function match(array, pattern) {
    const result = []
    if (pattern.filter(x =>
        typeof x === 'string' && x.startsWith('...')
        || x instanceof Array && x[0] === '...'
    ).length > 1) {
        throw new Error(`Only one variadic pattern allowed`)
    } else if (!pattern.every(_match => validMatchTarget(_match))) {
        throw new Error(`Invalid match pattern`)
    }
    let arrIdx = 0
    for (const [idx, _match] of pattern.entries()) {
        if (_match instanceof Array && _match[0] === '...') {
            const variableMatch = []
            while (array.length - arrIdx >= pattern.length - idx) {
                if (!matchElement(_match.slice(1), array[arrIdx])) {
                    return false
                }
                variableMatch.push(array[arrIdx])
                arrIdx += 1
            }
            result.push(variableMatch)

        } else if (typeof _match === 'string' && _match.startsWith('...')) {
            const variableMatch = []
            while (array.length - arrIdx >= pattern.length - idx) {
                if (!matchElement(_match.slice(3), array[arrIdx])) {
                    return false
                }
                variableMatch.push(array[arrIdx])
                arrIdx += 1
            }
            result.push(variableMatch)

        } else if (typeof _match === 'string' && _match.startsWith('+')) {
            if (arrIdx >= array.length) {
                return false
            } else if (!matchElement(_match.slice(1), array[arrIdx])) {
                return false
            }
            arrIdx += 1
        } else if (!matchElement(_match, array[arrIdx])) {
            return false
        } else {
            result.push(array[arrIdx])
            arrIdx += 1
        }
    }
    if (arrIdx < array.length) {
        return false
    }
    return result
}
/* eslint-enable max-statements */
/* eslint-enable complexity */
