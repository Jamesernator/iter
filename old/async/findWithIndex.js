import create from "./createMethod.js"

/* find takes a single predicate function and returns the first
    element for which the predicate function returns true,
    if default is not provided then
*/
/* eslint-disable complexity */
export default create(async function find(...args) {
    let predicate
    if (args.length === 0) {
        predicate = x => x
    } else if (args.length === 1) {
        predicate = args[0]
    } else {
        predicate = args[1]
    }
    let idx = 0
    for await (const item of this) {
        if (await predicate(item, idx, this.target)) {
            return [item, idx]
        }
        idx += 1
    }
    if (args.length >= 2) {
        return args[0]
    } else {
        throw new Error("find found no item for which the predicate succeeded")
    }
})
/* eslint-enable complexity */
