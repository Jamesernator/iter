import create from "./createIterableMethod.js"

/* buffer emits arrays of the given length instead of individual elements
    the final buffer may not be the same length
*/
export default create(async function* buffer(length=1) {
    let buff = []
    for await (const item of this) {
        buff.push(item)
        if (buff.length === length) {
            yield buff
            buff = []
        }
    }
    if (buff.length > 0) {
        yield buff
    }
    return this.final
})
