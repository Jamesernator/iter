import create from "./createIterableMethod.js"
import extendedIterator from "./extendedIterator.js"

/* followWith takes any number of iterables and yields from each
    iterable in sequence after the current iterable
*/
export default create(async function* followWith(...iterables) {
    yield* this
    const iters = iterables.map(extendedIterator)
    for await (const iter of iters) {
        yield* iter
    }
    if (iters.length === 0) {
        return this.final
    } else {
        return iters[iters.length-1].final
    }
})
