import create from "./createMethod.js"
import { raw as enumerate } from "./enumerate.js"
import assert from "./#assert.js"

function _indexOf(iterable, searchItem, equality=Object.is) {
    for (const [idx, item] of enumerate(iterable)) {
        if (equality(item, searchItem)) {
            return idx
        }
    }
    throw new Error(`[indexOf] matching item not found`)
}

function indexOf(iterable, searchItem, equality=Object.is, ...rest) {
    assert.function(equality, `[indexOf] Expected equality to be a function`)
    assert.empty(rest, `[indexOf] Unexpected additional arguments`)
    return _indexOf(iterable, searchItem, equality)
}

export default create(indexOf)
export { _indexOf as raw }
