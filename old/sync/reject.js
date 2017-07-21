import create from "./createIterableMethod.js"

/* reject takes the iterator and gives back a new sequence of values
    for which the predicate does not return true
*/
export default create(function* reject(predicate=_ => true) {
    let idx = 0
    for (const item of this) {
        if (!predicate(item, idx, this.target)) {
            yield item
        }
        idx += 1
    }
    return this.final
})
