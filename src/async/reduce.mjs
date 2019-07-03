import { raw as create } from "./createOperator.mjs"
import iterator from "./--iterator.mjs"
import assert from "../--assert.mjs"

async function __reduce(iterable, reducer, seeded, seedValue) {
    const iter = iterator(iterable)
    try {
        let acc
        let idx = 0
        if (seeded) {
            acc = seedValue
        } else {
            const { value, done } = await iter.next()
            if (done) {
                throw new Error(`[reduce] Can't reduce empty sequence with no initial value`)
            }
            acc = value
            idx += 1
        }

        for await (const item of iter) {
            acc = await reducer(acc, item, idx)
            idx += 1
        }
        return acc
    } finally {
        await iter.return()
    }
}

function _reduce(iterable, ...args) {
    /* eslint-disable indent */
    const [seeded, seedValue, reducer]
        = args.length === 0 ?
            [false, undefined, (x, y) => x + y]
        : args.length === 1 ?
            [false, undefined, ...args]
        :
            [true, ...args]
    /* eslint-enable indent */
    return __reduce(iterable, reducer, seeded, seedValue)
}

function reduce(iterable, ...args) {
    /* eslint-disable indent */
    const unexpectedArgs = _ => {
        throw new Error(`[reduce] Unexpected additional arguments`)
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

    assert.function(reducer, `[reduce] Expected reducer to be a function`)
    return __reduce(iterable, reducer, seeded, seedValue)
}

export default create(reduce)
export { _reduce as raw }
