import create from "./createIterableMethod.js"

/* takeWhile continues emitting items until either the predicate function
    returns false or the sequence is finished
*/
export default create(function* takeWhile(predicate=x => x) {
    let idx = 0
    for (const item of this) {
        if (!predicate(item, idx, this.target)) {
            return this.final
        }
        yield item
        idx += 1
    }
    return this.final
})
