import create from "./createMethod.js"

/* lastIndexOf returns the last index where a given element can be found */
export default create(async function findLastIndex(predicate=x => x, fromIndex=0) {
    let idx = 0
    let last
    let found = false
    for await (const item of this) {
        if (idx >= fromIndex && await predicate(item)) {
            last = idx
            found = true
        }
        idx += 1
    }
    if (found) {
        return last
    } else {
        throw new Error(
            `Found no value in sequence ${this.target}` +
            ` for which ${predicate} returns true`
        )
    }
})
