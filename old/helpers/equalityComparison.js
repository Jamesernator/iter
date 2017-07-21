
/* equality returns a corresponding comparison function for the given
    equality operation
*/
const loose = [
    '==',
    'looseequality',
    'loose'
]

const strict = [
    '===',
    'strictequality',
    'strict'
]

const sameValue = [
    'samevalue',
    'object.is',
    'is'
]

const sameValueZero = [
    'samevaluezero'
]

export default function equality(equalityOperation='SameValue') {
    let compare
    if (loose.includes(equalityOperation.toLowerCase())) {
        /* eslint-disable eqeqeq */
        compare = (x, y) => x == y
        /* eslint-enable eqeqeq */
    } else if (strict.includes(equalityOperation.toLowerCase())) {
        compare = (x, y) => x === y
    } else if (sameValue.includes(equalityOperation.toLowerCase())) {
        compare = Object.is
    } else if (sameValueZero.includes(equalityOperation.toLowerCase())) {
        compare = (x, y) => {
            if (x === 0) {
                return y === 0
            } else {
                return Object.is(x, y)
            }
        }
    } else {
        throw new Error('unrecognized equality operation')
    }
    return compare
}

export const types = [...loose, ...strict, ...sameValue, ...sameValueZero]
