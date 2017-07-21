import create from "./createMethod.js"

const patterns = [
    ['function?'],
    ['any', 'function']
]

/* find takes a single predicate function and returns the first
    element for which the predicate function returns true,
    if default is not provided then
*/
const findWithIndex = create(...patterns,
    function withIndex(...args) {
        let predicate
        if (args.length < 2) {
            [predicate=x => x] = args
        } else if (args.length === 2) {
            [,predicate=x => x] = args
        }
        let idx = 0
        for (const item of this) {
            if (predicate(item, idx, this.target)) {
                return { item, index: idx }
            }
            idx += 1
        }
        if (args.length === 2) {
            return { item: args[0], index: null }
        } else {
            throw new Error(`find found no item for which the predicate succeeded`)
        }
    }
)

const find = create(...patterns,
    function find(...args) {
        return Reflect.apply(findWithIndex, this, args).item
    }
)

find.withIndex = findWithIndex

export default find
