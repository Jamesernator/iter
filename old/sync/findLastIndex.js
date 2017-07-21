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
    function findLastIndex(...args) {
        let predicate
        let fromIndex
        if (args.length === 0) {
            [fromIndex, predicate] = [0, x => x]
        } else if (args.length === 1) {
            [predicate] = args
            fromIndex = 0
        } else if (args.length === 2) {
            [fromIndex, predicate] = args
        }
        let idx = 0
        let found = false
        let res = null
        for (const item of this) {
            if (idx >= fromIndex && predicate(item, idx, this.target)) {
                res = idx
                found = true
            }
            idx += 1
        }
        if (found) {
            return res
        } else {
            throw new Error("findLastIndex found no item for which the predicate succeeded")
        }
    }
)
