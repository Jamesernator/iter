import create from "./createMethod.js"
import { raw as enumerate } from "./enumerate.js"
import assert from "./#assert.js"

function _findIndex(iterable, predicate=x => x) {
    for (const [idx, item] of enumerate(iterable)) {
        if (predicate(item, idx)) {
            return idx
        }
    }
    throw new Error(`No item matching predicate found`)
}

function findIndex(iterable, predicate=x => x, ...rest) {
    assert.function(predicate, `Expected findIndex predicate to be a function`)
    assert.empty(rest, `Unexpected additional arguments to function`)
    return _findIndex(iterable, predicate)
}

export default create(findIndex)
export { _findIndex as raw }
