import create from "./createIterableMethod.js"

/* enumerate converts a sequence into a sequence of [item, index] pairs
    it does not change the return value
*/
export default create(async function* enumerate() {
    let idx = 0
    for await (const item of this) {
        yield [item, idx]
        idx += 1
    }
    return this.final
})
