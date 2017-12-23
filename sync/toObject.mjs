import assert from "../--assert.mjs"
import { raw as create } from "./createOperator.mjs"
import { raw as snapshotIterable } from "./snapshotIterable.mjs"

function _toObject(iterable, proto=null) {
    const o = Object.create(proto)
    for (const item of iterable) {
        const snapshot = snapshotIterable(item)
        if (!snapshot) {
            throw new Error(`[toObject] Expected iterable pair not ${ item }`)
        }
        const [key, value] = snapshot
        o[key] = value
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
