import create from "./createMethod.js"
import equality, { types } from "../helpers/equalityComparison.js"

/* contains returns true if the sequence contains the given search value
    equality is based on the equality operation passed
*/
export default create(['any', ['undefined', arg => types.includes(arg.toLowerCase())]],
    function contains(search, equalityOperation='===') {
        const compare = equality(equalityOperation)
        for (const item of this) {
            if (compare(search, item)) {
                return true
            }
        }
        return false
    }
)
