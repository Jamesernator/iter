import create from "./createMethod.js"
import { raw as enumerate } from "./enumerate.js"
import assert from "./#assert.js"

function __groupBy(iterable, map, iteratee) {
    for (const [idx, item] of enumerate(iterable)) {
        const key = iteratee(item, idx)
        if (map.has(key)) {
            map.get(key).push(item)
        } else {
            map.set(key, [item])
        }
    }
    return map
}

function _groupBy(iterable, ...args) {
    /* eslint-disable indent */
    const [map, iteratee]
        = args.length === 0 ?
            [new Map(), x => x]
        : args.length === 1 ?
            [new Map(), ...args]
        :
            args
    /* eslint-enable indent */
    return __groupBy(iterable, map, iteratee)
}

function groupBy(iterable, ...args) {
    const unexpectedArgs = _ => {
        throw new Error(`Unexpected additional arguments to groupBy`)
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
    assert(typeof map.has === 'function', `map object doesn't have a has method`)
    assert(typeof map.set === 'function', `map object doesn't have a set method`)
    assert.function(iteratee, `Expected iteratee to be a function`)
    return __groupBy(iterable, map, iteratee)
}

export default create(groupBy)
export { _groupBy as raw }
