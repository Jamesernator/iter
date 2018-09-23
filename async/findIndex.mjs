import { raw as create } from "./createOperator.mjs"
import { raw as enumerate } from "./enumerate.mjs"
import assert from "../--assert.mjs"

async function __findIndex(iterable, predicate, hasDefault, defaultValue) {
    for await (const [idx, item] of enumerate(iterable)) {
        if (await predicate(item, idx)) {
            return idx
        }
    }
    if (hasDefault) {
        return defaultValue
    } else {
        throw new Error(`[findIndex] No item found with no default index provided`)
    }
}

function _findIndex(iterable, ...args) {
    const [hasDefault, defaultValue, predicate]
        = args.length === 0 ?
            [false, undefined, x => x]
        : args.length === 1 ?
            [false, undefined, ...args]
        :
            [true, ...args]

    return __findIndex(iterable, predicate, hasDefault, defaultValue)
}

function findIndex(iterable, ...args) {
    const unexpectedArgs = _ => {
        throw new Error(`[findIndex] Unexpected additional arguments to findIndex`)
    }
    const [hasDefault, defaultValue, predicate]
        = args.length === 0 ?
            [false, undefined, x => x]
        : args.length === 1 ?
            [false, undefined, ...args]
        : args.length === 2 ?
            [true, ...args]
        :
            unexpectedArgs()
    assert.function(predicate, `[findIndex] Expected findIndex predicate to be a function`)
    return __findIndex(iterable, predicate, hasDefault, defaultValue)
}

export default create(findIndex)
export { _findIndex as raw }
