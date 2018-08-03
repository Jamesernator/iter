import { raw as create } from "./createOperator.mjs"
import { raw as enumerate } from "./enumerate.mjs"
import assert from "../--assert.mjs"

async function __countBy(iterable, map, iteratee) {
    for await (const [idx, item] of enumerate(iterable)) {
        const key = await iteratee(item, idx)
        if (!map.has(key)) {
            map.set(key, 0)
        }
        map.set(key, map.get(key) + 1)
    }
    return map
}

function _countBy(iterable, ...args) {
    /* eslint-disable indent */
    const [map, iteratee]
        = args.length === 0 ?
            [new Map(), x => x]
        : args.length === 1 ?
            typeof args[0] === 'function' ?
                [new Map(), ...args]
            :
                [...args, x => x]
        :
            args
    /* eslint-enable indent */
    return __countBy(iterable, map, iteratee)
}

function countBy(iterable, ...args) {
    const unexpectedArgs = _ => {
        throw new Error(`[countBy] Unexpected additional arguments to countBy`)
    }

    /* eslint-disable indent */
    const [map, iteratee]
        = args.length === 0 ?
            [new Map(), x => x]
        : args.length === 1 ?
            typeof args[0] === 'function' ?
                [new Map(), ...args]
            :
                [...args, x => x]
        : args.length === 2 ?
            args
        :
            unexpectedArgs()
    /* eslint-enable indent */
    assert(map && typeof map.get === 'function', `[countBy] map object doesn't have a get method`)
    assert(map && typeof map.set === 'function', `[countBy] map object doesn't have a set method`)
    assert(map && typeof map.has === 'function', `[countBy] map object doesn't have a has method`)
    assert.function(iteratee, `[countBy] Expected iteratee to be a function`)
    return __countBy(iterable, map, iteratee)
}

export default create(countBy)
export { _countBy as raw }
