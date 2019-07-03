import { raw as create } from "./createOperator.mjs"
import assert from "../--assert.mjs"

async function _length(iterable) {
    let i = 0
    for await (const _ of iterable) {
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
