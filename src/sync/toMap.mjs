import assert from "../--assert.mjs"
import { raw as create } from "./createOperator.mjs"

function _toMap(iterable) {
    const m = new Map()
    for (const item of iterable) {
        if (!Array.isArray(item) || item.length < 2) {
            throw new Error(`[toMap] Expected array pairs of key-value`)
        }
        const [key, value] = item
        m.set(key, value)
    }
    return m
}

function toMap(iterable, ...rest) {
    assert.empty(rest, `[toMap] Unexpected additional arguments to toMap`)
    return _toMap(iterable)
}

export default create(toMap)

export { _toMap as raw }
