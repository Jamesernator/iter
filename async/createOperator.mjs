import snapshotIterable from "./--snapshotIterable.mjs"
import assert from "../--assert.mjs"
import named from "../--named.mjs"

function _createOperator(func) {
    if (typeof func !== 'function') {
        throw new Error(`[createOperator] Can't create a method from non-function`)
    }
    return named(func.name, function(iterable, ...args) {
        const snapshot = snapshotIterable(iterable)
        if (!snapshot) {
            throw new Error(`[${ func.name }] Can't iteratee non-iterable`)
        }
        return Reflect.apply(func, this, [snapshot, ...args])
    })
}

function createOperator(func, ...rest) {
    assert.function(func, `[createOperator] Expected function as argument to createOperator`)
    assert.empty(rest, `[createOperator] Unexpected additional arguments to createOperator`)
    return _createOperator(func)
}

export default createOperator

export { createOperator as raw }
