import create from "./createIterableMethod.js"

/* buffer emits arrays of the given length instead of individual elements
    the final buffer may not be the same length,
    if the second argument is true then we will ignore the final buffer
    if it is less than length
*/
const isPositive = item => typeof item === 'number' && item > 0

export default create([isPositive, 'boolean?'],
    function* buffer(length=1, ignoreRest=false) {
        let buff = []
        for (const item of this) {
            buff.push(item)
            if (buff.length === length) {
                yield buff
                buff = []
            }
        }
        if (buff.length > 0 && !ignoreRest) {
            yield buff
        }
        return this.final
    }
)
