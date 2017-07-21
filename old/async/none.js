import create from "./createMethod.js"

/* none will return true if every single element in the sequence
    returns false,
    By vacuous truth if the sequence is empty then this is also true
*/
export default create(async function none(predicate=x => x) {
    let idx = 0
    for await (const item of this) {
        if (await predicate(item, idx, this.target)) {
            return false
        }
        idx += 1
    }
    return true
})
