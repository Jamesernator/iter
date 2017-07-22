import create from "./createMethod.js"
import { raw as enumerate } from "./enumerate.js"
import assert from "./#assert.js"

function __countBy(iterable, map, iteratee) {
    for (const [idx, item] of enumerate(iterable)) {
        const key = iteratee(item, idx)
        map.set(key, (map.get(key) || 0) + 1)
    }
    return map
}

function _countBy(iterable, ...args) {
    /* eslint-disable indent */
    const [map, iteratee]
        = args.length === 0 ?
            [new Map(), x => x]
        : args.length === 1 ?
            [new Map(), ...args]
        :
            args
    /* eslint-enable indent */
    return __countBy(iterable, map, iteratee)
}

function countBy(iterable, ...args) {
    const unexpectedArgs = _ => {
        throw new Error(`Unexpected additional arguments to countBy`)
    }

    /* eslint-disable indent */
    const [map, iteratee]
        = args.length === 0 ?
            [new Map(), x => x]
        : args.length === 1 ?
            [new Map(), ...args]
        : args.length === 2 ?
            args
        :
            unexpectedArgs()
    /* eslint-enable indent */
    assert(typeof map.get === 'function', `map object doesn't have a get method`)
    assert(typeof map.set === 'function', `map object doesn't have a set method`)
    assert.function(iteratee, `Expected iteratee to be a function`)
    return __countBy(iterable, map, iteratee)
}

export default create(countBy)
export { _countBy as raw }
