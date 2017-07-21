import create from "./createIterableMethod.js"
import extendedIterator from "./extendedIterator.js"
import any from "./any.js"

/* zip takes any number of sequences and creates a new sequence where
    the nth item is an array of the nth item of each of the iterables
    in the order the iterables are provided, zip will stop when a single
    iterator completes,
    The return value is an array of reached return values with undefined
    for all other return values
*/
export default create(async function* zip(...iterables) {
    const iters = [
        this,
        ...iterables.map(iterable => extendedIterator(iterable))
    ]
    while (true) {
        const nexts = await Promise.all(iters.map(iter => iter.next()))
        if (await any(nexts, item => item.done)) {
            return iters.map(iter => iter.final)
        } else {
            yield nexts.map(next => next.value)
        }
    }
})
