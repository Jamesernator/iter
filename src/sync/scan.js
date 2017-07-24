import create from "./createMethod.js"
import iterableGenerator from "./iterableGenerator.js"
import { raw as iterator } from "./iterator.js"
import assert from "./assert.js"

const __scan = iterableGenerator(function* scan(iterable, reducer, seeded, seedValue) {
    const iter = iterator(iterable)
    let acc
    let idx = 0
    if (seeded) {
        acc = seedValue
    } else {
        const { value, done } = iter.next()
        if (done) {
            throw new Error(`[scan] Can't scan empty sequence with no initial value`)
        }
        acc = value
        idx += 1
    }

    yield acc

    for (const item of iterator) {
        acc = reducer(acc, item, idx)
        yield acc
        idx += 1
    }
})

function _scan(iterable, ...args) {
    /* eslint-disable indent */
    const [seeded, seedValue, reducer]
        = args.length === 0 ?
            [false, undefined, (x, y) => x + y]
        : args.length === 1 ?
            [false, undefined, ...args]
        :
            [true, ...args]
    /* eslint-enable indent */
    return __scan(iterable, reducer, seeded, seedValue)
}

function scan(iterable, ...args) {
    /* eslint-disable indent */
    const unexpectedArgs = _ => {
        throw new Error(`[scan] Unexpected additional arguments`)
    }

    const [seeded, seedValue, reducer]
        = args.length === 0 ?
            [false, undefined, (x, y) => x + y]
        : args.length === 1 ?
            [false, undefined, ...args]
        : args.length === 2 ?
            [true, ...args]
        :
            unexpectedArgs()
    /* eslint-enable indent */

    assert.function(reducer, `[scan] Expected scanr to be a function`)
    return __scan(iterable, reducer, seeded, seedValue)
}

export default create(scan)
export { _scan as raw }
