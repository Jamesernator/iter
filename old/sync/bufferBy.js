import create from "./createIterableMethod.js"

/* buffer emits arrays of the given length instead of individual elements
    the final buffer may not be the same length,
    if the second argument is true then we will ignore the final buffer
    if it is less than length
*/

export default create(['function?', 'boolean?'],
    function* bufferBy(predicate=x => x, ignoreRest=false) {
        let buff = []
        let idx = 0
        for (const item of this) {
            buff.push(item)
            if (predicate(item, [...buff], idx, this.target)) {
                yield buff
                buff = []
            }
            idx += 1
        }
        if (buff.length > 0 && !ignoreRest) {
            yield buff
        }
        return this.final
    }
)
