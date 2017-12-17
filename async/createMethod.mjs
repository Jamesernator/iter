import portable from "../--portable.mjs"
import { raw as snapshotIterable } from "./snapshotIterable.mjs"
import assert from "../--assert.mjs"
import named from "../--named.mjs"

function _createMethod(func) {
    if (typeof func !== 'function') {
        throw new Error(`[createMethod] Can't create a method from non-function`)
    }
    return portable(named(func.name, function(iterable, ...args) {
        const snapshot = snapshotIterable(iterable)
        if (!snapshot) {
            throw new Error(`[${ func.name }] Can't iteratee non-iterable`)
        }
        return Reflect.apply(func, this, [snapshot, ...args])
    }))
}

function createMethod(func, ...rest) {
    assert.function(func, `[createMethod] Expected function as argument to createMethod`)
    assert.empty(rest, `[createMethod] Unexpected additional arguments to createMethod`)
    return _createMethod(func)
}

export default createMethod

export { createMethod as raw }
