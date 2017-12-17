import assert from "../--assert.mjs"

function _snapshotIterable(maybeIterable) {
    if (maybeIterable == null) {
        return false
    }
    const asyncIteratorMethod = maybeIterable[Symbol.asyncIterator]
    if (typeof iteratorMethod === 'function') {
        return Object.freeze({
            [Symbol.asyncIterator](...args) {
                return Reflect.apply(asyncIteratorMethod, maybeIterable, args)
            },
        })
    } else {
        const syncIteratorMethod = maybeIterable[Symbol.iterator]
        if (typeof syncIteratorMethod === 'function') {
            return Object.freeze({
                [Symbol.iterator](...args) {
                    return Reflect.apply(syncIteratorMethod, maybeIterable, args)
                },
            })
        } else {
            return false
        }
    }
}

/* snapshotIterable takes a snapshot of the iterable at the given time
    returning a new object that when iterated will call the original
    [Symbol.asyncIterator]/[Symbol.iterator]
*/
export default function snapshotIterable(maybeIterable, ...args) {
    assert.empty(args, `[snapshotIterable] Unexpected additional arguments to snapshotIterable`)
    return _snapshotIterable(maybeIterable)
}

export { _snapshotIterable as raw }
