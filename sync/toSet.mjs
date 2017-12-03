import { raw as create } from "./createMethod.mjs"
import assert from "../--assert.mjs"

function _toSet(iterable) {
    const s = new Set()
    for (const item of iterable) {
        s.add(item)
    }
    return s
}

function toSet(iterable, ...rest) {
    assert.empty(rest, `[toSet] Unexpected additional arguments to toSet`)
    return _toSet(iterable)
}

export default create(toSet)
export { _toSet as raw }
