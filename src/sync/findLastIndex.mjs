import { raw as create } from "./createMethod.mjs"
import { raw as enumerate } from "./enumerate.mjs"
import assert from "../--assert.mjs"

function __findLastIndex(iterable, predicate, hasDefault, defaultValue) {
    let found = false
    let foundIndex
    for (const [idx, item] of enumerate(iterable)) {
        if (predicate(item, idx)) {
            found = true
            foundIndex = idx
        }
    }
    if (found) {
        return foundIndex
    } else if (hasDefault) {
        return defaultValue
    } else {
        throw new Error(`[findLastIndex] No item found with no default provided`)
    }
}

function _findLastIndex(iterable, ...args) {
    /* eslint-disable indent */
    const [hasDefault, defaultValue, predicate]
        = args.length === 0 ?
            [false, undefined, x => x]
        : args.length === 1 ?
            [false, undefined, ...args]
        :
            [true, ...args]

    /* eslint-enable indent */
    return __findLastIndex(iterable, predicate, hasDefault, defaultValue)
}

function findLastIndex(iterable, ...args) {
    const unexpectedArgs = _ => {
        throw new Error(`[findIndex] Unexpected additional arguments to find`)
    }
    /* eslint-disable indent */
    const [hasDefault, defaultValue, predicate]
        = args.length === 0 ?
            [false, undefined, x => x]
        : args.length === 1 ?
            [false, undefined, ...args]
        : args.length === 2 ?
            [true, ...args]
        :
            unexpectedArgs()
    /* eslint-enable indent */
    assert.function(predicate, `[findIndex] Expected find predicate to be a function`)
    return __findLastIndex(iterable, predicate, hasDefault, defaultValue)
}

export default create(findLastIndex)
export { _findLastIndex as raw }
