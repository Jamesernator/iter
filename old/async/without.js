import create from "./createIterableMethod.js"
import equality from "../helpers/equalityComparison.js"

export default create(async function* without(search, equalityOperation='===') {
    const compare = equality(equalityOperation)
    for await (const item of this) {
        if (!compare(search, item)) {
            yield item
        }
    }
    return this.final
})
