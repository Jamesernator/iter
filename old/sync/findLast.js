import create from "./createMethod.js"


const patterns = [
    ['function?'],
    ['any', 'function']
]


const findLastWithIndex = create(...patterns,
    function withIndex(...args) {
        let predicate
        if (args.length < 2) {
            [predicate=x => x] = args
        } else if (args.length === 2) {
            [,predicate=x => x] = args
        }
        let idx = 0
        let found = false
        let result = null
        for (const item of this) {
            if (predicate(item, idx, this.target)) {
                result = { item, index: idx }
                found = true
            }
            idx += 1
        }
        if (found) {
            return result
        } else if (args.length === 2) {
            return { item: args[0], index: null }
        } else {
            throw new Error(`find found no item for which the predicate succeeded`)
        }
    }
)

/* findLast takes a single predicate function and returns the last
    element for which the predicate function returns true,
    if default is not provided then
*/
const findLast = create(...patterns,
    function findLast(...args) {
        return Reflect.apply(findLastWithIndex, this, args).item
    }
)

findLast.withIndex = findLastWithIndex

export default findLast
