import create from "./createIterableMethod.js"

/* filter takes the iterator and gives back a new sequence of values
    for which the predicate function returns true
*/
export default create(['function?'],
    function* filter(predicate=_ => true) {
        let idx = 0
        for (const item of this) {
            if (predicate(item, idx, this.target)) {
                yield item
            }
            idx += 1
        }
        return this.final
    }
)
