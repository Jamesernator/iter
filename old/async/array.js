import create from "./createMethod.js"

/* array converts the given iterable into an array */
export default create(async function array() {
    const buffer = []
    for await (const item of this) {
        buffer.push(item)
    }
    return buffer
})
