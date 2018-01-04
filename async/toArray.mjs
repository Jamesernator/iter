import { raw as create } from "./createOperator.mjs"
import assert from "../--assert.mjs"

async function _toArray(iterable) {
    const result = []
    for await (const item of iterable) {
        result.push(item)
    }
    return result
}

function toArray(iterable, ...rest) {
    assert.empty(rest, `[toArray] Unexpected additional arguments to toArray`)
    return _toArray(iterable)
}

export default create(toArray)

export { _toArray as raw }
