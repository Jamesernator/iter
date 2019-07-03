/* snapshotIterable takes a snapshot of the iterable at the given time
    returning a new object that when iterated will call the original
    [Symbol.iterator] method
*/
export default function snapshotIterable(maybeIterable) {
    if (maybeIterable == null) {
        return null
    }
    const iteratorMethod = maybeIterable[Symbol.iterator]
    if (typeof iteratorMethod === 'function') {
        return Object.freeze({
            [Symbol.iterator](...args) {
                return Reflect.apply(iteratorMethod, maybeIterable, args)
            },

            iterable: maybeIterable,
        })
    } else {
        return null
    }
}
