import { raw as create } from "./createMethod.mjs"
import { raw as isIterable } from "./isIterable.mjs"
import assert from "../--assert.mjs"

function _iterator(iterable) {
    const iter = iterable[Symbol.iterator]()
    return Object.freeze({
        [Symbol.iterator]() {
            return iter
        },
        next(...args) {
            return iter.next(...args)
        },

        get throw() {
            if (typeof iter.throw === 'function') {
                return (...args) => iter.throw(...args)
            }
            return iter.throw
        },

        get return() {
            if (typeof iter.return === 'function') {
                return (...args) => iter.return(...args)
            }
            return iter.return
        },
    })
}

function iterator(iterable, ...rest) {
    assert.empty(rest, `[iterator] Unexpected additional arguments to iterator`)
    assert(isIterable(iterable), `[iterator] Trying to get iterator from non-iterable`)
    return _iterator(iterable)
}

export default create(iterator)
export { _iterator as raw }
