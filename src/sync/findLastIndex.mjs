import { raw as create } from "./createMethod.mjs"
import { raw as enumerate } from "./enumerate.mjs"
import assert from "../--assert.mjs"

function _findLastIndex(iterable, predicate=x => x) {
    let found = false
    let foundIdx
    for (const [idx, item] of enumerate(iterable)) {
        if (predicate(item, idx)) {
            found = true
            foundIdx = idx
        }
    }
    if (found) {
        return foundIdx
    } else {
        throw new Error(`No item matching predicate found`)
    }
}

function findLastIndex(iterable, predicate=x => x, ...rest) {
    assert.function(predicate, `Expected findLastIndex predicate to be a function`)
    assert.empty(rest, `Unexpected additional arguments to function`)
    return _findLastIndex(iterable, predicate)
}

export default create(findLastIndex)
export { _findLastIndex as raw }
