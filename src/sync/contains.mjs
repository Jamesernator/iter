import { raw as create } from "./createMethod.mjs"
import assert from "../--assert.mjs"

function _contains(iterable, value, equality=Object.is) {
    for (const item of iterable) {
        if (equality(value, item)) {
            return true
        }
    }
    return false
}

function contains(iterable, value, equality=Object.is, ...rest) {
    assert.function(equality, `Expected contains equality to be a function`)
    assert.empty(rest, `Unexpected additional arguments to contains`)
    return _contains(iterable, value, equality)
}

export default create(contains)
export { _contains as raw }
