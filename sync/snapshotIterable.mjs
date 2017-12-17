import assert from "../--assert.mjs"

function _snapshotIterable(maybeIterable) {
    if (maybeIterable == null) {
        return false
    }
    const iteratorMethod = maybeIterable[Symbol.iterator]
    if (typeof iteratorMethod === 'function') {
        return Object.freeze({
            [Symbol.iterator](...args) {
                return Reflect.apply(iteratorMethod, maybeIterable, args)
            },
        })
    } else {
        return false
    }
}

/* snapshotIterable takes a snapshot of the iterable at the given time
    returning a new object that when iterated will call the original
    [Symbol.iterator] method
*/
export default function snapshotIterable(maybeIterable, ...args) {
    assert.empty(args, `[snapshotIterable] Unexpected additional arguments to snapshotIterable`)
    return _snapshotIterable(maybeIterable)
}

export { _snapshotIterable as raw }
