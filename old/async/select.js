import create from "./createMethod.js"

/* select applies a given function to the current value and the
    current item if the function returns true then the current
    value is replaced with the current item
    the current value is returned when the iterable is exhausted
*/
/* eslint-disable complexity */
export default create(async function select(...args) {
    let predicate
    let result
    let idx = 0
    if (args.length === 1) {
        [predicate] = args
        const { value, done } = await this.next()
        if (done) {
            throw new Error("select called on empty sequence without initial value")
        }
        result = value
        idx += 1
    } else if (args.length === 2) {
        [result, predicate] = args
    }
    for await (const item of this) {
        if (await predicate(result, item, idx, this.target)) {
            result = item
        }
        idx += 1
    }
    return result
})
/* eslint-enable complexity */
