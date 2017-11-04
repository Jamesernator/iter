import assert from "../--assert.mjs"
import { raw as create } from "./createMethod.mjs"
import { raw as isIterable } from "./isIterable.mjs"

function _toMap(iterable) {
    const m = new Map()
    for (const item of iterable) {
        if (!isIterable(item)) {
            throw new Error(`[toMap] Expected iterable pair not ${ item }`)
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
