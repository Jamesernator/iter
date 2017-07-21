import create from "./createMethod.js"
import equality from "../helpers/equalityComparison.js"

/* indexOf returns the first index where the given element can be found,
    optionally the second argument can be the index from which
    you wish to check and the third argument */
export default create(async function indexOf(value, fromIndex=0, equals='===') {
    const compare = equality(equals)
    let idx = 0
    for await (const item of this) {
        if (idx >= fromIndex && await compare(value, item)) {
            return idx
        }
        idx += 1
    }
    throw new Error(`Couldn't find ${value} in sequence ${this.target}`)
})
