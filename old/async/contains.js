import create from "./createMethod.js"
import equality from "../helpers/equalityComparison.js"

/* contains returns true if the sequence contains the given search value
    equality is based on the equality operation passed
*/
export default create(async function contains(search, equalityOperation='===') {
    const compare = equality(equalityOperation)
    for await (const item of this) {
        if (await compare(search, item)) {
            return true
        }
    }
    return false
})
