import create from "./createMethod.js"
import { raw as enumerate } from "./enumerate.js"
import assert from "./#assert.js"

function _all(iterable, predicate=x => x) {
    for (const [idx, item] of enumerate(iterable)) {
        if (!predicate(item, idx)) {
            return false
        }
    }
    return true
}

function all(iterable, predicate=x => x, ...rest) {
    assert.function(predicate, `Expected all predicate to be a function`)
    assert.empty(rest, `Unexpected additional arguments to all`)
    return _all(iterable, predicate)
}

export default create(all)

export { _all as raw }
