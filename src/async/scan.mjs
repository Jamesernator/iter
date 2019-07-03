import { raw as create } from "./createOperator.mjs"
import { raw as iterableGenerator } from "./iterableGenerator.mjs"
import assert from "../--assert.mjs"
import iterator from "./--iterator.mjs"

const __scan = iterableGenerator(async function* scan(iterable, reducer, seeded, seedValue) {
    const iter = iterator(iterable)
    try {
        let acc
        let idx = 0
        if (seeded) {
            acc = seedValue
        } else {
            const { value, done } = await iter.next()
            if (done) {
                throw new Error(`[scan] Can't scan empty sequence with no initial value`)
            }
            acc = value
            idx += 1
        }

        yield acc
        for await (const item of iter) {
            acc = await reducer(acc, item, idx)
            yield acc
            idx += 1
        }
    } finally {
        await iter.return()
    }
})

function _scan(iterable, ...args) {
    const [seeded, seedValue, reducer]
        = args.length === 0 ?
            [false, undefined, (x, y) => x + y]
        : args.length === 1 ?
            [false, undefined, ...args]
        :
            [true, ...args]
    return __scan(iterable, reducer, seeded, seedValue)
}

function scan(iterable, ...args) {
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

    assert.function(reducer, `[scan] Expected scanr to be a function`)
    return __scan(iterable, reducer, seeded, seedValue)
}

export default create(scan)
export { _scan as raw }
