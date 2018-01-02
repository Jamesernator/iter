/* this implements a function like ECMA262's getIterator abstract operation
    with the hint "normal" it returns an iterator record with properties
    nextMethod and iterator, it also provides methods for next/return
    corresponding to IteratorNext/IteratorClose respectively, the object is also
    self-iterable
*/

const isObject = item => item && (typeof item === 'object' || typeof item === 'function')

export default function iterator(iterable) {
    const method = iterable[Symbol.iterator]
    if (typeof method !== 'function') {
        throw new Error(`[iterator] Given value is not iterable`)
    }
    const iterator = Reflect.apply(method, iterable, [])
    const nextMethod = iterator.next

    let done = false

    const iter = Object.freeze({
        iterator,

        [Symbol.iterator]() {
            return iter
        },

        get done() {
            return done
        },

        next(...args) {
            let iteratorResult
            try {
                iteratorResult = Reflect.apply(nextMethod, iterator, args)
            } catch (err) {
                done = true
                throw err
            }
            if (!isObject(iteratorResult)) {
                throw new TypeError("Expected iteratorResult to be an object")
            }
            const { done: isDone, value } = iteratorResult
            if (isDone) {
                done = true
            }
            return { done: isDone, value }
        },

        return(...args) {
            if (done) {
                return { done: true, value: undefined }
            } else {
                done = true
                const returnMethod = iterator.return
                if (typeof returnMethod !== 'undefined') {
                    const result = Reflect.apply(returnMethod, iterator, args)
                    if (!isObject(result)) {
                        throw new TypeError("Iteration result is not an object")
                    }
                    return result
                }
                return args[0]
            }
        },

        close() {
            if (done) {
                return { done: true, value: undefined }
            } else {
                return iter.return()
            }
        },
    })

    return iter
}
