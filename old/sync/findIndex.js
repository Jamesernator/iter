import create from "./createMethod.js"

/* findIndex takes a single predicate function and returns the first
    index for which the predicate returns true
    if default is not provided then
*/
const patterns = [
    ['function?'],
    ['number', 'function']
]

export default create(...patterns,
    function findndex(...args) {
        let predicate
        let fromIndex
        if (args.length === 0) {
            [fromIndex, predicate] = [0, x => x]
        } else if (args.length === 1) {
            [predicate] = args
            fromIndex = 0
        } else if (args.length === 2) {
            [fromIndex, predicate] = args
        } else {
            throw new Error("invalid arguments to findIndex")
        }
        let idx = 0
        for (const item of this) {
            if (idx >= fromIndex && predicate(item, idx, this.target)) {
                return idx
            }
            idx += 1
        }
        throw new Error("findIndex found no item for which the predicate succeeded")
    }
)
