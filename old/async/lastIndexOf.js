import create from "./createMethod.js"
import equality from "../helpers/equalityComparison.js"

/* lastIndexOf returns the last index where a given element can be found */
export default create(async function lastIndexOf(value, fromIndex=0, equals='===') {
    const compare = equality(equals)
    let idx = 0
    let last
    let found = false
    for await (const item of this) {
        if (idx >= fromIndex && await compare(value, item)) {
            last = idx
            found = true
        }
        idx += 1
    }
    if (found) {
        return last
    } else {
        throw new Error(`Found no element ${value} in sequence ${this.target}`)
    }
})
