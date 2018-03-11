
function assert(bool, message) {
    if (!bool) {
        throw new Error(message)
    }
}

assert.empty = function(array, message) {
    if (array.length) {
        throw new Error(message)
    }
}

assert.function = function(func, message) {
    if (typeof func !== 'function') {
        throw new Error(message)
    }
}

assert.number = function(number, message) {
    if (typeof number !== 'number') {
        throw new Error(message)
    }
}

assert.type = function(types, value, message) {
    if (typeof types === 'string') {
        // eslint-disable-next-line no-param-reassign
        types = [types]
    }
    if (!types.includes(typeof value)) {
        throw new Error(message)
    }
}

assert.every = function(values, condition, message) {
    for (const item of values) {
        if (!condition(item)) {
            throw new Error(message)
        }
    }
}

export default assert
