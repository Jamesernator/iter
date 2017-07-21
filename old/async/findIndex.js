import create from "./createMethod.js"

/* findIndex returns the first index for which the predicate function
    returns true starting at fromIndex
*/
export default create(async function findIndex(predicate=x => x, fromIndex=0) {
    let idx = 0
    for await (const item of this) {
        if (idx >= fromIndex && await predicate(item)) {
            return idx
        }
        idx += 1
    }
    throw new Error(
        `Couldn't find value in ${this.target} for which` +
        ` ${predicate} returns true`
    )
})
