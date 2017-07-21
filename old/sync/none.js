import create from "./createMethod.js"

/* none will return true if every single element in the sequence
    returns false,
    By vacuous truth if the sequence is empty then this is also true
*/
export default create(function none(predicate=x => x) {
    let idx = 0
    for (const item of this) {
        if (predicate(item, idx, this.target)) {
            return false
        }
        idx += 1
    }
    return true
})
