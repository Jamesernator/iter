import create from "./createIterableMethod.js"

/* map simply takes an iterable and returns a new iterable with the iteratee
    function applied to each of its arguments,
    the iteratee function recieves three arguments, the value, the current
    count of items and the target of iteration
    The return value is simply transferred
*/
export default create(function* map(iteratee=x => x) {
    let idx = 0
    for (const item of this) {
        yield iteratee(item, idx, this.target)
        idx += 1
    }
    return this.final
})
