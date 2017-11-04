import portable from "../--portable.mjs"
import { raw as isIterable } from "./isIterable.mjs"
import assert from "../--assert.mjs"

function _createMethod(func) {
    if (typeof func !== 'function') {
        throw new Error(`Can't create a method from non-function`)
    }
    return portable(function(iterable, ...args) {
        if (!isIterable(iterable)) {
            throw new Error(`Can't iteratee non-iterable`)
        }
        return Reflect.apply(func, this, [iterable, ...args])
    })
}

function createMethod(func, ...rest) {
    assert.function(func, `[createMethod] Expected function as argument to createMethod`)
    assert.empty(rest, `[createMethod] Unexpected additional arguments to createMethod`)
    return _createMethod(func)
}

export default createMethod

export { createMethod as raw }
