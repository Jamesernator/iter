import { raw as create } from "./createOperator.mjs"
import assert from "../--assert.mjs"

async function _toSet(iterable) {
    const s = new Set()
    for await (const item of iterable) {
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
