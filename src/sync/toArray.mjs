import { raw as create } from "./createMethod.mjs"
import assert from "../--assert.mjs"

function _toArray(iterable) {
    return Array.from(iterable)
}

function toArray(iterable, ...rest) {
    assert.empty(rest, `[toArray] Unexpected additional arguments to toArray`)
    return _toArray(iterable)
}

export default create(toArray)

export { _toArray as raw }
