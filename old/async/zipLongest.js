import create from "./createIterableMethod.js"
import extendedIterator from "./extendedIterator.js"
import all from "./all.js"

/* zipLongest takes any number of sequences and creates a new sequence where
    the nth item is an array of the nth item of each of the iterables
    in the order the iterables are provided, zip will stop when all iterators
    have been completed,
    The return value is an array of all of the done values in order
*/
export default create(async function* zip(...iterables) {
    const iters = [
        this,
        ...iterables.map(iterable => extendedIterator(iterable))
    ]
    while (true) {
        const nexts = await Promise.all(iters.map(iter => iter.next()))
        if (await all(nexts, item => item.done)) {
            return iters.map(iter => iter.final)
        } else {
            yield nexts.map(iter => {
                if (iter.done) {
                    return undefined
                } else {
                    return iter.value
                }
            })
        }
    }
})
