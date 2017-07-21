import create from "./createMethod.js"
import assert from "./#assert.js"

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
    assert.empty(rest, `Unexpected additional arguments to iterator`)
    return _iterator(iterable)
}

export default create(iterator)
export { _iterator as raw }
