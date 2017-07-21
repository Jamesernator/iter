import create from "./createMethod.js"

/* length simply returns the number of items in the given sequence */
export default create(function length() {
    let idx = 0
    for (const _ of this) {
        idx += 1
    }
    return idx
})
