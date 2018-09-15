import assert from "../--assert.mjs"
import { raw as create } from "./createOperator.mjs"
import snapshotIterable from "./--snapshotIterable.mjs"

async function _toObject(iterable, proto=null) {
    const o = Object.create(proto)
    for await (const item of iterable) {
        if (!Array.isArray(item) || item.length < 2) {
            throw new Error(`[toMap] Expected array pairs of [key, value, ...anything]`)
        }
        const [key, value] = item
        Object.defineProperty(o, key, {
            configurable: true,
            enumerable: true,
            writable: true,
            value,
        })
    }
    return o
}

function toObject(iterable, proto=null, ...rest) {
    assert.empty(rest, `[toObject] Unexpected additional arguments to toObject`)
    assert(typeof proto === 'object' || typeof proto === 'function', `[toObject] prototype must be an object`)
    return _toObject(iterable, proto)
}

export default create(toObject)

export { _toObject as raw }
