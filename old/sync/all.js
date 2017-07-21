import create from "./createMethod.js"

/* all will return true if every single element in the sequence
    returns true,
    By vacuous truth if the sequence is empty then all is also true
*/
export default create(['function?'],
    function all(predicate=x => x) {
        let idx = 0
        for (const item of this) {
            if (!predicate(item, idx, this.target)) {
                return false
            }
            idx += 1
        }
        return true
    }
)
