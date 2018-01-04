import { raw as create } from "./createOperator.mjs"
import { raw as enumerate } from "./enumerate.mjs"
import assert from "../--assert.mjs"

async function __find(iterable, predicate, hasDefault, defaultValue) {
    for await (const [idx, item] of enumerate(iterable)) {
        if (await predicate(item, idx)) {
            return item
        }
    }
    if (hasDefault) {
        return defaultValue
    } else {
        throw new Error(`[find] No item found with no default provided`)
    }
}

function _find(iterable, ...args) {
    /* eslint-disable indent */
    const [hasDefault, defaultValue, predicate]
        = args.length === 0 ?
            [false, undefined, x => x]
        : args.length === 1 ?
            [false, undefined, ...args]
        :
            [true, ...args]

    /* eslint-enable indent */
    return __find(iterable, predicate, hasDefault, defaultValue)
}

function find(iterable, ...args) {
    const unexpectedArgs = _ => {
        throw new Error(`[find] Unexpected additional arguments to find`)
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
    assert.function(predicate, `[find] Expected find predicate to be a function`)
    return __find(iterable, predicate, hasDefault, defaultValue)
}

export default create(find)
export { _find as raw }
