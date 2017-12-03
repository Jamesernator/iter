import assert from "../--assert.mjs"
import { raw as create } from "./createMethod.mjs"
import { raw as isIterable } from "./isIterable.mjs"

function _toObject(iterable, proto=null) {
    const o = Object.create(proto)
    for (const item of iterable) {
        if (!isIterable(item)) {
            throw new Error(`[toObject] Expected iterable pair not ${ item }`)
        }
        const [key, value] = item
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
