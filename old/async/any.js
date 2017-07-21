import create from "./createMethod.js"

/* any returns true if there at least a single element in the sequence
    for which the predicate function is true
    By vacuous truth if the sequence is empty then any is false
    as there is no such element that can possibly be true
*/
export default create(async function any(predicate=x => x) {
    let idx = 0
    for await (const item of this) {
        if (await predicate(item, idx, this.target)) {
            return true
        }
        idx += 1
    }
    return false
})
