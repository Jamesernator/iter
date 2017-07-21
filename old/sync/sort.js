import create from "./createIterableMethod.js"
import merge from "./merge.js"
import array from "./array.js"

/* returns a sorted sequence of values from the given input sequence,
    the return value of the sequence is preserved
*/
const _sort = create(function* sort(lessThanEqual=(x, y) => x <= y) {
    let arr = array(this)
    if (arr.length === 0) {
        return this.final
    } else if (arr.length === 1) {
        yield arr[0]
        return this.final
    } else {
        const sortedLeft = _sort(
            arr.slice(0, Math.floor(arr.length/2)),
            lessThanEqual
        )
        const sortedRight = _sort(
            arr.slice(Math.floor(arr.length/2)),
            lessThanEqual
        )
        arr = null // Allow garbage collection within the turn to allow
                   // O(n) additional space instead of O(n*log(n))
        yield* merge(sortedLeft, sortedRight, lessThanEqual)
        return this.final
    }
})

export default _sort
