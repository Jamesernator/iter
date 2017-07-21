import create from "./createIterableMethod.js"
import equality from "../helpers/equalityComparison.js"

export default create(function* without(search, equalityOperation='===') {
    const compare = equality(equalityOperation)
    for (const item of this) {
        if (!compare(search, item)) {
            yield item
        }
    }
    return this.final
})
