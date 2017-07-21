import create from "./createMethod.js"

/* length simply returns the number of items in the given sequence */
export default create(async function length() {
    let idx = 0
    for await (const _ of this) {
        idx += 1
    }
    return idx
})
