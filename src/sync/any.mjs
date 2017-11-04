import { raw as create } from "./createMethod.mjs"
import { raw as enumerate } from "./enumerate.mjs"
import assert from "../--assert.mjs"

function _any(iterable, predicate=x => x) {
    for (const [idx, item] of enumerate(iterable)) {
        if (predicate(item, idx)) {
            return true
        }
    }
    return false
}

function any(iterable, predicate=x => x, ...rest) {
    assert.function(predicate, `Expected all predicate to be a function`)
    assert.empty(rest, `Unexpected additional arguments to all`)
    return _any(iterable, predicate)
}

export default create(any)

export { _any as plain }
