import create from "./createIterableMethod.js"

/* filter takes the iterator and gives back a new sequence of values
    for which the predicate function returns true
*/
export default create(async function* filter(predicate=_ => true) {
    let idx = 0
    for await (const item of this) {
        if (await predicate(item, idx, this.target)) {
            yield item
        }
        idx += 1
    }
    return this.final
})
