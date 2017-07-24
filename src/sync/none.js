import create from "./createMethod.js"
import { raw as enumerate } from "./enumerate.js"
import assert from "./#assert.js"

function _none(iterable, predicate=x => x) {
    for (const [idx, item] of enumerate(iterable)) {
        if (predicate(item, idx)) {
            return false
        }
    }
    return true
}

function none(iterable, predicate=x => x, ...rest) {
    assert.function(predicate, `[none] Expected none predicate to be a function`)
    assert.empty(rest, `[none] Unexpected additional arguments to none`)
    return _none(iterable, predicate)
}

export default create(none)

export { _none as raw }
