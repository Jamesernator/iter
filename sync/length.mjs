import { raw as create } from "./createMethod.mjs"
import assert from "../--assert.mjs"

function _length(iterable) {
    let i = 0
    for (const _ of iterable) {
        i += 1
    }
    return i
}

function length(iterable, ...rest) {
    assert.empty(rest, `[length] Unexpected additional arguments`)
    return _length(iterable)
}

export default create(length)
export { _length as raw }
