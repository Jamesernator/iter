import create from "./createIterableMethod.js"
import extendedIterator from "./extendedIterator.js"

/* merge takes two iterables and consumes them such that the resulting
    sequence is in order according to the lessThanEqual function provided,
    merge by itself doesn't produce an inherently stable sort it depends
    on the lessThanEqual function provided, if you return true when x and y
    are equal then the algorithm is guaranteed to be stable according
    to your sorting function
*/
/* eslint-disable complexity */
export default create(function* merge(other, lessThanEqual=(x, y) => x <= y) {
    const otherIter = extendedIterator(other)
    let { done, value } = this.next()
    let { done: otherDone, value: otherValue } = otherIter.next()
    while (!(done || otherDone)) {
        if (lessThanEqual(value, otherValue)) {
            yield value
            ;({ done, value } = this.next())
        } else {
            yield otherValue
            ;({ done: otherDone, value: otherValue } = otherIter.next())
        }
    }
    if (otherDone) {
        yield value
        yield* this
    }
    if (done) {
        yield otherValue
        yield* otherIter
    }
    return [this.final, otherIter.final]
})
/* eslint-enable complexity */
