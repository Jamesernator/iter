/* snapshotIterable takes a snapshot of the iterable at the given time
    returning a new object that when iterated will call the original
    [Symbol.iterator] method
*/
export default function snapshotIterable(maybeIterable) {
    if (maybeIterable == null) {
        return null
    }
    const asyncIteratorMethod = maybeIterable[Symbol.asyncIterator]
    if (typeof asyncIteratorMethod === 'function') {
        return Object.freeze({
            [Symbol.asyncIterator](...args) {
                return Reflect.apply(asyncIteratorMethod, maybeIterable, args)
            },

            iterable: maybeIterable,
        })
    } else {
        const syncIteratorMethod = maybeIterable[Symbol.iterator]
        if (typeof syncIteratorMethod === 'function') {
            return Object.freeze({
                [Symbol.iterator](...args) {
                    return Reflect.apply(syncIteratorMethod, maybeIterable, args)
                },

                iterable: maybeIterable,
            })
        } else {
            return null
        }
    }
}
