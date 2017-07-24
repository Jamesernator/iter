import create from "./createMethod.js"
import { raw as enumerate } from "./enumerate.js"
import assert from "./#assert.js"

function _lastIndexOf(iterable, searchItem, equality=Object.is) {
    let foundIdx
    let foundSet = false
    for (const [idx, item] of enumerate(iterable)) {
        if (equality(item, searchItem)) {
            foundIdx = idx
            foundSet = true
        }
    }
    if (foundSet) {
        return foundIdx
    } else {
        throw new Error(`[lastIndexOf] matching item not found`)
    }
}

function lastIndexOf(iterable, searchItem, equality=Object.is, ...rest) {
    assert.function(equality, `[lastIndexOf] Expected equality to be a function`)
    assert.empty(rest, `[lastIndexOf] Unexpected additional arguments`)
    return _lastIndexOf(iterable, searchItem, equality)
}

export default create(lastIndexOf)
export { _lastIndexOf as raw }
