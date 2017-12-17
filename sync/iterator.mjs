import assert from "../--assert.mjs"

/* this implements a function like ECMA262's getIterator abstract operation
    with the hint "normal" it returns an iterator record with properties
    nextMethod and iterator, it also provides methods for next/return
    corresponding to IteratorNext/IteratorClose respectively, the object is also
    self-iterable
*/

const isObject = item => item && (typeof item === 'object' || typeof item === 'function')

function _iterator(iterable) {
    const method = iterable[Symbol.iterator]
    if (typeof method !== 'function') {
        throw new Error(`[iterator] Given value is not iterable`)
    }
    const iterator = Reflect.apply(method, iterable, [])
    const nextMethod = iterator.next

    const iter = Object.freeze({
        iterator,

        [Symbol.iterator]() {
            return iter
        },

        next(...args) {
            const iteratorResult = Reflect.apply(nextMethod, iterator, args)
            if (!isObject(iteratorResult)) {
                throw new TypeError("Expected iteratorResult to be an object")
            }
            return iteratorResult
        },

        return(...args) {
            const returnMethod = iterator.return
            if (typeof returnMethod !== 'undefined') {
                const result = Reflect.apply(returnMethod, iterator, args)
                if (!isObject(result)) {
                    throw new TypeError("Iteration result is not an object")
                }
                return result
            }
            return args[0]
        },
    })

    return iter
}

export default function iterator(maybeIterable, ...args) {
    assert.empty(args, `[iterator] Unexpected additional arguments to iterator`)
    return _iterator(maybeIterable)
}

export { _iterator as raw }
